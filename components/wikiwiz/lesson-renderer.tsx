'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from '@/lib/hooks/use-translation';

interface LessonRendererProps {
  content: string;
}

export function LessonRenderer({ content }: LessonRendererProps) {
  const { t } = useTranslation();
  
  const paragraphs = useMemo(() => {
    return content
      .split('\n\n')
      .filter((p) => p.trim().length > 0);
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {paragraphs.map((paragraph, idx) => {
        if (paragraph.startsWith('## ')) {
          // Main heading
          return (
            <motion.h2
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="text-3xl font-serif font-bold text-foreground pt-8"
            >
              {t(paragraph.replace('## ', ''))}
            </motion.h2>
          );
        }

        if (paragraph.startsWith('### ')) {
          // Subheading
          return (
            <motion.h3
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="text-xl font-serif font-bold text-primary pt-6"
            >
              {t(paragraph.replace('### ', ''))}
            </motion.h3>
          );
        }

        if (paragraph.startsWith('**') && paragraph.includes(':**')) {
          // Bold label with colon
          const [label, ...rest] = paragraph.split(':');
          return (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="text-lg text-foreground leading-relaxed"
            >
              <span className="font-bold text-primary">{t(label.replace(/\*\*/g, ''))}:</span>
              <span>{t(rest.join(':'))}</span>
            </motion.p>
          );
        }

        if (paragraph.startsWith('- ')) {
          // Bullet points
          const items = paragraph.split('\n').filter((l) => l.startsWith('- '));
          return (
            <motion.ul
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, staggerChildren: 0.05 }}
              className="space-y-2 ml-4"
            >
              {items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-3 text-muted-foreground"
                >
                  <span className="text-primary font-bold">•</span>
                  <span>{t(item.replace('- ', ''))}</span>
                </motion.li>
              ))}
            </motion.ul>
          );
        }

        // Regular paragraph
        return (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ delay: idx * 0.02 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {t(paragraph)}
          </motion.p>
        );
      })}
    </motion.div>
  );
}
