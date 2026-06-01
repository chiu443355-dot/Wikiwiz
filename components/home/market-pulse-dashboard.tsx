'use client';

import { useEffect, useRef } from 'react';
import { FearGreedMeter } from '@/components/wikiwiz/fear-greed-meter';

function TradingViewLiveChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'NSE:NIFTY50',
      interval: 'D',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(0,0,0,0)',
      gridColor: 'rgba(255,255,255,0.05)',
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '500px', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

function TradingViewEconomicCalendar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: '500',
      colorTheme: 'dark',
      isTransparent: true,
      importanceFilter: '-1,0,1',
      currencyFilter: 'INR,USD,EUR,GBP',
    });

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="w-full" />;
}

function TradingViewNewsTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: 'all_symbols',
      colorTheme: 'dark',
      isTransparent: true,
      displayMode: 'regular',
      width: '100%',
      height: '500',
    });

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="w-full" />;
}

export function MarketPulseDashboard() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-border space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="text-center">
          <div className="text-sm font-mono text-primary/70 mb-2 uppercase tracking-widest">Live Markets</div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            Market Pulse
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Real-time charts, macro events, and institutional news flow
          </p>
        </div>

        {/* Live Chart */}
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground mb-4">Live Chart</h3>
          <div className="rounded-2xl border border-border overflow-hidden bg-card">
            <TradingViewLiveChart />
          </div>
        </div>

        {/* Fear & Greed below chart */}
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground mb-4">Market Sentiment</h3>
          <div className="max-w-md">
            <FearGreedMeter />
          </div>
        </div>

        {/* Economic Calendar + Institutional News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-serif font-bold text-xl mb-4 text-foreground">Economic Calendar</h3>
            <TradingViewEconomicCalendar />
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-serif font-bold text-xl mb-4 text-foreground">Institutional News Flow</h3>
            <TradingViewNewsTimeline />
          </div>
        </div>

      </div>
    </section>
  );
}
