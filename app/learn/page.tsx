'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/wikiwiz/navbar';
import { chapters } from '@/data/chapters';
import { phases } from '@/data/phases';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { LessonRenderer } from '@/components/wikiwiz/lesson-renderer';
import { ChapterQuiz } from '@/components/wikiwiz/chapter-quiz';
import { getChapterQuiz } from '@/data/chapter-quizzes';

function ChapterContent({ phaseId, chapterId }: { phaseId: string; chapterId: string }) {
  const phase = phases.find((p) => p.id === phaseId);
  const chapter = chapters.find((c) => c.id === chapterId && c.phaseId === phaseId);

  if (!phase || !chapter) {
    notFound();
  }

  const phaseChapters = chapters
    .filter((c) => c.phaseId === phaseId)
    .sort((a, b) => a.number - b.number);

  const currentIndex = phaseChapters.findIndex((c) => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? phaseChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < phaseChapters.length - 1 ? phaseChapters[currentIndex + 1] : null;
  const quiz = getChapterQuiz(chapterId);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-12 sm:px-6 lg:px-8 border-b border-border"
        >
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/learn/${phaseId}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6"
            >
              <ArrowLeft size={16} />
              Back to {phase.title}
            </Link>

            <div className="text-sm font-mono text-primary/70 mb-2 tracking-wider uppercase">
              Phase {phase.number} · Chapter {chapter.number + 1} of {phaseChapters.length}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              {chapter.title}
            </h1>
          </div>
        </motion.section>

        {/* Chapter Content */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Lesson Content */}
            <LessonRenderer content={chapter.script} />

            {/* Gita Connection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20"
            >
              <div className="text-xs text-primary font-semibold mb-3 uppercase tracking-wider">
                Gita Wisdom
              </div>
              <blockquote className="font-serif text-base text-foreground italic leading-relaxed mb-3">
                "{chapter.gitaShloka.transliteration}"
              </blockquote>
              <p className="text-sm text-muted-foreground mb-3">{chapter.gitaShloka.meaning}</p>
              <div className="border-t border-primary/10 pt-3">
                <p className="text-sm text-primary/80 font-medium">Trading Application:</p>
                <p className="text-sm text-muted-foreground mt-1">{chapter.gitaShloka.tradingApplication}</p>
              </div>
            </motion.div>

            {/* Quiz */}
            {quiz && quiz.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Test Your Knowledge
                </h2>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <ChapterQuiz chapterId={chapterId} questions={quiz} />
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-border">
              {prevChapter ? (
                <Link
                  href={`/learn/${phaseId}/${prevChapter.id}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-muted-foreground">Previous Chapter</div>
                    <div className="font-medium text-foreground">{prevChapter.title}</div>
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/learn/${phaseId}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-muted-foreground">Back to Phase</div>
                    <div className="font-medium text-foreground">{phase.title}</div>
                  </div>
                </Link>
              )}

              {nextChapter ? (
                <Link
                  href={`/learn/${phaseId}/${nextChapter.id}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group text-right"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">Next Chapter</div>
                    <div className="font-medium text-foreground">{nextChapter.title}</div>
                  </div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href={`/learn/${phaseId}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:bg-card transition group text-right"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">Phase Complete!</div>
                    <div className="font-medium text-foreground">Back to {phase.title}</div>
                  </div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function ChapterPage() {
  const params = useParams();
  return (
    <ChapterContent
      phaseId={params.phaseId as string}
      chapterId={params.chapterId as string}
    />
  );
}
