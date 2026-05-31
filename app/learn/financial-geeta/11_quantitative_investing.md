CHAPTER 11: QUANTITATIVE INVESTING
Covering: Intro to Quant Investing · Probability in Markets · Mean Reversion · Momentum Strategies · Statistical Analysis · Correlation & Covariance · Backtesting · Algorithmic Trading · Data Bias & Errors · Building Quant Models in India

The Hook
In 2008, Renaissance Technologies' Medallion Fund returned +66% when global markets crashed 40%. Every professional fund manager was bleeding. Jim Simons' quant team was printing money.
In India, a quiet revolution happened between 2015 and 2022. Algorithmic trading volume on NSE went from 38% of total turnover to over 60%. The entities doing this — HFT firms, quant desks, algo funds — do not guess. They run mathematical models on price data, find statistical edges, and execute them thousands of times per day.
When you click "buy" on your screen, the counterparty on the other side is often a machine running a model that has been backtested on 10 years of data.
Quantitative investing is not about being smarter than the market. It is about having a systematic, testable, repeatable edge — and exploiting it without emotion.
You do not need to be a mathematician. You need to understand what quant thinking means: probability over prediction, systems over intuition, evidence over opinion.
How many of your investment decisions are based on evidence — and how many are based on how you feel today?

The Concept
Quantitative investing uses mathematical models, statistical analysis, and historical data to make investment decisions systematically. Emotion is replaced by algorithm.
Probability thinking in markets: No trade is a certainty. Every trade is a probability distribution. A system with 55% win rate and 2:1 reward-risk ratio has positive expected value.
Expected Value Formula:

EV = (Win% × Average Gain) − (Loss% × Average Loss)

Worked Example: System has 55% win rate, average gain ₹10,000, average loss ₹5,000.
EV = (0.55 × ₹10,000) − (0.45 × ₹5,000) = ₹5,500 − ₹2,250 = ₹3,250 per trade average
Run this system 100 times = ₹3,25,000 expected profit. The edge is in the math, not in predicting the next trade's outcome.
Mean Reversion: Prices that deviate significantly from historical averages tend to revert. Nifty P/E above 25 (historically high) tends to revert downward over 2–3 years. Nifty P/E below 16 (historically low) tends to revert upward. This is mean reversion — and it explains why SIP during market crashes works.
Momentum Strategies: Stocks that have outperformed over 6–12 months tend to continue outperforming for another 3–6 months (momentum factor). India's momentum factor is well-documented. The Nifty 200 Momentum 30 index captures top 30 momentum stocks and has outperformed Nifty 50 by 4–5% annually over 10 years.
Statistical Analysis Basics:

Standard Deviation: Measures price volatility. High SD = high risk/reward.
Sharpe Ratio = (Return − Risk-free Rate) ÷ Standard Deviation. Sharpe above 1 = good risk-adjusted return.
Max Drawdown: Worst peak-to-trough loss in backtest. A system with 50% max drawdown is psychologically unsustainable even if profitable long-term.

Correlation and Covariance: Correlation measures how two assets move relative to each other.

Correlation +1: move perfectly together (2 large-cap funds overlapping)
Correlation 0: no relationship (gold and Nifty IT)
Correlation −1: move opposite (ideal hedge)

Adding uncorrelated assets to a portfolio reduces overall volatility without reducing expected return — this is the mathematical basis of diversification.
Backtesting: Testing a strategy on historical data to evaluate performance before risking real money.

Backtest Nifty 50 P/E-based strategy: buy when P/E < 16, sell when P/E > 24
Historical Nifty P/E data available on NSE website since 2000
Run backtest, calculate CAGR, Sharpe, Max Drawdown, Number of Trades
Only deploy if backtest shows positive Sharpe with acceptable drawdown

Data Bias and Errors:

Survivorship bias: Using only stocks that exist today — misses all companies that failed
Look-ahead bias: Using data that would not have been available at trade time
Overfitting: System works perfectly on past data but fails on new data (too many parameters)

