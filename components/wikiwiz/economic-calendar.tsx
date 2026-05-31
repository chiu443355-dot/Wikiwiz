'use client';

import { useEffect, useRef } from 'react';

export function EconomicCalendar() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Live Market Ticker Tape Widget
    if (tickerRef.current && !tickerRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: 'FOREXCOM:SPX500', title: 'S&P 500' },
          { proName: 'FX_IDC:USDINR', title: 'USD/INR' },
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BSE:SENSEX', title: 'Sensex' }
        ],
        showSymbolLogo: true,
        colorTheme: 'dark',
        isTransparent: true,
        displayMode: 'adaptive',
      });
      tickerRef.current.appendChild(script);
    }

    // 2. Macro Economic Calendar Widget
    if (calendarRef.current && !calendarRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: '100%',
        height: '500',
        colorTheme: 'dark',
        isTransparent: false,
        importanceFilter: '-1,0,1',
        currencyFilter: 'INR,USD,EUR,GBP',
      });
      calendarRef.current.appendChild(script);
    }

    // 3. Live Financial News Timeline Widget
    if (newsRef.current && !newsRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: 'all_symbols',
        colorTheme: 'dark',
        isTransparent: false,
        displayMode: 'regular',
        width: '100%',
        height: '500',
      });
      newsRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* Ticker Tape across the top */}
      <div ref={tickerRef} className="w-full bg-card/40 backdrop-blur rounded-xl overflow-hidden border border-border" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Economic Calendar Block */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-serif font-bold text-xl mb-4 text-foreground tracking-wide">Macro Economic Calendar</h3>
          <div ref={calendarRef} className="w-full" />
        </div>

        {/* Live News Feed Block */}
        <div className="p-6 rounded-2xl border border-border bg-card">
          <h3 className="font-serif font-bold text-xl mb-4 text-foreground tracking-wide">Institutional News Flow</h3>
          <div ref={newsRef} className="w-full" />
        </div>
      </div>
    </div>
  );
}
