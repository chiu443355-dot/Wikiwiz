'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { chapters } from '@/data/chapters';
import { phases } from '@/data/phases';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { LessonRenderer } from '@/components/wikiwiz/lesson-renderer';
import { ChapterQuiz } from '@/components/wikiwiz/chapter-quiz';
import { getChapterQuiz } from '@/data/chapter-quizzes';

function ChapterContent({ phaseId, chapterId }: { phaseId: string; chapterId: string }) {
  // If chapterId is the phase id itself (e.g. /learn/phase-0/phase-0), show phase overview
  const phase = phases.find((p) => p.id === phaseId);

  // Check if this is actually a chapter
  const chapter = chapters.find((c) => c.id === chapterId && c.phaseId === phaseId);

  if (!chapter) {
    // Fall back to phase overview if no chapter found
    if (!phase) notFound();

    const phaseChapters = chapters
      .filter((c) => c.phaseId === phaseId)
      .sort((a, b) => a.number - b.number);

    const phaseIndex = phases.findIndex((p) => p.id === phaseId);
    const prevPhase = phaseIndex > 0 ? phases[phaseIndex - 1] : null;
    const nextPhase = phaseIndex < phases.length - 1 ? phases[phaseIndex + 1] : null;

    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-b border-border"
          >
            <div className="max-w-5xl mx-auto">
              <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8">
                <ArrowLeft size={16} /> Back to Roadmap
              </Link>
              <div className="mb-6">
                <div className="text-sm font-mono text-primary/70 mb-3 tracking-wider uppercase">Phase {phase.number}</div>
                <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{phase.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{phase.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Clock size={16} className="text-primary" />
                  {phase.duration}
                </div>
                {phaseChapters.length > 0 && (
                  <Link href={`/learn/${phaseId}/${phaseChapters[0].id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition">
                    <BookOpen size={18} /> Start Learning <ArrowRight size={18} />
                  </Link>
                )}
              </div>
            </div>
          </motion.section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Chapters in this Phase</h2>
              <div className="space-y-4">
                {phaseChapters.map((ch, index) => (
                  <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ x: 4 }}>
                    <Link href={`/learn/${phaseId}/${ch.id}`}
                      className="group flex items-center gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {String(ch.number + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{ch.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{ch.script.slice(0, 120).replace(/[#*]/g, '')}...</p>
                      </div>
                      <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-border">
            <div className="max-w-5xl mx-auto flex justify-between">
              {prevPhase ? (
                <Link href={`/learn/${prevPhase.id}`} className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group">
                  <ArrowLeft size={18} />
                  <div><div className="text-xs text-muted-foreground">Previous Phase</div><div className="font-medium">{prevPhase.title}</div></div>
                </Link>
              ) : <div />}
              {nextPhase ? (
                <Link href={`/learn/${nextPhase.id}`} className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group text-right">
                  <div><div className="text-xs text-muted-foreground">Next Phase</div><div className="font-medium">{nextPhase.title}</div></div>
                  <ArrowRight size={18} />
                </Link>
              ) : <div />}
            </div>
          </section>
        </main>
      </>
    );
  }

  // Render actual chapter
  const phaseChapters = chapters.filter((c) => c.phaseId === phaseId).sort((a, b) => a.number - b.number);
  const currentIndex = phaseChapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? phaseChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < phaseChapters.length - 1 ? phaseChapters[currentIndex + 1] : null;
  const quiz = getChapterQuiz(chapterId);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-12 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <Link href={`/learn/${phaseId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6">
              <ArrowLeft size={16} /> Back to Phase
            </Link>
            <div className="text-sm font-mono text-primary/70 mb-2 tracking-wider uppercase">
              {phase?.title} · Chapter {chapter.number + 1}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">{chapter.title}</h1>
          </div>
        </motion.section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <LessonRenderer content={chapter.script} />

            {/* Gita Connection */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-12 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <div className="text-xs text-primary font-semibold mb-3 uppercase tracking-wider">Gita Wisdom</div>
              <blockquote className="font-serif text-base text-foreground italic leading-relaxed mb-3">
                "{chapter.gitaShloka.transliteration}"
              </blockquote>
              <p className="text-sm text-muted-foreground mb-2">{chapter.gitaShloka.meaning}</p>
              <p className="text-sm text-primary/80">{chapter.gitaShloka.tradingApplication}</p>
            </motion.div>

            {/* Quiz */}
            {quiz && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Test Your Knowledge</h2>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <ChapterQuiz chapterId={chapterId} questions={quiz} />
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between border-t border-border pt-8">
              {prevChapter ? (
                <Link href={`/learn/${phaseId}/${prevChapter.id}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group">
                  <ArrowLeft size={18} />
                  <div><div className="text-xs text-muted-foreground">Previous</div><div className="font-medium text-foreground">{prevChapter.title}</div></div>
                </Link>
              ) : (
                <Link href={`/learn/${phaseId}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group">
                  <ArrowLeft size={18} />
                  <div><div className="text-xs text-muted-foreground">Back to Phase</div><div className="font-medium text-foreground">{phase?.title}</div></div>
                </Link>
              )}
              {nextChapter ? (
                <Link href={`/learn/${phaseId}/${nextChapter.id}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group text-right">
                  <div><div className="text-xs text-muted-foreground">Next</div><div className="font-medium text-foreground">{nextChapter.title}</div></div>
                  <ArrowRight size={18} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function ChapterPage() {
  const params = useParams();
  return <ChapterContent phaseId={params.phaseId as string} chapterId={params.chapterId as string} />;
}
