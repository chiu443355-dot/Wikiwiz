export interface Chapter {
  id: string;
  phaseId: string;
  number: number;
  title: string;
  script: string;
  gitaShloka: {
    sanskrit?: string;
    transliteration: string;
    meaning: string;
    tradingApplication: string;
  };
}

export const chapters: Chapter[] = [
  // PHASE 0: FINANCIAL LITERACY
  {
    id: 'ch-0-0',
    phaseId: 'phase-0',
    number: 0,
    title: 'What is Money?',
    script: `## What is Money? The Foundation of All Trading

Money isn't wealth—it's a *claim* on wealth. Most traders lose because they confuse the two.

### The Three Faces of Money

**Money as Medium of Exchange**: Before money, bartering meant finding someone who had what you wanted *and* wanted what you had. Impossible at scale. Money solved this friction. Every successful economy rests on this agreement.

**Money as Store of Value**: Here's where inflation destroys your wealth without you noticing. If you earned ₹10 lakhs and kept it in cash, after 10 years at 5% inflation, you'd have the buying power of only ₹6.14 lakhs. You lost ₹3.86 lakhs *without anyone stealing from you*.

**Money as Unit of Account**: It's the measuring stick. It lets you compare a coffee (₹150) with a stock (₹50,000) with a house (₹50 lakhs). Without this, no markets exist.

### The Inflation Trap

Prices don't just go up randomly. Your government prints money. More supply → less purchasing power per rupee. This is the silent tax nobody talks about.

Protect yourself: Assets that produce *real* returns (equities, property, businesses) beat inflation. Cash and savings accounts lose every single year.

### Key Takeaway

Money is leverage on human productivity. Understand it or be controlled by it.`,
    gitaShloka: {
      transliteration: 'Arjuna: Yada yoga-niyastam mano nusandadhati',
      meaning: 'When the mind becomes disciplined and focused like channeled money',
      tradingApplication: 'Just like money flows to where it is valued, your capital flows to where it generates returns. Discipline in capital allocation is the foundation.'
    }
  },

  {
    id: 'ch-0-1',
    phaseId: 'phase-0',
    number: 1,
    title: 'The Power of Compounding',
    script: `## Compound Interest: The 8th Wonder of the World

Einstein supposedly called compound interest the eighth wonder of the world. Let me show you why.

### The Math (Don't Skip This)

₹10,000 at 12% annual return:
- Year 1: ₹11,200
- Year 5: ₹17,623
- Year 10: ₹31,058
- Year 20: ₹96,463
- Year 30: ₹299,599

That's 30x growth. From disciplined, consistent returns.

Now the opposite: If you make 5% returns but pay 2% in fees and taxes (net 3%), you still get ₹24,273 in 30 years. That's 65% of the 12% case. Costs *destroy* compounding.

### Why This Matters for Traders

Most traders want to 10x overnight. Compounding teaches you something different: *Small, consistent edges beat large, inconsistent luck*.

A trader who makes 2% monthly with 95% win rate compounds to ₹1.05 crores in 10 years from ₹10 lakhs.

A trader chasing 50% monthly returns but only wins 40% of the time? They're bankrupt by year 3.

### The Time Factor

Compounding needs time. This is why:
- Starting early is worth more than perfect timing
- 20-year disciplined investing beats 5-year frantic trading
- A 12% return over 30 years beats a 50% return over 2 years (if you survive)

### Common Mistake

People think "compound returns" means they do nothing. False. It means *consistent* returns. One bad year (like -30%) eats 5 years of 20% gains.

### Key Takeaway

Compounding is not magic. It's arithmetic with time. Master small, repeatable trades. Let time do the work.`,
    gitaShloka: {
      transliteration: 'Yoga-sthah kuru karmani sangam tyaktva dhananjaya',
      meaning: 'Perform your actions with discipline, free from attachment to results',
      tradingApplication: 'Don\'t obsess over each trade\'s outcome. Focus on process. Compounding happens to those who execute the process consistently, not those chasing single profits.'
    }
  },

  {
    id: 'ch-0-2',
    phaseId: 'phase-0',
    number: 2,
    title: 'Inflation: The Silent Tax',
    script: `## Inflation: How Governments Steal Your Purchasing Power

Inflation is what happens when governments print more money than economic growth justifies.

### The Real Return Formula

Real Return = Nominal Return - Inflation Rate

Your FD gives 6% interest. Inflation is 5%. You made 1% real return.
Your stock portfolio made 15%. Real return: 10%.

This is *the* framework for all investment decisions.

### Historical Context

1980: ₹100 = one good meal
2000: ₹100 = decent street food
2026: ₹100 = half a street meal

That's not the quality changing. That's purchasing power dying.

### How Inflation Destroys Debt

If you borrowed ₹10 lakhs at 5% fixed rate, and inflation runs at 6%, the lender loses. They're repaid with money worth 1% less each year. This is why:
- High inflation environments favor borrowers
- Low inflation environments favor lenders

### Strategic Response

Against 5% inflation, you *must* generate >5% real returns:
- Real estate (historically 7-9% real returns in India)
- Equities (historically 10-12% real returns)
- Bonds (lose if inflation rises)
- Gold (preserves purchasing power, doesn't create it)
- Cash (loses every year)

### Key Takeaway

Doing nothing is guaranteed loss. Inflation forces you to invest. The question is: where will you get real returns?`,
    gitaShloka: {
      transliteration: 'Na hi kalyana-krt kascid durgatim tata gacchati',
      meaning: 'Those who do good actions never fall into decline',
      tradingApplication: 'Those who consistently seek real returns never decline into poverty. Passive holdings against inflation guarantees decline.'
    }
  },

  // PHASE 1: MARKET STRUCTURE
  {
    id: 'ch-1-0',
    phaseId: 'phase-1',
    number: 0,
    title: 'Market Microstructure 101',
    script: `## How Markets Actually Work: Order Books, Spreads, Liquidity

Most people think markets are just price discovery. They're wrong. Markets are *liquidity machines*.

### The Order Book

Every market has a buy side (bids) and sell side (asks):
- Bid: "I'll buy 100 shares at ₹500"
- Ask: "I'll sell 100 shares at ₹501"
- Spread: ₹1 difference = friction cost

When you buy at market price, you're *hitting the ask*. When you sell, you're *hitting the bid*.

### Liquidity

Liquidity = how easily you can buy/sell large quantities without moving the price.

NIFTY50: Ultra-liquid. Trade 1 crore shares. Price barely moves.
Small-cap stock: Buy ₹1 lakh. Price moves 2-3%.

Liquidity dries up in crashes. Price gaps down. People panic.

### Market Makers

These are the dealers keeping prices tight. They buy at bid, sell at ask, profit from the spread.

When market makers stop participating → spreads widen → it gets expensive to trade → prices gap.

This is what happens in crashes.

### The Bid-Ask Bounce

If you buy at ₹100 ask and immediately sell at ₹99 bid, you lost ₹1 to the spread. This happens millions of times. High-frequency traders profit from this friction.

### Key Takeaway

Markets are not efficient at all price points. Inefficiencies exist at scale boundaries and in micro-structures. Exploit friction, don't fight it.`,
    gitaShloka: {
      transliteration: 'Sthita-prajnasya ka bhasa samadhi-sthasyabhashate',
      meaning: 'One established in steady-state perception speaks consistently',
      tradingApplication: 'Understand market microstructure deeply and you speak with authority. Surface-level traders misunderstand basic price mechanics.'
    }
  },

  {
    id: 'ch-1-1',
    phaseId: 'phase-1',
    number: 1,
    title: 'Supply and Demand: The Only Law',
    script: `## Supply and Demand: Every Price Movement Explained

There is exactly one reason prices move: supply and demand imbalance.

### The Supply-Demand Axis

More buyers than sellers → price rises
More sellers than buyers → price falls

That's it. All technical analysis, fundamental analysis, news—they all feed into this one mechanism.

### What Creates Imbalance?

**News**: Positive news → more buyers
**Earnings**: Good earnings → more buyers
**Macro**: Rising rates → fewer buyers
**Sentiment**: Fear → more sellers
**Technicals**: Support breaks → triggered selling

But the *mechanism* is always supply-demand.

### Understanding Depth

When you see a ₹100 stock:
- 50 lakh shares offered at ₹100
- 20 lakh shares offered at ₹101

You need to buy the 50 lakhs at ₹100 *and* the 20 lakhs at ₹101 to reach ₹102.

Thin depth = big moves from small orders.
Thick depth = prices stable.

### Market Cycles Through Supply-Demand

Accumulation: Quiet buying, supply doesn't react
Mark-up: Buying accelerates, price rises
Distribution: Sellers appear, buyers still present (sideways)
Mark-down: Sellers accelerate, few buyers (crash)

And repeat.

### Key Takeaway

Stop analyzing charts. Start asking: Who's buying? Who's selling? Why? At what price do they disappear?`,
    gitaShloka: {
      transliteration: 'Annam bhuvanasya pratistham',
      meaning: 'Food is the foundation of the world',
      tradingApplication: 'Demand for goods (real or financial) is the foundation of price. Without real demand, price collapses. Trade what people actually want.'
    }
  },

  // PHASE 2: TECHNICAL ANALYSIS
  {
    id: 'ch-2-0',
    phaseId: 'phase-2',
    number: 0,
    title: 'Candlesticks: Reading Price Intention',
    script: `## Candlestick Patterns: What Price is Actually Telling You

A candlestick shows: open, close, high, low. It's the *conversation* between buyers and sellers.

### What Each Element Means

Open: Where trading started
Close: Where it ended
High: Maximum buyer conviction
Low: Maximum seller pressure

A big green candle: Buyers won decisively. Price is up.
A big red candle: Sellers won decisively. Price is down.
A small body with long wicks: Buyers and sellers fought, nobody won.

### Key Patterns

**Doji**: Open = Close. Indecision. Could go either way.
**Hammer**: Low wick, small body. Sellers tried to crush price, buyers defended.
**Shooting Star**: High wick, small body. Buyers tried to run price up, sellers crushed it.

These patterns *suggest* what might happen next. They don't guarantee it.

### The Core Principle

Price rejects certain levels. If a stock bounces at ₹100 for 6 months straight, it's because there's structural support (buyers waiting).

When price finally breaks below ₹100, it means support broke. Expect downside.

### Why This Matters

Candlestick reading isn't magic. It's understanding where institutional buyers and sellers sit.

### Key Takeaway

Candlesticks tell you where consensus is. Trade with consensus, not against it—at least until you have skill.`,
    gitaShloka: {
      transliteration: 'Chitram gatayoh paśyati',
      meaning: 'See clearly the path that unfolds',
      tradingApplication: 'Candlesticks are clear signals if you read them honestly. Don\'t impose your bias. What is price *really* saying?'
    }
  },

  {
    id: 'ch-2-1',
    phaseId: 'phase-2',
    number: 1,
    title: 'Support, Resistance, and Levels',
    script: `## Support and Resistance: Where Price Really Cares

A support level is where price bounces up. A resistance level is where price bounces down.

Why do these exist?

### The Psychology Layer

₹100 = many people set buy orders here (support)
₹110 = many people set sell orders here (resistance)

When price approaches these levels, those people get triggered. Their orders move price.

### How to Find Real Levels

Not every high and low is a level. Only *repeated* highs and lows matter.

If ₹100 is the high 10 times in a year, it's *structural* resistance. Real money defends it.

If a stock makes new highs every quarter, old resistance doesn't matter.

### Breakout vs. Breakdown

When price breaks above resistance with volume, it's real. Expect new highs.

When price breaks below support quietly (low volume), it might bounce back.

Volume tells you if the break is real.

### Confluence

When support coincides with a moving average *and* a Fibonacci level—that's confluence. Price cares more about that level.

### Key Takeaway

Support and resistance aren't magical lines. They're where institutional orders cluster. When a level breaks with volume, expect fast moves. Without volume, it's noise.`,
    gitaShloka: {
      transliteration: 'Yatha pradipah sthiro bhasurate',
      meaning: 'Like a steady lamp, true support shines through',
      tradingApplication: 'Real support levels are steady and repeated. Levels that break easily are false. Test levels with volume to know which are real.'
    }
  },

  // PHASE 3: RISK MANAGEMENT
  {
    id: 'ch-3-0',
    phaseId: 'phase-3',
    number: 0,
    title: 'Position Sizing and the Kelly Criterion',
    script: `## The Math Behind "Bet Sizing"

Most traders blow accounts because they risk too much per trade. There's a mathematical formula for this.

### The Kelly Criterion

Optimal Risk = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)

Example: You win 60% of trades, avg win ₹1000, avg loss ₹1500

Kelly = (0.6 × 1) - (0.4 × 1.5) = 0.6 - 0.6 = 0%

You should risk 0%. Your edge is zero. You'll break even long-term but commission kills you.

### A Real Example

Win 55% of trades
Average win: ₹2000
Average loss: ₹2000
Win rate: 0.55
Loss rate: 0.45

Kelly = (0.55 × 2) - (0.45 × 2) = 1.1 - 0.9 = 0.2 (20%)

You can risk up to 20% per trade and compound exponentially.

Most traders risk 20%+ and blow accounts. They're overleveraged on insufficient edge.

### The Practical Number

Use 2-5% risk per trade if you're unsure. This survives drawdowns.

If you find a 60%+ win rate system with 1.5:1 reward-risk, you can scale to 10%.

### The Intuition

Bettors with +5% edges break even. Bettors with +30% edges need proper sizing to win.

Leverage is free money if you're right. It's bankruptcy if you're wrong.

### Key Takeaway

Your account doesn't die from one bad trade. It dies from overleveraging on insufficient edge. The math is simple. Follow it.`,
    gitaShloka: {
      transliteration: 'Hinsara tyaktvā sthānam mṛtyoḥ',
      meaning: 'To abandon restraint is to invite destruction',
      tradingApplication: 'To abandon position sizing discipline is to guarantee account destruction. The math doesn\'t lie. Follow Kelly or die eventually.'
    }
  },

  {
    id: 'ch-3-1',
    phaseId: 'phase-3',
    number: 1,
    title: 'Stop Losses and Drawdown Management',
    script: `## The Psychology of Taking Losses

A ₹10 lakhs account down to ₹7 lakhs is a 30% drawdown. To recover, you need to make 43% returns.

Most traders don't. They stop trading and "wait for confirmation." They never recover.

### The Math of Drawdowns

-50% needs +100% to recover
-30% needs +43% to recover
-10% needs +11% to recover

Small drawdowns are recoverable. Large drawdowns become permanent.

### Setting Stop Losses

Stop loss = "I was wrong. I exit here."

Too tight: Stopped out constantly, hit by noise
Too loose: Drawdowns are catastrophic

Professional traders use: 2 × Average True Range (ATR)

For NIFTY50 with 20 point ATR: Stop is 40 points away.
For small-cap with 2% daily move: Stop is 4% away.

### Trailing Stops

Once you're profitable (say +3%), move stop to breakeven. Let winners run.

If trade keeps rising, keep moving stop up by half the gain.

This locks in profits without capping upside.

### The Discipline Requirement

Taking a stop loss *feels* like failure. It's not. It's capital preservation.

Your edge works over hundreds of trades. One trade doesn't matter. Surviving to the next trade matters.

### Key Takeaway

Stop losses are insurance. Insurance costs money in good years. But it prevents bankruptcy in bad years. That's the entire trade-off.`,
    gitaShloka: {
      transliteration: 'Tasmāt tvam uttistha yuddhasya',
      meaning: 'Therefore, rise and fight with discipline',
      tradingApplication: 'Discipline in taking losses is what separates survivors from casualties. The market will humiliate you if you don\'t enforce stops.'
    }
  },

  // PHASE 4: TRADING PSYCHOLOGY
  {
    id: 'ch-4-0',
    phaseId: 'phase-4',
    number: 0,
    title: 'Greed, Fear, and the Emotional Brain',
    script: `## Why Smart People Make Stupid Trading Decisions

Your lizard brain (amygdala) controls fear and greed. It evolved to survive predators, not markets.

### The Fear Response

Market down 20%: Your amygdala screams "SELL NOW OR DIE"

This is the same brain system that kept your ancestors alive. It's *not* useful here.

It forces you to:
- Sell at bottoms (after downside)
- Buy at tops (after upside)
- Miss the biggest moves (when you're terrified)

The best trading days happen right after the worst days. Most traders are out of the market, terrified.

### The Greed Response

Stock up 50% in 3 months: "This will go to ₹1000!"

You add more. You leverage. You tell your family.

Then reality hits. You're down 40% in 2 weeks. You panic. You exit at the lows.

### How to Trade Against Your Brain

1. **Automation**: Use stop losses and pre-set targets. Your emotional brain can't override them.
2. **Small positions**: Your amygdala cares less about ₹10,000 than ₹10 lakhs.
3. **Defined rules**: "I trade only when RSI < 30 AND price above 200 MA." Removes emotion.
4. **Cold money**: Trade with money you can afford to lose. Scarcity mindset destroys returns.

### The Institutional Advantage

Institutional traders *feel* the same fear. But they follow rules. Their emotions don't move the market.

Your emotions do. If you trade emotionally, institutions extract your money.

### Key Takeaway

You can't rewire your amygdala. But you can build systems that bypass it. Discipline beats sentiment, always.`,
    gitaShloka: {
      transliteration: 'Kama-krodha-vimuktānām',
      meaning: 'Those freed from desire and anger',
      tradingApplication: 'Trading without emotion—wanting specific outcomes—is the path to consistency. Markets punish the emotionally attached and reward the detached.'
    }
  },

  {
    id: 'ch-4-1',
    phaseId: 'phase-4',
    number: 1,
    title: 'Building Your Trading System',
    script: `## The Framework That Separates Winners From Gamblers

Casual traders have hope. Professional traders have systems.

### System Components

1. **Entry Criteria**: When do you buy?
   - Example: "Buy when RSI < 40 after 3-day squeeze"

2. **Exit Criteria**: When do you sell?
   - Example: "Sell when target is hit or stop is hit"

3. **Risk Management**: How much do you risk?
   - Example: "Never risk more than 2% per trade"

4. **Trade Selection**: Which trades do you take?
   - Example: "Only USD/INR, GOLD, NIFTY—high liquidity only"

### Testing Your System

Before you risk real money:
1. Backtest on 5 years of data
2. Check win rate and risk-reward ratio
3. Calculate compound returns
4. Check if system survives market crashes

If backtest shows 40% win rate with 1.5:1 reward-risk, your edge is weak. Need refinement.

If backtest shows 55% win rate with 2:1 reward-risk, you have a workable edge.

### The Curve-Fitting Trap

If you test 50 different systems and pick the best one, you're likely picking noise (overfitting).

Use *new data* (forward testing) to validate. If it doesn't work on new data, it was luck.

### Execution

Write your system as rules *a child could understand*:
- Don't use vague words like "strong" or "momentum"
- Use specific numbers: "RSI > 50", "Price > MA200"

### Key Takeaway

Consistency comes from systems, not from intuition. Build a system, test it rigorously, then execute it mechanically.`,
    gitaShloka: {
      transliteration: 'Yoga-sthah kuru karmani',
      meaning: 'Anchored in discipline, perform actions',
      tradingApplication: 'A system is your anchor. When markets crash and emotions run high, your system keeps you rational. That\'s why systems beat intuition.'
    }
  },

  // PHASE 5: FUNDAMENTAL ANALYSIS
  {
    id: 'ch-5-0',
    phaseId: 'phase-5',
    number: 0,
    title: 'Reading Financial Statements',
    script: `## The Three Numbers That Matter

Most traders ignore fundamentals. Institutions don't. Learn to read a company's financial statements in 5 minutes.

### The Income Statement (Profit & Loss)

Revenue: Money coming in
COGS: Cost of goods sold (direct costs)
Gross Profit: Revenue - COGS
Operating Expenses: Salaries, rent, R&D
Operating Profit (EBIT): Gross - OpEx
Interest & Taxes: Cost of debt and government
Net Profit: What's left

**Key metric**: Is net profit growing faster than revenue?

If revenue grows 20% but profit grows only 5%, margins are collapsing. Avoid.

### The Balance Sheet (Assets vs Liabilities)

Assets: What the company owns
Liabilities: What the company owes
Equity: Assets - Liabilities = shareholder value

**Key metrics**:
- Debt-to-Equity: < 1.5 is healthy
- Current Ratio (current assets / current liabilities): > 1 is healthy
- Return on Equity (net profit / equity): > 15% is strong

### The Cash Flow Statement (The Truth)

Companies can fake profits. They can't fake cash.

Operating Cash Flow: Cash earned from business
Capex: Cash spent on equipment
Free Cash Flow: Operating - Capex

**Real earnings** = free cash flow, not net profit.

A company showing ₹100 profit with ₹10 FCF is in trouble. It's not converting profit to cash.

### Key Takeaway

Earnings per share (EPS) is what analysts tout. Free cash flow per share (FCFPS) is what investors use. Institutions follow FCF. Follow them.`,
    gitaShloka: {
      transliteration: 'Satya-avadhānena sampad',
      meaning: 'Through attention to truth comes prosperity',
      tradingApplication: 'Financial truth is in cash flow, not marketing metrics. Companies with strong FCF and declining debt are wealth builders. That\'s where institutional money goes.'
    }
  },

  {
    id: 'ch-5-1',
    phaseId: 'phase-5',
    number: 1,
    title: 'Valuation: Price vs. Value',
    script: `## Is a Stock Cheap or Is It Just Falling?

The most dangerous question in investing is: "Is this a bargain?"

### Price vs. Value

Price: What the market quotes right now
Value: What the company is actually worth

A stock at ₹100 might be:
- Expensive if the company is collapsing (value ₹50)
- Cheap if the company is growing (value ₹200)

Price is visible. Value is hard to calculate.

### The PE Ratio (Price-to-Earnings)

PE = Stock Price / Earnings Per Share

NIFTY at 50 PE: Each rupee of earnings costs ₹50
Small-cap at 10 PE: Each rupee of earnings costs ₹10

Is small-cap cheaper?

Not necessarily. If the NIFTY company grows earnings 25% annually and small-cap grows 5%, the NIFTY is cheaper.

### The Magic Number: PEG Ratio

PEG = PE / Growth Rate

NIFTY: 50 PE / 20% growth = 2.5 PEG
Small-cap: 10 PE / 3% growth = 3.3 PEG

NIFTY is actually cheaper on a growth-adjusted basis.

### DCF (Discounted Cash Flow)

The "true" valuation: What are all future cash flows worth today?

A company that generates ₹100 crores in FCF annually:
- At 15% required return: Worth ₹665 crores
- At 10% required return: Worth ₹1000 crores

The valuation changes based on your cost of capital assumption.

This is why DCF is *not* precise. Different analysts get different numbers.

### Key Takeaway

Valuation matters over 5+ years. Price matters over months. Don't confuse them. Short-term: Follow price and sentiment. Long-term: Follow valuation and fundamentals.`,
    gitaShloka: {
      transliteration: 'Mithyā-drishti paribhāshyate',
      meaning: 'False perception leads to incorrect conclusions',
      tradingApplication: 'A stock falling is not always cheap. A stock rising is not always expensive. Separate price perception from value reality.'
    }
  },

  // PHASE 6: MACROECONOMICS
  {
    id: 'ch-6-0',
    phaseId: 'phase-6',
    number: 0,
    title: 'Interest Rates and Central Banks',
    script: `## Why the RBI Matters More Than Your Broker

Central banks control interest rates. Interest rates control everything.

### How Rate Changes Ripple

When RBI raises rates:
- Borrowing gets expensive → Companies earn less
- Deposits get attractive → Money moves to banks
- Stocks look less attractive vs. fixed deposits
- Rupee strengthens → Exports hurt, imports cheap

When RBI cuts rates:
- Borrowing gets cheap → Companies grow faster
- Banks lose deposits → Money chases stocks
- Stocks look attractive again
- Rupee weakens → Exports boom, imports hurt

### The Cycle

1. **Hiking Cycle**: RBI raises rates to fight inflation
   - Stocks fall until 3-4 months in
   - Sentiment sours
   - Peak occurs when inflation finally falls

2. **Cutting Cycle**: RBI cuts rates to boost growth
   - Stocks rise fastest at the *beginning*
   - By the time everyone knows rates are falling, rally is halfway over
   - Peak is near the end when everyone expects more cuts

### Reading the RBI

Watch:
- RBI Governor's tone (hawkish vs. dovish)
- Inflation trajectory
- Employment data
- FX reserves

If RBI governor sounds hawkish and inflation is rising, expect rates to stay high. Avoid overleverage.

### Key Takeaway

Rate decisions are 3-6 months ahead of their market impact. By the time news hits, 50% of the move is done. Watch the *trajectory*, not the current rate.`,
    gitaShloka: {
      transliteration: 'Chakra-vrittau sthitam rajyam',
      meaning: 'A kingdom balanced on the wheel of cycles',
      tradingApplication: 'Economic cycles turn on central bank decisions. Understand the cycle, position ahead of consensus. That\'s institutional trading.'
    }
  },

  {
    id: 'ch-6-1',
    phaseId: 'phase-6',
    number: 1,
    title: 'GDP, Inflation, and Market Cycles',
    script: `## The Macro Framework That Drives Asset Prices

Markets don't move on earnings. They move on growth expectations.

### The Four Macro Regimes

1. **Goldilocks**: Low inflation, strong growth, low rates
   - Best regime for stocks
   - Example: India 2022-2023

2. **Overheating**: High growth, rising inflation, rates rising
   - Stocks peak here, then decline
   - Example: US 2021-2022

3. **Recession**: Weak growth, falling inflation, rates falling
   - Worst for stocks initially, best at the end
   - Example: Most countries 2023

4. **Stagflation**: Weak growth, high inflation, rates stuck high
   - Terrible for stocks, good for gold/commodities
   - Example: 1970s

### Inflation Matters Most

Inflation > 6%: RBI must raise rates. Stocks struggle.
Inflation 3-5%: Sweet spot. Growth is okay, inflation manageable.
Inflation < 2%: RBI cuts rates. Growth may be weak.

### Leading Indicators

These change 3-6 months before markets:
- PMI (Purchasing Managers Index): < 50 = contraction coming
- Yield curve: Inversion predicts recession in 6-18 months
- Credit growth: Slowing credit = slow growth ahead
- FX reserves: Falling reserves = currency pressure ahead

### Key Takeaway

Macro doesn't predict price. But it sets the regime. In Goldilocks, ride winners. In Overheating, reduce leverage. In Recession, wait for bottom. Macro tells you *when* to be aggressive and when to be cautious.`,
    gitaShloka: {
      transliteration: 'Kāla-chakra-pālanam samajānāti',
      meaning: 'The wise understand the wheel of time',
      tradingApplication: 'Understand macro cycles and you trade with the cycle, not against it. This is why institutions look 6-12 months ahead. You should too.'
    }
  },

  // PHASE 7: QUANTITATIVE FINANCE
  {
    id: 'ch-7-0',
    phaseId: 'phase-7',
    number: 0,
    title: 'Volatility, Beta, and Probability',
    script: `## The Math Behind "How Risky Is This?"

Volatility measures price fluctuation. Beta measures correlation to the market. Probability quantifies uncertainty.

### Volatility (The Tremor)

Standard deviation of daily returns = volatility.

NIFTY with 15% annual volatility: Average daily move ≈ 1%
Small-cap with 40% annual volatility: Average daily move ≈ 2.5%

Higher volatility = wilder swings = bigger opportunities *and* bigger drawdowns.

### Beta (The Sensitivity)

Beta = 1: Moves exactly with the market
Beta > 1: More volatile than the market (amplified moves)
Beta < 1: Less volatile (dampened moves)

NIFTY50: Beta = 1 (by definition)
Midcap: Beta = 1.3 (30% more volatile)
Bonds: Beta = 0.2 (much less volatile)

### Probability and Distribution

If a stock has 15% volatility:
- 68% of daily moves are within ±1%
- 95% of daily moves are within ±2%
- But 5% are larger. These are when you get hurt.

This is why position sizing matters. A 5% drawdown seems impossible based on normal days. Then it happens.

### Skewness and Tail Risk

Real returns aren't normally distributed. Markets have *fat tails*—extreme moves happen more often than math predicts.

A 2-sigma event ("shouldn't happen once per century") happens roughly every 10-20 years in markets.

This is why overleveraging kills you.

### Key Takeaway

Volatility is your friend when you're short, enemy when you're long with leverage. Understand your portfolio's beta and volatility. Then size positions accordingly.`,
    gitaShloka: {
      transliteration: 'Sarvam anitya-svabhāvam',
      meaning: 'All things are impermanent by nature',
      tradingApplication: 'High volatility is the nature of markets. Those who fight volatility with excessive leverage perish. Those who respect volatility prosper.'
    }
  },

  {
    id: 'ch-7-1',
    phaseId: 'phase-7',
    number: 1,
    title: 'Correlation, Diversification, and Hedging',
    script: `## The Only Free Lunch: Not Putting All Eggs in One Basket

Correlation = how two assets move together.

Correlation = 1: Perfect positive (both rise/fall together)
Correlation = 0: Unrelated
Correlation = -1: Perfect negative (opposite moves)

### The Diversification Myth

Owning 100 stocks in NSE doesn't diversify if they all correlate to 0.95 (move together).

True diversification:
- Equities (0.8 to market)
- Gold (0.1 to market, sometimes negative)
- Bonds (-0.2 to market in rate rises)
- Real estate (0.3 to market)

A portfolio with these typically has 60% less volatility than 100% stocks with same expected return.

### Why This Matters

Your portfolio is down 30% in a market crash if it's all stocks.

If it's 60% stocks + 40% bonds/gold, it's down only 10-15%.

From -15%, you need +18% to recover.
From -30%, you need +43% to recover.

Diversification dramatically reduces recovery time.

### Hedging

Hedging = reducing downside by buying protection (expensive).

Example: Own ₹50 lakhs in NIFTY. Market crashes 20%, you lose ₹10 lakhs.

Or: Buy NIFTY puts for ₹50,000. If market crashes 20%, puts gain ₹10 lakhs. You break even.

Cost: ₹50,000 vs. potential ₹10 lakh loss.

Hedge when you expect volatility. Don't hedge indefinitely (costs money every year).

### Key Takeaway

Diversification is the only free lunch in finance. Low correlation assets reduce risk without reducing returns. Build portfolios with diverse correlations, not just diverse stocks.`,
    gitaShloka: {
      transliteration: 'Na eka-visthapanāt sarvam siddhyati',
      meaning: 'Everything is not accomplished through a single approach',
      tradingApplication: 'Concentration beats diversification in bull markets. Diversification saves you in crashes. Master both based on the macro regime.'
    }
  },

  // PHASE 8: PORTFOLIO BUILDING
  {
    id: 'ch-8-0',
    phaseId: 'phase-8',
    number: 0,
    title: 'Building Your Life Portfolio',
    script: `## Integrating Trading Into a Real Life

Most traders quit because they treat trading as their entire identity. Bad idea.

### The Three Buckets

1. **Core Portfolio** (70%): Long-term wealth building
   - Index funds (NIFTY, SENSEX)
   - Quality dividend stocks
   - Real estate
   - Gold
   - Bonds

Expected return: 8-12% annually
Effort: 2 hours per month
Risk: Medium

2. **Active Trading** (20%): Short-term P&L
   - Technical trades on liquid stocks
   - Options strategies
   - Forex

Expected return: 2-5% monthly (realistic)
Effort: 20+ hours per week
Risk: High

3. **Speculative** (10%): Learning and small bets
   - New strategies you're testing
   - Concentration bets on conviction
   - High-growth small-caps

Expected return: Highly variable
Effort: 10+ hours per week
Risk: Very high

### The Math

Core: ₹35 lakhs × 10% = ₹3.5 lakhs/year, autopilot
Active: ₹10 lakhs × 40% = ₹4 lakhs/year, needs effort
Speculative: ₹5 lakhs × 0-100% = variable, learning

Total portfolio: ₹50 lakhs, expected return ₹8-10 lakhs/year on average.

If active trading fails, you still have the core growing steadily.

### Rebalancing

Every 6 months:
- Check allocation (70-20-10)
- Trim winners in speculative
- Add to core
- Redeploy active gains

This forces you to sell high and buy low.

### Key Takeaway

Treat trading like a business, not an identity. Your core portfolio is your wealth. Your trading is your edge. Keep them separate.`,
    gitaShloka: {
      transliteration: 'Yogah karmasu kaushalam',
      meaning: 'Yoga is skill in performing actions',
      tradingApplication: 'Skill is not in making one perfect trade. It\'s in consistently executing your system across your portfolio while maintaining balance in life.'
    }
  },

  {
    id: 'ch-8-1',
    phaseId: 'phase-8',
    number: 1,
    title: 'From Student to Professional',
    script: `## The Transition: When Do You Go Full-Time?

This is the question every trader asks. Here's the real answer.

### The Pre-Requirements

You're ready to go full-time when:
1. Backtested system with 55%+ win rate and 1.5:1+ risk-reward
2. 1 full year of profitable forward testing (new data)
3. Survived at least 1 major market correction (-20%+) profitably
4. Can support 6 months of zero income (emergency fund)
5. Have a systematic approach, not luck-based

### The Reality

Most traders who go full-time fail within 2 years. Why?

- They had luck in bull markets, not edge
- They overleveraged when things were good
- They panicked when drawdowns hit
- They had no business system (they just traded all day)

### The Safe Transition

Year 1: Trade part-time, hold your job
- Verify your system works
- Build discipline
- Reach ₹20 lakhs account with realistic edges

Year 2: Go semi-full-time (remote job + trading)
- Reduce job to 20-30 hours
- Expand trading account
- Test if you can handle the psychology

Year 3+: If still profitable, consider full-time

### Risk Management at Full-Time Level

Even professionals limit positions to 2-5% risk per trade.

If your edge makes 3% monthly with 20 trades, you're fine.
If your edge makes 20% monthly with 2 trades, you're overleveraged.

### Key Takeaway

Going full-time is about having an edge, not about wanting to trade all day. Most traders who fail did so because they had no edge, just opinions. Don't be that trader. Have a system first, independence second.`,
    gitaShloka: {
      transliteration: 'Karma-yoga-sampannam lokā imeśāh pratāpate',
      meaning: 'Those skilled in action shape the world',
      tradingApplication: 'Professional trading is not a freedom dream. It\'s execution mastery. Only those with a proven system and disciplined approach succeed long-term.'
    }
  },

  // Placeholder chapters for remaining phases (will be fully fleshed out with complete content)
  ...Array.from({ length: 7 }, (_, phaseIdx) => ({
    id: `ch-${9 + phaseIdx}-0`,
    phaseId: `phase-${9 + phaseIdx}`,
    number: 0,
    title: `Advanced Module ${phaseIdx + 1} - Chapter 1`,
    script: `## Advanced Trading Concepts

This is an advanced trading module building on the foundations you've learned. The concepts here are designed for traders ready to scale their operations.

### What You'll Learn

- Advanced portfolio construction techniques
- Risk management at institutional levels
- Macro trading strategies
- Sector rotation and tactical asset allocation

### Prerequisite Knowledge

You should have completed all previous chapters and have practical experience with the systems covered.

### Key Principle

At advanced levels, the edge shifts from identifying opportunities to managing risk and execution. Many traders have good ideas. Few execute at scale.

### Next Steps

Master these concepts through practice, then move to the next module.`,
    gitaShloka: {
      transliteration: 'Shrutva tat param guhyam',
      meaning: 'After hearing these secret teachings',
      tradingApplication: 'Advanced knowledge requires advanced discipline. These teachings are for those ready to implement them.'
    }
  })) as any
];
