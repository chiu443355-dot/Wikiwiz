CHAPTER 9: DERIVATIVES & HEDGING
Covering: What are Derivatives · Futures Contracts · Options Basics · Calls vs Puts · Option Greeks · Hedging Strategies · Covered Calls · Protective Puts · Expiry Psychology · Risk Control in F&O

The Hook
A wheat farmer in Madhya Pradesh. He plants his crop in October. Harvest comes in April. Between October and April, wheat price can move 30% in either direction. If it falls 30%, his entire year's work is wiped out. He has no way to lock in today's price for April delivery — so he prays.
A grain merchant in Mumbai. He needs to buy 10,000 tonnes of wheat in April. Prices could spike 40% by then. He has no way to lock in today's price for future purchase — so he speculates.
The futures market was created to solve exactly this problem. The farmer sells April wheat futures at today's price. The merchant buys April wheat futures at today's price. Both have locked in certainty. Neither is praying.
Derivatives were created for risk management, not for gambling. Options and futures are tools — a knife is not dangerous; the untrained hand holding it is.
India's F&O market is the largest in the world by volume. Approximately 89% of individual F&O traders lose money according to SEBI's 2023 study. The 11% who profit consistently understand one thing the 89% do not: derivatives are for defining and managing risk, not eliminating it.
Are you using derivatives to manage risk — or are you the risk someone else is managing?

The Concept
A derivative is a financial contract whose value is derived from an underlying asset (stock, index, commodity, currency).
Futures Contract: Agreement to buy or sell an asset at a predetermined price on a future date. Both buyer and seller are obligated.

Nifty 50 futures: lot size 50 units. If Nifty is at 22,000, one lot controls ₹11,00,000 notional value.
Margin required: approximately ₹1.2 lakh. This is 5x+ leverage.
P&L: every 1 point Nifty move = ₹50 profit/loss per lot.

Options Contract: Buyer gets the right (not obligation) to buy/sell at strike price by expiry. Seller is obligated.

Call Option: Right to BUY. Profitable when underlying rises.
Put Option: Right to SELL. Profitable when underlying falls.
Premium: Price paid by buyer to seller for this right.

Worked Example — Protective Put (Hedging):
You own 50 shares of Infosys at ₹1,800 each. Total value: ₹90,000. You fear a 15% fall.

Buy 1 Infosys Put at ₹1,700 strike (out-of-money) paying ₹40 premium per share.
Cost of hedge: ₹40 × 50 = ₹2,000.
If Infosys falls to ₹1,500: your stock loses ₹15,000. Put gains ₹200/share = ₹10,000. Net loss: ₹5,000 instead of ₹15,000.
If Infosys rises to ₹2,000: your stock gains ₹10,000. Put expires worthless. Net gain: ₹8,000 (minus ₹2,000 hedge cost).

Option Greeks (simplified):

Delta: How much option price moves per ₹1 move in underlying. ATM call delta ≈ 0.5
Theta: Time decay — options lose value daily even if price does not move. Buyers lose theta; sellers gain it.
Vega: Sensitivity to volatility. High volatility = expensive options. Buy options when volatility is low; sell when high.
Gamma: Rate of change of delta. High near expiry — options move violently in final days.

Covered Call Strategy: You own 100 shares of TCS at ₹3,500. You sell a TCS call at ₹3,600 strike receiving ₹80 premium.

If TCS stays below ₹3,600: you keep ₹8,000 premium (₹80 × 100 shares) as extra income.
If TCS rises above ₹3,600: shares get called away, but you bought at ₹3,500 and sell at ₹3,600 + ₹80 premium = ₹3,680 effective price. Still profitable.

Expiry Psychology: Weekly expiry every Thursday creates maximum volatility in final 90 minutes. Theta decay is most aggressive on expiry day. Buyers lose most; sellers gain most on expiry day — statistically.
Risk control in F&O:

Never deploy more than 10% of portfolio in F&O
Never hold naked short options (unlimited loss potential)
Always define maximum loss before entering
Exit at 50% of premium paid if trade goes against you (options buyer rule)


The Gita Sanskrit Shloka:

ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।
सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥

Chapter & Verse: Bhagavad Gita 2.62
Transliteration: Dhyayato vishayan pumsah sangasteshupajayate, Sangat sanjayate kamah kamat krodho'bhijayate.
Word-by-word meaning:

Meaning:  "When one contemplates the objects of the senses, attachment for them arises. From attachment develops desire (lust), and from desire arises anger." 

Financial Application: The F&O trader who watches Nifty tick by tick develops attachment to the position. Attachment creates desire for a specific outcome. Unmet desire creates anger — and angry traders override stop losses, hold losing positions, and take revenge trades. This is the exact chain that destroys 89% of F&O traders. The solution is what derivative markets structurally provide when used correctly: pre-define your risk through hedges and stop losses so you have no attachment to the outcome. A hedged position removes the emotional charge. Detachment is not indifference — it is professional risk management.

Real Indian Case Study
SEBI Study on F&O Losses — 2023
SEBI published a comprehensive study in 2023 analysing 10 million individual F&O traders over 3 years (FY19–FY22).
Findings:

89% of individual traders lost money in F&O
Average loss per losing trader: ₹1.1 lakh per year
Top 1% of traders (by volume) accounted for 51% of total profits
Proprietary trading firms and HFT (High Frequency Trading) firms were counterparties in a significant portion of retail trades

What the data shows:

Retail traders are consistently on the losing side of transactions with professionals
Most retail losses occurred in weekly options (highest theta decay, highest manipulation risk near expiry)
Traders who lost money were 2.3x more likely to increase position size after losses (emotional escalation)

