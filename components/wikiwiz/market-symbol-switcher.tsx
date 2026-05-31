'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface MarketSymbol {
  label: string;
  tradingview: string;
  color: string;
  description: string;
}

const MARKET_SYMBOLS: MarketSymbol[] = [
  {
    label: 'GOLD',
    tradingview: 'FOREXCOM:XAUUSD',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Gold Spot Price'
  },
  {
    label: 'EURUSD',
    tradingview: 'FX_IDC:EURUSD',
    color: 'from-blue-500 to-blue-600',
    description: 'Euro vs US Dollar'
  },
  {
    label: 'OIL',
    tradingview: 'NYMEX:CL1!',
    color: 'from-red-600 to-red-700',
    description: 'Crude Oil (WTI)'
  },
  {
    label: 'BTCUSD',
    tradingview: 'BITSTAMP:BTCUSD',
    color: 'from-orange-500 to-orange-600',
    description: 'Bitcoin'
  },
  {
    label: 'NIFTY',
    tradingview: 'NSE:NIFTY50',
    color: 'from-green-500 to-green-600',
    description: 'NIFTY 50 Index'
  },
  {
    label: 'NASDAQ',
    tradingview: 'NASDAQ:IXIC',
    color: 'from-indigo-500 to-indigo-600',
    description: 'NASDAQ Composite'
  }
];

interface MarketSymbolSwitcherProps {
  onSymbolChange: (symbol: MarketSymbol) => void;
  activeSymbol: MarketSymbol;
}

export function MarketSymbolSwitcher({ onSymbolChange, activeSymbol }: MarketSymbolSwitcherProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Symbol Label Display */}
      <div className="text-center">
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Active Market
        </h3>
        <motion.div
          key={activeSymbol.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-serif font-bold bg-gradient-to-r ${activeSymbol.color} bg-clip-text text-transparent`}
        >
          {activeSymbol.label}
        </motion.div>
        <p className="text-sm text-muted-foreground mt-2">
          {activeSymbol.description}
        </p>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {MARKET_SYMBOLS.map((symbol, index) => (
          <motion.button
            key={symbol.label}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSymbolChange(symbol)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-3 py-2 md:px-4 md:py-3 rounded-lg font-semibold text-sm transition-all ${
              activeSymbol.label === symbol.label
                ? `bg-gradient-to-r ${symbol.color} text-white shadow-lg`
                : 'bg-card border border-border hover:border-primary/50 text-foreground'
            }`}
          >
            {symbol.label}
            {activeSymbol.label === symbol.label && (
              <motion.div
                layoutId="activeSymbol"
                className="absolute inset-0 rounded-lg border-2 border-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Hover Info */}
      {hoveredIndex !== null && hoveredIndex !== MARKET_SYMBOLS.findIndex(s => s.label === activeSymbol.label) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-center text-muted-foreground"
        >
          Click to switch to {MARKET_SYMBOLS[hoveredIndex].label}
        </motion.div>
      )}
    </div>
  );
}
