"use client";


import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "chart" | "calendar" | "overview" | "sentiment";

interface FearGreedData {
  value: number;
  classification: string;
}

// ─── Small helpers ────────────────────────────────────────────────────────────
function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5 mr-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
    </span>
  );
}

function SectionHeader({
  label,
  live = true,
}: {
  label: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {live && <LiveDot />}
      <span className="text-xs font-semibold tracking-[0.15em] text-amber-400/80 uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── TradingView Script loader (idempotent) ───────────────────────────────────
function loadTVScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    document.head.appendChild(s);
  });
}

// ─── TradingView Advanced Chart ───────────────────────────────────────────────
function AdvancedChart({ symbol = "BSE:SENSEX" }: { symbol?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!ref.current || initialized.current) return;
    initialized.current = true;

    // Clear any previous widget
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(10, 10, 10, 0)",
      gridColor: "rgba(212, 162, 42, 0.06)",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
    });

    ref.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      ref={ref}
      className="tradingview-widget-container"
      style={{ height: "100%", width: "100%" }}
    />
  );
}

// ─── TradingView Economic Calendar ───────────────────────────────────────────
function EconomicCalendar() {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!ref.current || initialized.current) return;
    initialized.current = true;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: "100%",
      locale: "en",
      importanceFilter: "0,1",
      countryFilter: "in,us,eu,gb,cn,jp",
    });

    ref.current.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      className="tradingview-widget-container"
      style={{ height: "100%", width: "100%" }}
    />
  );
}

// ─── TradingView Market Overview ──────────────────────────────────────────────
function MarketOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!ref.current || initialized.current) return;
    initialized.current = true;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "100%",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      plotLineColorGrowing: "rgba(212, 162, 42, 1)",
      plotLineColorFalling: "rgba(239, 68, 68, 1)",
      gridLineColor: "rgba(212, 162, 42, 0.06)",
      scaleFontColor: "rgba(180, 180, 180, 1)",
      belowLineFillColorGrowing: "rgba(212, 162, 42, 0.12)",
      belowLineFillColorFalling: "rgba(239, 68, 68, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(10, 10, 10, 0)",
      belowLineFillColorFallingBottom: "rgba(10, 10, 10, 0)",
      symbolActiveColor: "rgba(212, 162, 42, 0.12)",
      tabs: [
        {
          title: "India",
          symbols: [
            { s: "BSE:SENSEX", d: "SENSEX" },
            { s: "NSE:NIFTY50", d: "NIFTY 50" },
            { s: "NSE:BANKNIFTY", d: "BANK NIFTY" },
            { s: "NSE:NIFTYMIDCAP100", d: "MIDCAP 100" },
            { s: "NSE:INFY", d: "Infosys" },
            { s: "NSE:RELIANCE", d: "Reliance" },
          ],
          originalTitle: "India",
        },
        {
          title: "Global",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "NASDAQ" },
            { s: "FOREXCOM:DJI", d: "Dow Jones" },
            { s: "INDEX:NKY", d: "Nikkei 225" },
            { s: "INDEX:DEU40", d: "DAX Index" },
            { s: "FOREXCOM:UKXGBP", d: "UK 100" },
          ],
          originalTitle: "Global",
        },
        {
          title: "Crypto",
          symbols: [
            { s: "BITSTAMP:BTCUSD", d: "Bitcoin" },
            { s: "BITSTAMP:ETHUSD", d: "Ethereum" },
            { s: "BINANCE:BNBUSD", d: "BNB" },
            { s: "COINBASE:SOLUSD", d: "Solana" },
          ],
          originalTitle: "Crypto",
        },
      ],
    });

    ref.current.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      className="tradingview-widget-container"
      style={{ height: "100%", width: "100%" }}
    />
  );
}

// ─── Ticker Tape ──────────────────────────────────────────────────────────────
function TickerTape() {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!ref.current || initialized.current) return;
    initialized.current = true;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "NSE:NIFTY50", title: "NIFTY 50" },
        { proName: "BSE:SENSEX", title: "SENSEX" },
        { proName: "NSE:BANKNIFTY", title: "BANK NIFTY" },
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
        { proName: "FX:USDINR", title: "USD/INR" },
        { proName: "TVC:GOLD", title: "GOLD" },
        { proName: "TVC:USOIL", title: "CRUDE" },
        { proName: "NSE:RELIANCE", title: "Reliance" },
        { proName: "NSE:INFY", title: "Infosys" },
        { proName: "NSE:TCS", title: "TCS" },
        { proName: "NSE:HDFCBANK", title: "HDFC Bank" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="tradingview-widget-container w-full" />;
}