Building quant models in India:

Data sources: NSE website (free P/E, P/B, dividend data), Money Control, Screener.in
Tools: Python (pandas, numpy, yfinance), Excel for simpler backtests
Start simple: one factor, one asset, 10-year backtest. Complexity comes later.


The Gita Sanskrit Shloka:

बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।
तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥

Chapter & Verse: Bhagavad Gita 2.50
Transliteration: Buddhiyukto jahatiha ubhe sukritadushkrite, Tasmad yogaya yujyasva yogah karmasu kaushalam.
Word-by-word meaning:

Meaning: "Endowed with an evenness of mind (wisdom), one casts off both good and evil deeds in this very life. Therefore, strive for Yoga (the art of acting with equanimity); Yoga is truly skill in action." 

Financial Application: Yogah karmasu kaushalam — excellence in action is yoga. Quantitative investing is the application of this principle to financial markets: skilled, systematic, excellent action — not lucky guessing. The quant investor transcends the attachment to individual trade outcomes (good or bad) because the system's expected value is what matters, not any single result. Like the Gita's ideal of acting without attachment to outcome, the quant investor executes the system regardless of whether the last 3 trades won or lost. The skill (kaushalam) is in the system design and discipline of execution — not in predicting tomorrow's price.

Real Indian Case Study
Nifty 50 P/E Mean Reversion Strategy — 2000–2024
A simple quant strategy based on Nifty 50 P/E mean reversion (data available free on NSE):

Rule: Invest in Nifty 50 when P/E < 16. Move to short-term FD when P/E > 24.
Data tested: 2000–2024, 24 years.

Key historical P/E levels:

January 2008 (pre-crash): P/E = 28 → signal to exit
March 2009 (post-crash bottom): P/E = 11 → signal to invest fully
January 2020: P/E = 28 → signal to reduce
March 2020: P/E = 16 → signal to invest
November 2021: P/E = 30 → signal to exit

Approximate backtest result:

Strategy CAGR: approximately 15–16% vs Nifty Buy-and-Hold 12%
Strategy avoided major drawdowns (2008: down 23% vs Nifty down 60%)
Max drawdown: approximately 25% vs Nifty 60%

The critical lesson: This is not a prediction model. It is a mean reversion model. It does not say "Nifty will fall tomorrow when P/E = 28." It says: "historically, buying at P/E = 28 produces poor 3-year returns." The probability favours caution at high P/E and aggression at low P/E. That is quant thinking applied to Indian markets — simple, evidence-based, emotionless.

The Practical Playbook
Rule 1 — Check Nifty 50 P/E on NSE monthly and adjust equity allocation accordingly.
Below 16: maximum equity allocation per your age-based framework. 16–22: standard allocation. 22–26: reduce equity by 10%. Above 26: reduce equity by 20%, hold in liquid fund. Simple mean reversion risk management.
Rule 2 — Use Screener.in to build factor-based stock screens.
Example screen: ROE > 20%, Debt/Equity < 0.5, Sales growth > 15% (3-year), P/E < sector average. Run this quarterly and review top 20 results. This is a simple quant factor model available free to any retail investor.
Rule 3 — Backtest any strategy for minimum 10 years before risking money.
Use NSE historical data and Excel or Python. A strategy that does not have 10 years of evidence is a hypothesis — treat it as such.
Rule 4 — Track Sharpe Ratio of your own portfolio annually.
Calculate: (Portfolio CAGR − 7% risk-free rate) ÷ Portfolio standard deviation. Sharpe above 0.7 is acceptable. Below 0.5 means you are taking too much risk for too little return.
Rule 5 — Use Nifty 200 Momentum 30 index fund for momentum factor exposure.
This is a ready-made quant strategy available as an index fund. Add 10–15% portfolio allocation for factor diversification beyond standard large-cap exposure.

