import { QuizQuestion } from '@/components/wikiwiz/chapter-quiz';

export const chapterQuizzes: Record<string, QuizQuestion[]> = {
  'ch-0-0': [
    {
      id: 'q1',
      question: 'What is money fundamentally?',
      options: [
        'Paper and coins with face value',
        'Crystallized effort and claim on wealth',
        'A government invention to control people',
        'A commodity like gold'
      ],
      correct: 1,
      explanation: 'Money is crystallized effort. It represents value that has been created and is a claim on goods or services. It\'s not valuable because of the paper itself, but because of the universal agreement that it can be exchanged for real goods.'
    },
    {
      id: 'q2',
      question: 'If inflation is 5% annually and you keep ₹10 lakhs in cash, what is your loss after 10 years?',
      options: [
        '₹2,50,000',
        '₹3,86,000',
        '₹5,00,000',
        '₹6,14,000'
      ],
      correct: 1,
      explanation: 'At 5% inflation over 10 years, ₹10 lakhs loses about 38.6% of its purchasing power, leaving only ₹6.14 lakhs in real value. This is why holding cash is guaranteed to lose to inflation.'
    },
    {
      id: 'q3',
      question: 'Which function of money is MOST important for investors to understand?',
      options: [
        'Medium of exchange',
        'Store of value',
        'Unit of account',
        'All are equally important'
      ],
      correct: 1,
      explanation: 'For investors, understanding money as a store of value is critical because inflation constantly erodes purchasing power. This is why you must invest to beat inflation and preserve wealth over time.'
    }
  ],
  'ch-0-1': [
    {
      id: 'q1',
      question: 'If you invest ₹10,000 at 12% annual returns for 30 years, what will you have (approximately)?',
      options: [
        '₹3,60,000',
        '₹96,000',
        '₹3,00,000',
        '₹3,00,000+'
      ],
      correct: 3,
      explanation: 'At 12% annual returns, ₹10,000 compounds to approximately ₹2,99,599 in 30 years. This is the power of compounding - your money grows exponentially when left untouched.'
    },
    {
      id: 'q2',
      question: 'If your investment fees are 2% annually but your returns are 12%, what is your true (net) return?',
      options: [
        '12%',
        '10%',
        '14%',
        '2%'
      ],
      correct: 1,
      explanation: 'Net return = 12% - 2% = 10%. Fees reduce compound returns dramatically. Over 30 years, that 2% difference means you end up with only 35% of what you would have earned without the fees.'
    },
    {
      id: 'q3',
      question: 'What matters more for wealth building?',
      options: [
        'Making 50% returns in 2 years',
        'Making 12% returns consistently for 30 years',
        'Timing the market perfectly',
        'Picking individual winning stocks'
      ],
      correct: 1,
      explanation: 'Consistency beats intensity in compounding. A trader making 12% annually for 30 years will have far more wealth than someone who makes 50% once then struggles. Compound returns require discipline over decades.'
    }
  ],
  'ch-0-2': [
    {
      id: 'q1',
      question: 'The Real Return formula is:',
      options: [
        'Nominal Return + Inflation',
        'Nominal Return - Inflation',
        'Inflation / Nominal Return',
        'Nominal Return × Inflation'
      ],
      correct: 1,
      explanation: 'Real Return = Nominal Return - Inflation. If you make 6% returns but inflation is 5%, your real return is only 1%. This is the only number that matters for long-term wealth.'
    },
    {
      id: 'q2',
      question: 'Which investment typically provides the BEST protection against inflation?',
      options: [
        'Fixed deposits (6% interest)',
        'Savings account (3% interest)',
        'Equities (10-12% real returns)',
        'Government bonds (4% interest)'
      ],
      correct: 2,
      explanation: 'Equities historically deliver 10-12% real returns (after inflation). Fixed deposits and bonds typically offer real returns of only 1-3% after inflation. Real assets beat nominal returns.'
    },
    {
      id: 'q3',
      question: 'In high inflation environments, who benefits the MOST?',
      options: [
        'Lenders (banks)',
        'Savers (cash holders)',
        'Borrowers',
        'Government'
      ],
      correct: 2,
      explanation: 'Borrowers benefit because they repay debt with money that\'s worth less than when they borrowed. If you borrowed at 5% fixed rate and inflation is 6%, the lender loses real value, and you gain.'
    }
  ],
  'ch-1-0': [
    {
      id: 'q1',
      question: 'In an order book, what is the "spread"?',
      options: [
        'The total volume traded',
        'The difference between bid and ask prices',
        'The price movement over time',
        'The number of orders in the queue'
      ],
      correct: 1,
      explanation: 'The spread is the difference between the highest bid (buyers) and the lowest ask (sellers). A tight spread means the stock is liquid. A wide spread means it\'s illiquid and expensive to trade.'
    },
    {
      id: 'q2',
      question: 'Market makers profit primarily from:',
      options: [
        'Stock price appreciation',
        'Buying low and selling high',
        'The bid-ask spread',
        'Company dividends'
      ],
      correct: 2,
      explanation: 'Market makers buy at the bid and sell at the ask, profiting from the spread. They don\'t bet on direction; they profit from the friction between buyers and sellers on every transaction.'
    },
    {
      id: 'q3',
      question: 'What happens to the bid-ask spread during a market crash?',
      options: [
        'It stays the same',
        'It tightens (becomes smaller)',
        'It widens (becomes larger)',
        'It inverts (bid > ask)'
      ],
      correct: 2,
      explanation: 'During crashes, market makers retreat and spreads widen dramatically. This means it becomes very expensive to exit positions when you need to most. This is why position sizing matters.'
    }
  ]
};

export function getChapterQuiz(chapterId: string): QuizQuestion[] | undefined {
  return chapterQuizzes[chapterId];
}
