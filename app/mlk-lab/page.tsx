'use client';

import { Navbar } from '@/components/wikiwiz/navbar';
import { MLKDashboard } from '@/components/mlk/mlk-dashboard';

export default function MlkLabPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 space-y-2">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground">
              MLK Lab — Intelligent Risk Prediction
            </h1>
            <p className="text-muted-foreground text-lg">
              Real-time market analysis with IRP Engine. Gold trading simulation with advanced probability modeling.
            </p>
          </div>

          <MLKDashboard />
        </div>
      </main>
    </>
  );
}
