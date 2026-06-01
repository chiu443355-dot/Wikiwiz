import { Navbar } from '@/components/wikiwiz/navbar';

export default function MlkLabPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12">

        {/* MLK Simulation Workspace */}
        <div className="w-full border border-border p-6 rounded-2xl bg-card min-h-[400px] flex items-center justify-center">
          <p className="text-center text-muted-foreground font-mono text-sm">
            [MLK Simulation Workspace — Coming Soon]
          </p>
        </div>

      </main>
    </>
  );
}
