export interface Phase {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  gitaShloka: {
    verse: string;
    meaning: string;
  };
  locked?: boolean;
}

export const phases: Phase[] = [
  {
    id: 'phase-0',
    number: 0,
    title: 'What is Money?',
    duration: '2 hours',
    description: 'Understanding the fundamentals of currency, value, and wealth creation',
    topics: ['Currency basics', 'Money supply', 'Inflation', 'Purchasing power'],
    gitaShloka: {
      verse: 'Arjun! Money is neither good nor bad, it is a tool like any other. How you use it determines your path.',
      meaning: 'Context on wealth from the Gita - understanding the nature of material wealth',
    },
  },
  {
    id: 'phase-1',
    number: 1,
    title: 'The Power of Compounding',
    duration: '3 hours',
    description: 'Albert Einstein called it the 8th wonder of the world. Learn how small investments grow exponentially.',
    topics: ['Compound interest', 'Time horizon', 'SIP strategy', 'Long-term investing'],
    gitaShloka: {
      verse: 'Consistency and patience are the hallmarks of a wise investor',
      meaning: 'Understanding delayed gratification and the power of consistency',
    },
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Risk & Reward',
    duration: '2.5 hours',
    description: 'No reward without risk. Learn to measure, manage, and mitigate investment risk.',
    topics: ['Risk assessment', 'Volatility', 'Diversification', 'Risk management'],
    gitaShloka: {
      verse: 'A wise person knows the risk they are taking and acts accordingly.',
      meaning: 'Educated risk-taking and strategic decision making',
    },
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Inflation: The Silent Killer',
    duration: '2 hours',
    description: 'Why keeping money in the bank can make you poor. Understanding inflation and wealth preservation.',
    topics: ['Inflation effects', 'Real returns', 'Asset allocation', 'Wealth erosion'],
    gitaShloka: {
      verse: 'What seems secure today may not be tomorrow. Prepare for change.',
      meaning: 'Adapt to changing circumstances and protect your wealth',
    },
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Market Cycles & Psychology',
    duration: '3 hours',
    description: 'Markets move in cycles. Learn behavioral finance and control your emotions.',
    topics: ['Bull markets', 'Bear markets', 'Psychological biases', 'Herd mentality'],
    gitaShloka: {
      verse: 'The mind is like a wild horse. Master it, and you master the markets.',
      meaning: 'Emotional control and disciplined decision-making',
    },
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Fundamental Analysis',
    duration: '4 hours',
    description: 'Learn to read financial statements and find quality businesses.',
    topics: ['P/E ratio', 'Balance sheets', 'Cash flow', 'Valuation metrics'],
    gitaShloka: {
      verse: 'Understand what you own, not just the price you paid.',
      meaning: 'Deep knowledge and due diligence in investing',
    },
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Technical Analysis',
    duration: '3.5 hours',
    description: 'Learn to read charts, identify trends, and find entry/exit points.',
    topics: ['Support & Resistance', 'Trends', 'Chart patterns', 'Indicators'],
    gitaShloka: {
      verse: 'The path is written in the patterns of the past.',
      meaning: 'Pattern recognition and systematic analysis',
    },
  },
  {
    id: 'phase-7',
    number: 7,
    title: 'Sector & Industry Analysis',
    duration: '3 hours',
    description: 'Why some industries outperform others. Macro trends and industry cycles.',
    topics: ['Industry cycles', 'Sector rotation', 'Growth trends', 'Competitive advantage'],
    gitaShloka: {
      verse: 'Know the terrain before you march into battle.',
      meaning: 'Understanding the broader economic landscape',
    },
  },
  {
    id: 'phase-8',
    number: 8,
    title: 'Derivatives & Hedging',
    duration: '4 hours',
    description: 'Options, futures, and how to protect your investments.',
    topics: ['Options basics', 'Futures', 'Hedging strategies', 'Risk protection'],
    gitaShloka: {
      verse: 'A shield in battle, not a weapon for aggression.',
      meaning: 'Defensive strategies and risk mitigation',
    },
  },
  {
    id: 'phase-9',
    number: 9,
    title: 'Portfolio Construction',
    duration: '3 hours',
    description: 'Building a balanced portfolio that works for your goals.',
    topics: ['Asset allocation', 'Rebalancing', 'Tax efficiency', 'Diversification'],
    gitaShloka: {
      verse: 'Do not put all fruits in one basket.',
      meaning: 'The wisdom of diversification',
    },
  },
  {
    id: 'phase-10',
    number: 10,
    title: 'Quantitative Investing',
    duration: '4 hours',
    description: 'Data-driven investing with mathematical models and algorithms.',
    topics: ['Statistical analysis', 'Backtesting', 'Algorithms', 'Model building'],
    gitaShloka: {
      verse: 'Truth is in numbers. Know the numbers, know the truth.',
      meaning: 'Scientific and analytical approach to investing',
    },
  },
  {
    id: 'phase-11',
    number: 11,
    title: 'Macroeconomics & Global Markets',
    duration: '3.5 hours',
    description: 'Understanding global economic trends and currency markets.',
    topics: ['GDP growth', 'Central banks', 'Currency trading', 'Global trends'],
    gitaShloka: {
      verse: 'The river flows to the ocean. Understand the flow.',
      meaning: 'Understanding larger economic currents',
    },
  },
  {
    id: 'phase-12',
    number: 12,
    title: 'Retirement Planning',
    duration: '2.5 hours',
    description: 'How to build wealth for a secure retirement.',
    topics: ['Retirement corpus', 'Tax planning', 'Pension', 'Legacy planning'],
    gitaShloka: {
      verse: 'The wise prepare for tomorrow while living today.',
      meaning: 'Long-term financial security planning',
    },
  },
  {
    id: 'phase-13',
    number: 13,
    title: 'Estate Planning & Wealth Transfer',
    duration: '2 hours',
    description: 'Ensuring your wealth benefits your heirs and causes.',
    topics: ['Will & trusts', 'Tax planning', 'Inheritance', 'Legacy'],
    gitaShloka: {
      verse: 'What you leave behind is more important than what you accumulated.',
      meaning: 'Creating lasting impact and legacy',
    },
  },
  {
    id: 'phase-14',
    number: 14,
    title: 'Mastery: Philosophy of Wealth',
    duration: '3 hours',
    description: 'Bringing it all together: the Gita principles applied to modern investing.',
    topics: ['Dharma & wealth', 'Ethical investing', 'True success', 'Inner peace'],
    gitaShloka: {
      verse: 'Wealth without wisdom is a curse. Wisdom without action is empty.',
      meaning: 'Integration of philosophy and practical wealth building',
    },
  },
];