The structural problem: A retail investor buying Nifty weekly options is trading against algorithms with 100x better data, 1000x faster execution, and professional risk management. Without a specific edge, this is a negative expected value activity.
What hedging (not speculation) in F&O looks like:

Portfolio manager holding ₹50 lakh equity portfolio buys Nifty puts before budget announcement
Cost: ₹25,000 in put premium
If budget is negative for markets: puts gain ₹1.5–2 lakh, offsetting portfolio loss
If budget is positive: puts expire worthless, portfolio gains
This is legitimate hedging — the ₹25,000 is insurance premium, not gambling


The Practical Playbook
Rule 1 — Use F&O for hedging first, speculation only second.
Before any speculative F&O trade, ask: does my equity portfolio have a hedge against the biggest macro risk of next 30 days? If no, buy the hedge. Speculation comes after protection.
Rule 2 — Never buy weekly options as primary strategy.
Weekly options have maximum theta decay and are designed for option sellers (professionals with margin advantage). If you buy options, use monthly expiry minimum to reduce time decay damage.
Rule 3 — As an options buyer, exit at 50% loss of premium paid.
If you paid ₹100 premium and option falls to ₹50, exit. No "waiting for recovery." Options can go to zero. ₹50 exit saves ₹50 that can be deployed in a better setup.
Rule 4 — Never sell naked options without exactly understanding the risk.
Naked call option selling has unlimited loss potential. One black swan event (circuit breaker, unexpected news, Nifty gap-up 10%) can wipe your entire margin and more. Sell options only in defined-risk structures (spreads).
Rule 5 — Keep F&O allocation below 10% of total portfolio.
F&O capital should be money you can afford to lose entirely. It is risk capital, not wealth capital. Your SIP and long-term equity holdings are wealth capital — never fund F&O losses from there.

Common Mistakes
Mistake 1 — Buying far out-of-money weekly options for "lottery ticket" upside.
What they do: buy Nifty 500-point out-of-money weekly call for ₹5 premium, hoping for 50x return. Why it feels right: ₹5 seems like negligible risk for massive reward. Why it destroys wealth: these options have less than 5% probability of profitability. Over 52 weeks, ₹5 × 75 lot size × 52 = ₹19,500 per year in "lottery tickets," nearly always worthless.
Mistake 2 — Holding losing options to "expiry hoping for recovery."
What they do: option falls 70%, they hold because "it might recover before Thursday." Why it feels right: feels like patience and discipline. Why it destroys wealth: options lose value exponentially near expiry due to theta. Holding a 70%-down option to expiry recovers on less than 10% of occasions statistically.
Mistake 3 — Treating F&O profits as recurring income.
What they do: make ₹50,000 profit in a month, treat it as "monthly salary from trading." Why it feels right: feels like financial freedom proof. Why it destroys wealth: F&O profit variance is enormous. One bad month can wipe 6 months of gains. Treating variable, high-risk income as stable income leads to lifestyle inflation that accelerates destruction when losses occur.

Chapter Summary

Derivatives were created for risk management; speculation with them is a derivative of poor financial education.
Futures obligate both parties; options give buyer the right but not the obligation to transact.
Protective puts are portfolio insurance — the premium is the insurance cost, not a loss.
Option Greeks (Delta, Theta, Vega, Gamma) determine how an option's price moves — understand them before trading.
Theta decay means options buyers lose value daily; sellers collect it — time is the seller's structural ally.
SEBI 2023 study: 89% of retail F&O traders lose money — the odds are structurally negative without a specific edge.
F&O allocation must stay below 10% of total portfolio — it is risk capital, never wealth capital.
The most important F&O skill is the ability to exit at pre-defined loss without emotional escalation.


Quiz Questions
Q1: A protective put strategy involves:

A) Selling put options on stocks you own
B) Buying put options on stocks you own to limit downside loss
C) Buying call options to protect against rising prices
D) Selling covered calls to generate income
Correct: B
Explanation: A protective put gives you the right to sell your stock at the strike price. If stock falls below strike, the put gains value, offsetting the stock loss — like insurance on your equity position.

Q2: Theta in options means:

A) The option's sensitivity to underlying price movement
B) The option's sensitivity to volatility changes
C) Daily time decay — the option loses value each day even without price movement
D) The leverage ratio of the option contract
Correct: C
Explanation: Theta is time decay. An option with ₹100 premium and theta of −₹3/day will be worth ₹70 after 10 days if everything else remains constant. This is why holding options long-term without price movement is costly.

Q3: According to SEBI's 2023 study, what percentage of individual F&O traders lost money?

A) 52%
B) 70%
C) 89%
D) 40%
Correct: C
Explanation: SEBI's comprehensive study found 89% of retail F&O traders lost money, with average losses of ₹1.1 lakh per year. This structural data argues strongly for using F&O for hedging rather than primary income generation.

Q4: A covered call strategy on TCS (buying stock at ₹3,500, selling ₹3,600 call for ₹80) makes maximum profit when:

A) TCS falls to ₹3,000
B) TCS rises to ₹4,000
C) TCS stays between ₹3,500 and ₹3,600 at expiry
D) TCS falls to ₹3,420
Correct: C
Explanation: At or below ₹3,600, the call expires worthless, you keep ₹80 premium. Your stock is worth ₹3,500 (no change) or has appreciated. Maximum combined return occurs when stock is just below ₹3,600 at expiry.

Q5: The correct action when a bought option falls 50% is:

A) Buy more to average down
B) Hold until expiry for possible recovery
C) Exit immediately to preserve remaining capital for better setups
D) Convert to a spread position
Correct: C
Explanation: Options can go to zero. A 50% exit rule preserves ₹50 of capital for redeployment. Statistically, options that fall 50% below entry recover to profitability on a small minority of occasions — the exit rule protects against frequent total losses.
