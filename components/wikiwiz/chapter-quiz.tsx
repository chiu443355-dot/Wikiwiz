'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ChapterQuizProps {
  chapterId: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function ChapterQuiz({ chapterId, questions, onComplete }: ChapterQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isCorrect = currentAnswer === currentQuestion.correct;
  const score = answers.filter((ans, idx) => ans === questions[idx].correct).length;
  const percentage = Math.round((score / questions.length) * 100);

  const handleAnswer = (optionIndex: number) => {
    if (currentAnswer === null) {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = optionIndex;
      setAnswers(newAnswers);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    } else {
      setCompleted(true);
      onComplete?.(percentage);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setCompleted(false);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-center py-12"
      >
        <div>
          <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
            Quiz Complete!
          </h3>
          <p className="text-lg text-muted-foreground">You scored {score}/{questions.length}</p>
        </div>

        <div className="relative w-40 h-40 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-border"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={440}
              strokeDashoffset={440 - (percentage / 100) * 440}
              className={percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (percentage / 100) * 440 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{percentage}%</span>
          </div>
        </div>

        <div className="space-y-3">
          {percentage >= 80 && (
            <p className="text-green-600 dark:text-green-400 font-semibold">Excellent! You mastered this chapter.</p>
          )}
          {percentage >= 60 && percentage < 80 && (
            <p className="text-blue-600 dark:text-blue-400 font-semibold">Good! You understand the key concepts.</p>
          )}
          {percentage < 60 && (
            <p className="text-orange-600 dark:text-orange-400 font-semibold">Keep learning! Review this chapter again.</p>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
        >
          Retake Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {currentIndex + 1 === questions.length ? 'Final' : `${questions.length - currentIndex - 1} remaining`}
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-foreground">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={currentAnswer !== null}
              whileHover={currentAnswer === null ? { scale: 1.02 } : {}}
              whileTap={currentAnswer === null ? { scale: 0.98 } : {}}
              className={`w-full p-4 text-left rounded-lg border-2 font-medium transition ${
                currentAnswer === null
                  ? 'border-border bg-card hover:bg-accent/10 hover:border-primary/50 cursor-pointer'
                  : idx === currentQuestion.correct
                  ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100'
                  : idx === currentAnswer
                  ? 'border-red-500 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100'
                  : 'border-border bg-card opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                <AnimatePresence>
                  {currentAnswer !== null && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {idx === currentQuestion.correct ? (
                        <Check size={20} className="text-green-600" />
                      ) : idx === currentAnswer ? (
                        <X size={20} className="text-red-600" />
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-lg border-l-4 ${
              isCorrect
                ? 'border-l-green-500 bg-green-50 dark:bg-green-950'
                : 'border-l-orange-500 bg-orange-50 dark:bg-orange-950'
            }`}
          >
            <p className={`text-sm font-medium mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
            </p>
            <p className="text-sm text-foreground">{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {showExplanation && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
        >
          {currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
          <ArrowRight size={18} />
        </motion.button>
      )}
    </motion.div>
  );
}