// ─── Fear & Greed Meter ───────────────────────────────────────────────────────
function FearGreedMeter({ data }: { data: FearGreedData | null }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-neutral-500">
        <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <span className="text-xs tracking-widest">FETCHING SENTIMENT…</span>
      </div>
    );
  }

  const value = data.value;
  // Map 0-100 to rotation: -90deg (extreme fear) → +90deg (extreme greed)
  const rotation = -90 + value * 1.8;

  const getColor = (v: number) => {
    if (v <= 25) return "#ef4444";
    if (v <= 45) return "#f97316";
    if (v <= 55) return "#eab308";
    if (v <= 75) return "#84cc16";
    return "#22c55e";
  };

  const color = getColor(value);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-4">
      {/* Gauge arc */}
      <div className="relative w-48 h-24 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Colored arc segments */}
          {[
            { start: 0, end: 0.2, color: "#ef4444" },
            { start: 0.2, end: 0.4, color: "#f97316" },
            { start: 0.4, end: 0.6, color: "#eab308" },
            { start: 0.6, end: 0.8, color: "#84cc16" },
            { start: 0.8, end: 1.0, color: "#22c55e" },
          ].map((seg, i) => {
            const r = 90;
            const cx = 100, cy = 100;
            const startAngle = Math.PI * (1 - seg.start);
            const endAngle = Math.PI * (1 - seg.end);
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy - r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy - r * Math.sin(endAngle);
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2}`}
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeLinecap="butt"
                opacity="0.7"
              />
            );
          })}
          {/* Needle */}
          <g transform={`translate(100 100) rotate(${rotation})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-72"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="6" fill={color} />
          </g>
        </svg>
      </div>

      {/* Value display */}
      <div className="text-center">
        <div
          className="text-5xl font-bold tabular-nums"
          style={{ color, textShadow: `0 0 20px ${color}40` }}
        >
          {value}
        </div>
        <div
          className="text-sm font-semibold tracking-widest mt-1 uppercase"
          style={{ color }}
        >
          {data.classification}
        </div>
      </div>

      <div className="flex gap-6 text-xs text-neutral-500 mt-1">
        <span>0 — Extreme Fear</span>
        <span>100 — Extreme Greed</span>
      </div>
    </div>
  );
}

// ─── Symbol switcher for the chart ───────────────────────────────────────────
const CHART_SYMBOLS = [
  { label: "SENSEX", value: "BSE:SENSEX" },
  { label: "NIFTY 50", value: "NSE:NIFTY50" },
  { label: "BANK NIFTY", value: "NSE:BANKNIFTY" },
  { label: "BTC/USD", value: "BITSTAMP:BTCUSD" },
  { label: "USD/INR", value: "FX:USDINR" },
  { label: "GOLD", value: "TVC:GOLD" },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MarketPulse() {
  const [tab, setTab] = useState<Tab>("chart");
  const [chartSymbol, setChartSymbol] = useState("BSE:SENSEX");
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null);

  // Fetch Fear & Greed from your existing proxy endpoint
  useEffect(() => {
    fetch("/api/fear-greed")
      .then((r) => r.json())
      .then((d) => {
        // Adjust key paths to match your proxy's response shape
        const v = d?.data?.[0]?.x ?? d?.value ?? 50;
        const c = d?.data?.[0]?.valueText ?? d?.classification ?? "Neutral";
        setFearGreed({ value: Number(v), classification: c });
      })
      .catch(() => setFearGreed({ value: 50, classification: "Neutral" }));
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "chart", label: "Live Chart" },
    { id: "overview", label: "Market Overview" },
    { id: "calendar", label: "Economic Calendar" },
    { id: "sentiment", label: "Fear & Greed" },
  ];

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden" id="market-pulse">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/4 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-amber-400/60 uppercase mb-3 font-medium">
            Live Markets
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Market Pulse
          </h2>
          <p className="text-neutral-400 mt-2 text-sm max-w-xl mx-auto">
            Real-time charts, macro events, and institutional data — all in one view.
          </p>
        </div>

        {/* ── Ticker Tape ── */}
        <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] mb-4">
          <TickerTape />
        </div>

        {/* ── Main panel ── */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Tab bar */}
          <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-white/5 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? "text-amber-400"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {t.id === "chart" && tab === "chart" && (
                  <span className="inline-flex items-center gap-1.5">
                    <LiveDot />
                    {t.label}
                  </span>
                )}
                {!(t.id === "chart" && tab === "chart") && t.label}
                {tab === t.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="relative" style={{ minHeight: 520 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                {tab === "chart" && (
                  <div className="flex flex-col h-full">
                    {/* Symbol switcher */}
                    <div className="flex gap-2 px-4 pt-3 pb-2 flex-wrap">
                      {CHART_SYMBOLS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setChartSymbol(s.value)}
                          className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            chartSymbol === s.value
                              ? "bg-amber-400/15 border-amber-400/60 text-amber-300"
                              : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-neutral-200"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 px-2 pb-2" style={{ height: 460 }}>
                      <AdvancedChart symbol={chartSymbol} />
                    </div>
                  </div>
                )}

                {tab === "overview" && (
                  <div className="p-3 h-full" style={{ height: 520 }}>
                    <MarketOverview />
                  </div>
                )}

                {tab === "calendar" && (
                  <div className="p-3 h-full" style={{ height: 520 }}>
                    <EconomicCalendar />
                  </div>
                )}

                {tab === "sentiment" && (
                  <div className="p-6 h-full flex flex-col">
                    <SectionHeader label="CNN Fear & Greed Index" />
                    <div className="flex-1">
                      <FearGreedMeter data={fearGreed} />
                    </div>
                    <p className="text-center text-xs text-neutral-600 mt-4">
                      Data refreshed every 5 min via your RapidAPI proxy
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom attribution */}
        <p className="text-center text-neutral-700 text-xs mt-4">
          Charts & data powered by{" "}
          <a
            href="https://www.tradingview.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-300 underline underline-offset-2 transition-colors"
          >
            TradingView
          </a>
        </p>
      </div>
    </section>
  );
}
