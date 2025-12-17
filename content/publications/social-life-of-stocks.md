---
title: The Social Life of Stocks: How Correlations Drive Portfolio Risk
date: 2025-12-20
tags: "#investing #risk #optimization #quantfinance"
---

**Full paper title (preprint):**  
*Covariance-Aware Simplex Projection for Cardinality-Constrained Portfolio Optimization*  

*Because owning many things is not the same as being diversified, and your optimizer should know that.*

## The Setup: Your Optimizer Is Lying to You

Imagine building an investment portfolio when you have hundreds of stocks to choose from, but you only want to hold a small number, say fifteen, because transaction costs are real and managing 300 positions is how spreadsheets achieve sentience. That simple rule, “you may only own *K* assets,” is what researchers call a **cardinality constraint**. It sounds technical, but it is really just common sense with math credentials.

To search for good portfolios under this rule, researchers often use trial-and-error style algorithms. These algorithms try lots of combinations, keep the promising ones, and discard the disasters. They are creative, fast, and occasionally reckless. As a result, they frequently propose portfolios that break the rules: weights do not add up to 100%, some positions go negative, or the portfolio quietly sneaks in far more than fifteen assets. **Repair** is the part where we politely intervene.

When the algorithm hands us a portfolio that breaks the rules, we don’t throw it away or lecture it about basic arithmetic. We simply take the illegal portfolio and nudge it back into the set of portfolios that are allowed to exist. This means adjusting weights, clipping negative positions and generally reshaping the portfolio until it fits all the constraints again.

Importantly, repair is not about finding the best portfolio. It is about finding the closest legal one. We keep as much of the algorithm’s original idea as possible, change the minimum necessary to make it behave, and then send it back out to cause trouble again.

And this is where the question becomes unavoidable:

Closest according to what, exactly?

## The Problem With the Usual Fix

Most portfolio repairs rely on something called **Euclidean projection**. In mortal terms, this means finding the closest legal portfolio using the same distance idea you learned in school: straight lines, squares, the whole thing. At first glance, this sounds reasonable, afterall, distance is distance, right? 

That's until you realize what this actually implies. The math is quietly assuming that every stock lives alone in the universe. Apple exists in its own bubble. Nvidia exists in its own bubble. A one-percent tweak to Apple is treated as exactly the same as a one-percent tweak to Nvidia. No context. No history. No shared market meltdowns. No awkward moments when everything crashes together.

Financially, this is deeply optimistic.

Stocks move together. Tech stocks gossip. Banks panic as a group. Energy companies wake up every morning and check oil prices before brushing their teeth. Risk does not come from individual positions; it comes from assets moving in unison. A portfolio that owns ten highly correlated stocks is not diversified, it is just synchronized.

Euclidean distance has no awareness of this. It fixes the math while quietly breaking the finance.

## CASPer: The Friendly Ghost of Portfolio Optimization

The paper introduces a method with an intimidating name, Covariance-Aware Simplex Projection (CASP) but a very approachable idea. Instead of measuring how close two portfolios are numerically, CASP measures how close they are **in terms of risk behavior**.

It does this by using covariance, which is just a formal way of saying “who moves with whom.” The repair step now asks a better question: which legal portfolio will behave most similarly to the original one when markets get messy? In finance terms, it minimizes *tracking error*, not raw numerical distance.

This small shift changes everything. The repair process stops accidentally pushing weight toward groups of assets that already move together. Diversification stops being an accident and starts being a consequence.

## How the Method Actually Works

CASP proceeds in two grounded, sensible steps. First, it decides which assets are worth keeping, adjusting for how volatile each one is. This prevents high-volatility stocks from being chosen just because they are loud. This step alone removes a surprisingly large amount of risk.

Second, once the asset set is fixed, CASP adjusts the weights while explicitly accounting for how those assets move together. Correlated assets are penalized for clustering, and genuinely diversifying combinations are favored. The portfolio is repaired in a way that respects both the rules and the underlying market dynamics.

The method is efficient, practical, and designed to slot directly into existing optimization frameworks without drama.

## Why This Matters More Than It Sounds

The results are reassuring rather than flashy. Portfolios repaired with CASP consistently exhibit lower risk than those repaired using traditional methods. Most of the improvement comes from smarter asset selection, and a smaller but statistically meaningful portion comes from the covariance-aware repair itself. When the authors add return awareness, performance improves further in good market conditions, with the expected trade-offs when markets turn hostile.

The real contribution of this paper is not a new investment strategy, but a correction of a quiet mismatch. Many optimization algorithms model risk carefully and then ignore it during repair. CASP closes that gap.

Because repair happens constantly inside these algorithms, small improvements compound. Over time, the search is gently guided toward portfolios that make sense not just numerically, but financially.

The lesson is simple. Limiting the number of assets is realistic. Repairing portfolios is unavoidable. Measuring distance without understanding correlation is a mistake. CASP fixes that mistake by reminding the algorithm of something finance has known for decades.

You are allowed to have many friends.  
They just should not all scream at the same time.

<div class="cta-wrapper">
  <a class="cta-button" href="https://github.com/nikolaosJP/CASPer/tree/main" target="_blank" rel="noopener noreferrer">View DOI</a>
</div>
