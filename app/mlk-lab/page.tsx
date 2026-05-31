import { Navbar } from '@/components/wikiwiz/navbar';
import { EconomicCalendar } from '@/components/wikiwiz/economic-calendar';
import { FearGreedMeter } from '@/components/wikiwiz/fear-greed-meter';

export default function MlkLabPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        
        {/* Your Existing Top-Half Interface & Charts Sit Up Here */}
        <div className="w-full border border-border p-6 rounded-2xl bg-card">
          <p className="text-center text-muted-foreground font-mono text-sm">[Existing MLK Simulation Workspace Charts Render Here]</p>
        </div>

        {/* ═══════════ INTEGRATION LAYOUT BELOW THE CHARTS ═══════════ */}
        <section className="pt-8 border-t border-border space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold tracking-tight text-foreground sm:text-3xl">Market Pulse Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">Real-time systemic risk diagnostic feeds combined with institutional macroeconomic events.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
            {/* Left 3 Columns: Markets, News, Calendar */}
            <div className="xl:col-span-3">
              <EconomicCalendar />
            </div>

            {/* Right 1 Column: Sentiment Gauge */}
            <div className="xl:col-span-1 h-full">
              <FearGreedMeter />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
