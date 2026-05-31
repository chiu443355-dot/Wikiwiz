'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { chapters } from '@/data/chapters';
import { phases } from '@/data/phases';
import { LessonRenderer } from '@/components/wikiwiz/lesson-renderer';
import { ChapterQuiz } from '@/components/wikiwiz/chapter-quiz';
import { getChapterQuiz } from '@/data/chapter-quizzes';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ChapterOrPhasePage() {
  const params = useParams();
  const phaseId = params.phaseId as string;
  const chapterId = params.chapterId as string;
  const [showQuiz, setShowQuiz] = useState(false);

  const phase = phases.find((p) => p.id === phaseId);
  const chapter = chapters.find((c) => c.id === chapterId);

  // If chapterId matches a chapter, render the chapter
  if (chapter) {
    const phaseChapters = chapters
      .filter((c) => c.phaseId === phaseId)
      .sort((a, b) => a.number - b.number);

    const currentIdx = phaseChapters.findIndex((c) => c.id === chapterId);
    const prevChapter = currentIdx > 0 ? phaseChapters[currentIdx - 1] : null;
    const nextChapter = currentIdx < phaseChapters.length - 1 ? phaseChapters[currentIdx + 1] : null;
    const quiz = getChapterQuiz(chapterId);

    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/learn" className="hover:text-primary transition">Learn</Link>
              <span>/</span>
              <Link href={`/learn/${phaseId}`} className="hover:text-primary transition">
                {phase?.title ?? phaseId}
              </Link>
              <span>/</span>
              <span className="text-foreground">{chapter.title}</span>
            </div>

            {/* Chapter Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="text-sm font-mono text-primary/70 mb-2 tracking-wider uppercase">
                Chapter {chapter.number + 1}
              </div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                {chapter.title}
              </h1>
            </motion.div>

            {/* Chapter Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <LessonRenderer content={chapter.script} />
            </motion.div>

            {/* Gita Shloka */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 p-8 rounded-2xl border border-primary/20 bg-primary/5"
            >
              <div className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-4">
                Bhagavad Gita Connection
              </div>
              {chapter.gitaShloka.sanskrit && (
                <p className="font-serif text-lg text-foreground italic mb-3">
                  {chapter.gitaShloka.sanskrit}
                </p>
              )}
              <p className="font-mono text-sm text-primary/80 mb-3">
                {chapter.gitaShloka.transliteration}
              </p>
              <p className="text-muted-foreground mb-4">
                <span className="font-semibold text-foreground">Meaning: </span>
                {chapter.gitaShloka.meaning}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Trading Application: </span>
                {chapter.gitaShloka.tradingApplication}
              </p>
            </motion.div>

            {/* Quiz Section */}
            {quiz && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="border border-border rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-serif font-bold text-foreground">
                      Test Your Knowledge
                    </h2>
                    {!showQuiz && (
                      <button
                        onClick={() => setShowQuiz(true)}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
                      >
                        Start Quiz
                      </button>
                    )}
                  </div>
                  {showQuiz && (
                    <ChapterQuiz
                      chapterId={chapterId}
                      questions={quiz}
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-border">
              {prevChapter ? (
                <Link
                  href={`/learn/${phaseId}/${prevChapter.id}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition"
                >
                  <ArrowLeft size={18} />
                  <div>
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="font-medium text-sm">{prevChapter.title}</div>
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/learn/${phaseId}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition"
                >
                  <ArrowLeft size={18} />
                  <div>
                    <div className="text-xs text-muted-foreground">Back to Phase</div>
                    <div className="font-medium text-sm">{phase?.title}</div>
                  </div>
                </Link>
              )}

              {nextChapter ? (
                <Link
                  href={`/learn/${phaseId}/${nextChapter.id}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition text-right"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="font-medium text-sm">{nextChapter.title}</div>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </>
    );
  }

  // Fallback: render phase overview if chapterId doesn't match a chapter
  if (!phase) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-foreground mb-4">Page not found</h1>
            <Link href="/learn" className="text-primary hover:underline">Back to Learn</Link>
          </div>
        </main>
      </>
    );
  }

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
          className="px-4 py-20 sm:px-6 lg:px-8 border-b border-border"
        >
          <div className="max-w-5xl mx-auto">
            <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8">
              <ArrowLeft size={16} /> Back to Roadmap
            </Link>
            <div className="text-sm font-mono text-primary/70 mb-3 tracking-wider uppercase">
              Phase {phase.number}
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{phase.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{phase.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock size={16} className="text-primary" />
              {phase.duration}
            </div>
            {phaseChapters.length > 0 && (
              <Link
                href={`/learn/${phaseId}/${phaseChapters[0].id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
              >
                <BookOpen size={18} /> Start Learning <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </motion.section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Chapters in this Phase</h2>
            <div className="space-y-4">
              {phaseChapters.map((ch, index) => (
                <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ x: 4 }}>
                  <Link
                    href={`/learn/${phaseId}/${ch.id}`}
                    className="group flex items-center gap-6 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
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
              <Link href={`/learn/${prevPhase.id}`} className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition">
                <ArrowLeft size={18} />
                <div><div className="text-xs text-muted-foreground">Previous Phase</div><div className="font-medium">{prevPhase.title}</div></div>
              </Link>
            ) : <div />}
            {nextPhase ? (
              <Link href={`/learn/${nextPhase.id}`} className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition text-right">
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
