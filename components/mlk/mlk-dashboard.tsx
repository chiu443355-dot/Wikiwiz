'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Play, Zap, Brain } from 'lucide-react';
import { IRPEngine } from '@/lib/irp-engine';
import dynamic from 'next/dynamic';

const TradingViewChart = dynamic(() => import('@/components/charts/tradingview-chart').then(mod => ({ default: mod.TradingViewChart })), {
  ssr: false,
  loading: () => <div className="h-96 bg-card rounded-lg animate-pulse" />
});

interface AnalysisResult {
  rho: number;
  priority: number;
  directionScore: number;
  mci: number;
  prediction: string;
  scenarios: any[];
  liquidity: number;
  volume: number;
  momentum: number;
  volatility: number;
  goldPrice: number;
  priceChange: number;
  resistance: number;
  support: number;
}

export function MLKDashboard() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const aiResponseRef = useRef<HTMLDivElement>(null);
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'area'>('candlestick');

  const engineRef = useRef(new IRPEngine());

  const runAnalysis = () => {
    setIsLoading(true);
    setShowAI(false);
    setAiResponse('');

    setTimeout(() => {
      const state = engineRef.current.run();
      const goldPrice = 4300 + Math.random() * 400;
      const priceChange = (Math.random() - 0.5) * 100;

      setAnalysisResult({
        rho: state.rho,
        priority: state.priority,
        directionScore: state.directionScore,
        mci: state.mci,
        prediction: state.prediction,
        scenarios: state.scenarios,
        liquidity: state.liquidity,
        volume: state.volume,
        momentum: state.momentum,
        volatility: state.volatility,
        goldPrice: Math.round(goldPrice),
        priceChange: Math.round(priceChange * 10) / 10,
        resistance: Math.round(goldPrice + 50),
        support: Math.round(goldPrice - 50),
      });

      setIsLoading(false);
    }, 800);
  };

  const askAI = async () => {
    if (!analysisResult) return;

    const prompt = `Trading Analysis for Gold (${analysisResult.goldPrice} USD):
- Market Load: ${(analysisResult.rho * 100).toFixed(1)}%
- Direction Score: ${(analysisResult.directionScore * 100).toFixed(1)}%
- Market Condition: ${(analysisResult.mci * 100).toFixed(1)}%
- Prediction: ${analysisResult.prediction}
- Price Change: ${analysisResult.priceChange}%

Provide brief trading insights and recommendations.`;

    setAiLoading(true);
    setAiResponse('');
    setShowAI(true);

    try {
      const response = await fetch('/api/nvidia-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setAiResponse((prev) => prev + chunk);
      }

      // Final decode
      const finalChunk = decoder.decode();
      if (finalChunk) {
        setAiResponse((prev) => prev + finalChunk);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse(`⚠️ Error: ${error instanceof Error ? error.message : 'Failed to get response from AI'}`);
    } finally {
      setAiLoading(false);
      setTimeout(() => {
        aiResponseRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const getPhaseInfo = (rho: number) => {
    if (rho > 1.0) return { phase: 'FAILURE', color: 'bg-red-500/20 border-red-500/50 text-red-400' };
    if (rho > 0.85) return { phase: 'CRITICAL', color: 'bg-orange-500/20 border-orange-500/50 text-orange-400' };
    if (rho >= 0.65) return { phase: 'TRANSITION', color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' };
    return { phase: 'NORMAL', color: 'bg-green-500/20 border-green-500/50 text-green-400' };
  };

  const getPredictionEmoji = (pred: string) => {
    switch (pred) {
      case 'STRONG_BULL': return '🚀';
      case 'BULL': return '📈';
      case 'SIDEWAYS': return '⏸️';
      case 'BEAR': return '📉';
      case 'STRONG_BEAR': return '💥';
      default: return '❓';
    }
  };

  const phaseInfo = analysisResult && getPhaseInfo(analysisResult.rho);

  return (
    <div className="w-full bg-background text-foreground space-y-8 py-8">
      {/* DISCLAIMER */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10 flex gap-3">
          <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1 text-sm">
            <p className="font-bold text-red-300">⚠️ CRITICAL DISCLAIMER</p>
            <p className="text-red-200/80">
              This is <strong>NOT a get-rich-quick</strong> system. Trading involves <strong>substantial risk of loss</strong>. <strong>You may lose your entire investment.</strong> Only trade with money you can afford to lose. This tool is for educational analysis only. <strong>Take full responsibility for your own trading decisions.</strong>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* CONTROLS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 flex-wrap items-center">
          <button
            onClick={runAnalysis}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={18} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Running Analysis...' : 'Run IRP Analysis'}
          </button>

          {analysisResult && (
            <button
              onClick={askAI}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Brain size={18} className={aiLoading ? 'animate-spin' : ''} />
              {aiLoading ? 'Thinking...' : 'Ask AI 🤖'}
            </button>
          )}

          {analysisResult && (
            <div className="flex gap-2 ml-auto">
              {['candlestick', 'line', 'area'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    chartType === type
                      ? 'bg-primary text-background'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {type === 'candlestick' ? '🕯️' : type === 'line' ? '📊' : '📈'} {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {analysisResult && (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* TRADINGVIEW CHART */}
              <motion.div key={`chart-${analysisResult.goldPrice}-${chartType}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl border border-border bg-card/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Gold Spot / USD · XAUUSD</h3>
                    <p className="text-sm text-muted-foreground mt-1">TradingView Multi-Chart Analysis (Reactive)</p>
                  </div>
                  <div className="text-right">
                    <motion.div key={`price-${analysisResult.goldPrice}`} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-3xl font-bold text-amber-400">
                      ${analysisResult.goldPrice.toLocaleString()}
                    </motion.div>
                    <motion.div key={`change-${analysisResult.priceChange}`} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className={`text-sm font-semibold ${analysisResult.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {analysisResult.priceChange >= 0 ? '▲' : '▼'} {Math.abs(analysisResult.priceChange).toFixed(2)}%
                    </motion.div>
                  </div>
                </div>

                <TradingViewChart chartType={chartType} goldPrice={analysisResult.goldPrice} />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.div key={`res-${analysisResult.resistance}`} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <p className="text-xs text-muted-foreground">Resistance</p>
                    <p className="text-lg font-bold text-green-400">${analysisResult.resistance}</p>
                  </motion.div>
                  <motion.div key={`sup-${analysisResult.support}`} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-xs text-muted-foreground">Support</p>
                    <p className="text-lg font-bold text-red-400">${analysisResult.support}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* IRP ANALYSIS */}
              <motion.div key={`analysis-${analysisResult.prediction}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Market Condition */}
                <div className="p-6 rounded-2xl border border-border bg-card/50">
                  <h3 className="text-lg font-bold text-foreground mb-4">Market Condition</h3>

                  <motion.div key={`phase-${phaseInfo?.phase}`} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className={`p-4 rounded-xl border mb-4 ${phaseInfo?.color}`}>
                    <p className="text-xs font-mono uppercase tracking-widest opacity-70 mb-1">Market Phase</p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-bold">
                      {phaseInfo?.phase}
                    </motion.p>
                  </motion.div>

                  <div className="space-y-3">
                    {[
                      { label: 'Market Load (ρ)', value: analysisResult.rho, color: 'text-primary' },
                      { label: 'Priority Decay Φ(ρ)', value: analysisResult.priority, color: 'text-cyan-400' },
                      { label: 'Direction Score', value: analysisResult.directionScore, color: 'text-amber-400' },
                      { label: 'Market Condition Index', value: analysisResult.mci, color: 'text-purple-400' },
                    ].map((item, idx) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <motion.span key={`${item.label}-${item.value}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className={`font-mono font-bold ${item.color}`}>
                            {(item.value * 100).toFixed(1)}%
                          </motion.span>
                        </div>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                          <motion.div key={`bar-${item.label}-${item.value}`} initial={{ width: 0 }} animate={{ width: `${item.value * 100}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} className={`h-full ${item.color.replace('text-', 'bg-')}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prediction & Scenarios */}
                <div className="p-6 rounded-2xl border border-border bg-card/50">
                  <h3 className="text-lg font-bold text-foreground mb-4">Market Prediction</h3>

                  <motion.div key={`pred-${analysisResult.prediction}`} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-4 rounded-xl border mb-4 bg-gradient-to-r ${
                    analysisResult.prediction === 'STRONG_BULL'
                      ? 'from-green-500/20 to-emerald-500/20 border-green-500/50'
                      : analysisResult.prediction === 'BULL'
                        ? 'from-green-500/10 to-green-500/10 border-green-500/30'
                        : analysisResult.prediction === 'SIDEWAYS'
                          ? 'from-yellow-500/20 to-yellow-500/20 border-yellow-500/50'
                          : analysisResult.prediction === 'BEAR'
                            ? 'from-orange-500/10 to-orange-500/10 border-orange-500/30'
                            : 'from-red-500/20 to-red-500/20 border-red-500/50'
                  }`}>
                    <p className="text-xs font-mono uppercase tracking-widest opacity-70 mb-1">Prediction</p>
                    <div className="flex items-center gap-2">
                      <motion.span key={`emoji-${getPredictionEmoji(analysisResult.prediction)}`} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.5 }} className="text-3xl">
                        {getPredictionEmoji(analysisResult.prediction)}
                      </motion.span>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl font-bold text-foreground">
                        {analysisResult.prediction}
                      </motion.p>
                    </div>
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Scenario Analysis</p>
                    <AnimatePresence mode="wait">
                      {analysisResult.scenarios.map((scenario, idx) => (
                        <motion.div key={`scenario-${idx}-${scenario.probability}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.4 + idx * 0.1 }} className="p-3 rounded-lg border border-border/50 bg-background/50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-foreground">{scenario.name}</span>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-sm font-bold text-primary">
                              {scenario.probability}%
                            </motion.span>
                          </div>
                          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${scenario.probability}%` }} transition={{ duration: 0.8, delay: 0.5 + idx * 0.1 }} className="h-full bg-primary" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* TRADING FACTORS */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl border border-border bg-card/50">
                <h3 className="text-lg font-bold text-foreground mb-4">Trading Factors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Liquidity', value: analysisResult.liquidity, color: 'text-blue-400' },
                    { label: 'Volume', value: analysisResult.volume, color: 'text-green-400' },
                    { label: 'Momentum', value: analysisResult.momentum, color: 'text-purple-400' },
                    { label: 'Volatility', value: analysisResult.volatility, color: 'text-red-400' },
                  ].map((metric) => (
                    <motion.div key={`${metric.label}-${metric.value}`} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="p-4 rounded-lg bg-background/50 border border-border/50">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{metric.label}</p>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} className={`text-2xl font-bold ${metric.color}`}>
                        {(metric.value * 100).toFixed(0)}%
                      </motion.div>
                      <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-2">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${metric.value * 100}%` }} transition={{ duration: 0.8 }} className={`h-full ${metric.color.replace('text-', 'bg-')}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI ANALYSIS */}
              {showAI && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl border border-cyan-500/50 bg-cyan-500/10" ref={aiResponseRef}>
                  <div className="flex items-center gap-2 mb-4">
                    <Brain size={20} className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-cyan-400">🤖 AI Trading Analysis</h3>
                  </div>

                  {aiLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="animate-spin">
                        <Zap size={16} />
                      </div>
                      <span>AI is analyzing market conditions...</span>
                    </div>
                  )}

                  {aiResponse && !aiLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                      {aiResponse}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {!analysisResult && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-center py-16">
            <Zap size={48} className="mx-auto text-primary/40 mb-4" />
            <p className="text-muted-foreground font-mono text-sm">Click "Run IRP Analysis" to start the market simulation</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