Common Mistakes
Mistake 1 — Overfitting backtest to get impressive historical numbers.
What they do: add parameters until backtest shows 25% CAGR and 0% max drawdown. Why it feels right: better numbers seem like a better system. Why it destroys wealth: overfitted systems fail immediately on new data because they were "tuned" to historical noise, not to real market behaviour patterns.
Mistake 2 — Ignoring survivorship bias in stock analysis.
What they do: screen Nifty 500 stocks for 10-year performance and call winners "multi-baggers to find." Why it feels right: historical data seems objective. Why it destroys wealth: Nifty 500 today does not include companies that failed or were delisted — the actual average return of all stocks was lower than the surviving ones show.
Mistake 3 — Applying single-market backtests universally.
What they do: backtest a strategy on 2009–2019 Nifty bull market data and deploy it confidently. Why it feels right: 10 years seems like a long history. Why it destroys wealth: a strategy that works in a long bull market may be entirely bull-market-dependent — testing must include at least one full bear cycle.

Chapter Summary

Quantitative investing replaces emotion with evidence-based, systematic, repeatable decision frameworks.
Expected value thinking: win rate × average gain minus loss rate × average loss is the only honest trade evaluation.
Mean reversion explains why Nifty P/E above 25 historically precedes poor returns and below 16 precedes strong returns.
Momentum factor (6–12 month relative strength) is statistically documented in Indian markets.
Sharpe Ratio measures risk-adjusted return — a strategy with lower return but higher Sharpe is often better.
Backtesting must cover at least 10 years including a full bear cycle to be statistically meaningful.
Survivorship bias and overfitting are the two most common errors in do-it-yourself quant analysis.
Nifty P/E, available free on NSE, is India's most accessible quant signal for retail investors.


Quiz Questions
Q1: A strategy has 55% win rate, average gain ₹8,000, average loss ₹4,000. Expected value per trade is:

A) ₹2,600
B) ₹4,400
C) ₹3,000
D) ₹1,800
Correct: A
Explanation: EV = (0.55 × ₹8,000) − (0.45 × ₹4,000) = ₹4,400 − ₹1,800 = ₹2,600. This positive EV means the strategy is profitable over a large sample of trades.

Q2: Mean reversion in Nifty P/E context means:

A) Nifty always returns to 10,000
B) Nifty P/E above historical average tends to fall back over time; below historical average tends to rise
C) Stock prices always revert to their IPO price
D) RBI interest rates always return to 4%
Correct: B
Explanation: Nifty P/E fluctuates around its long-term average. Extreme high P/E (euphoria) reverts as earnings grow faster than price or price corrects. Extreme low P/E (depression) reverts as price recovers faster than earnings decline.

Q3: Survivorship bias in stock analysis means:

A) Choosing stocks that survive market crashes
B) Only analysing currently existing stocks, missing companies that failed and were delisted
C) Investing in survivors of corporate mergers
D) A technical analysis pattern for trend survival
Correct: B
Explanation: If you analyse today's Nifty 500 for 10-year performance, you see only companies that survived. All the companies that went bankrupt or were delisted — many with much worse performance — are invisible. This biases the analysis optimistically.

Q4: Sharpe Ratio measures:

A) Absolute return of a portfolio
B) Risk-adjusted return — return per unit of volatility
C) The number of winning trades in a strategy
D) How closely a fund tracks its benchmark
Correct: B
Explanation: Sharpe = (Portfolio Return − Risk-free Rate) ÷ Standard Deviation. It tells you whether returns compensate for risk taken. A portfolio with 15% return and high volatility may have lower Sharpe than one with 12% return and low volatility.

Q5: Nifty 200 Momentum 30 index is valuable because:

A) It holds the 30 largest companies in India
B) It is a ready-made implementation of the momentum factor, which has documented outperformance in Indian markets
C) It is the government's recommended equity index
D) It has zero expense ratio
Correct: B
Explanation: The momentum factor selects the top 30 performers from Nifty 200 based on 6–12 month relative performance. It systematically captures the momentum anomaly that has historically produced 4–5% annual alpha over Nifty 50 in Indian markets.


