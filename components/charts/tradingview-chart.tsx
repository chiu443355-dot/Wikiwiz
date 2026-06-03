'use client';

import React, { useMemo } from 'react';
import {
  ComposedChart,
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Area,
  Bar,
  Cell,
} from 'recharts';

interface TradingViewChartProps {
  chartType: 'candlestick' | 'line' | 'area';
  goldPrice: number;
}

// Generate realistic OHLC data
const generateOHLCData = (basePrice: number) => {
  const data = [];
  let price = basePrice;

  for (let i = 0; i < 60; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * 20;
    price += change;
    const close = price;
    const high = Math.max(open, close) + Math.random() * 15;
    const low = Math.min(open, close) - Math.random() * 15;

    data.push({
      time: `${String(Math.floor(i / 4)).padStart(2, '0')}:${String((i % 4) * 15).padStart(2, '0')}`,
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.random() * 100000,
      price: Math.round(close),
    });
  }

  return data;
};

// Custom candlestick shape
const CandleStick = (props: any) => {
  const { x, y, width, height, payload } = props;

  if (!payload) return null;

  const { open, high, low, close } = payload;
  const boxHeight = Math.abs(close - open) || 1;
  const midX = x + width / 2;
  const topY = Math.min(open, close);
  const color = close >= open ? '#22c55e' : '#ef4444';

  return (
    <g>
      <line x1={midX} y1={y} x2={midX} y2={y + height} stroke={color} strokeWidth={1} />
      <rect
        x={x + 2}
        y={y + (height - boxHeight) / 2}
        width={width - 4}
        height={Math.max(boxHeight, 1)}
        fill={color}
        stroke={color}
      />
    </g>
  );
};

export function TradingViewChart({ chartType, goldPrice }: TradingViewChartProps) {
  const data = useMemo(() => generateOHLCData(goldPrice), [goldPrice]);

  const chartProps = {
    data,
    margin: { top: 10, right: 30, left: 0, bottom: 20 },
  };

  const tooltipContent = (props: any) => {
    const { active, payload } = props;
    if (!active || !payload?.[0]) return null;
    const { time, open, high, low, close } = payload[0].payload;
    return (
      <div className="bg-background border border-border rounded p-2 text-xs text-foreground">
        <p className="text-muted-foreground">{time}</p>
        <p className="text-green-400">O: ${open}</p>
        <p className="text-blue-400">H: ${high}</p>
        <p className="text-red-400">L: ${low}</p>
        <p className="text-amber-400">C: ${close}</p>
      </div>
    );
  };

  return (
    <div className="w-full h-96 bg-gradient-to-b from-background to-background/50 rounded-lg overflow-hidden border border-border/50">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'candlestick' && (
          <ComposedChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" vertical={false} />
            <XAxis dataKey="time" stroke="oklch(0.5 0 0)" tick={{ fontSize: 11 }} />
            <YAxis stroke="oklch(0.5 0 0)" tick={{ fontSize: 11 }} domain={['dataMin - 30', 'dataMax + 30']} />
            <Tooltip content={tooltipContent} />
            <Bar dataKey="close" shape={<CandleStick />} />
          </ComposedChart>
        )}

        {chartType === 'line' && (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
            <XAxis dataKey="time" stroke="oklch(0.5 0 0)" tick={{ fontSize: 11 }} />
            <YAxis stroke="oklch(0.5 0 0)" tick={{ fontSize: 11 }} />
            <Tooltip content={tooltipContent} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name="Close"
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#60a5fa"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
              name="High"
            />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#ef4444"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
              name="Low"
            />
          </LineChart>
        )}

        {chartType === 'area' && (
          <AreaChart {...chartProps}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0 0)" />
            <XAxis dataKey="time" stroke="oklch(0.5 0 0)" tick={{ fontSize: 11 }} />
            <YAxis stroke="oklch(0.5 0 0)" tick={{ fontSize: 11 }} />
            <Tooltip content={tooltipContent} />
            <Area
              type="monotone"
              dataKey="close"
              fill="url(#areaGradient)"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              name="Close"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
