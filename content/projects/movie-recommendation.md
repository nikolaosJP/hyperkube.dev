---
title: Movie Recommendation System
date: June 12, 2023
tags: "#NeuralNetworks #CollaborativeFiltering #RecSys #MovieLens"
---

## Why Build It

Most recommendation systems behave like the overeager friend who keeps insisting you’ll “love this movie” because everyone else watched it. This project was an attempt to build something better: a recommender that actually understands your taste instead of shoving mainstream mediocrity down your throat. MovieLens is the perfect sandbox for this experiment because it’s clean, honest, and full of real people rating real movies with all the inconsistency and emotional volatility that implies.

The deeper motivation is the classic Wait But Why problem: humans are complicated, but datasets are worse. So instead of forcing taste into neat categories like “action lovers” or “crime drama aficionados,” the system learns its own weird, high-dimensional version of who you are as a movie-watcher. The end goal: movies you’d genuinely pick on a Friday night, not the algorithmic equivalent of plain toast.

## How It Learns What You Like

### Collaborative Filtering (The “People Like You” Trick)
Collaborative filtering starts by assuming that somewhere out there exist your cinematic soulmates, i.e., other humans who independently loved the same bizarre mix of sci-fi, documentaries, and guilty-pleasure comedies you did. If those people rated a movie highly, chances are you’ll like it too. The model digs through the giant user–movie matrix like a gossip-seeking matchmaker, trying to find the overlap patterns.

### Latent Factors (The Hidden Taste Dimensions)
Matrix factorization takes that intuition and compresses it into latent vectors: secret coordinates in “taste space” where users and movies live together. Some dimensions capture obvious things (“likes complex plots”), while others capture mysterious properties like “has a questionable fondness for movies involving time loops.” By reducing millions of ratings into these vectors, the system turns fuzzy human preferences into math that behaves surprisingly well.

![resys sample](/content/projects/assets/resys.jpeg)

### Neural Collaborative Filtering (Taste, But With Extra Weirdness)
Of course, humans are nonlinear disasters. You can love horror films but despise 90 percent of them; you can worship animation except when it contains singing animals. Neural Collaborative Filtering embraces this chaos. It embeds users and movies, smashes their vectors together, and feeds them through dense layers that learn patterns only a neural network (or a mind reader) could spot. It captures not just what you like, but the unhinged exceptions to your taste rules.

MovieLens is the proving ground. If your model can decode the swirling madness of 1M human ratings, it can probably handle recommendations in the wild.

## Results (AKA: Did the Math Do Anything Useful?)

The neural model lands at an **RMSE of 0.87**, comfortably outperforming the **1.02** matrix-factorization baseline, about a 15 percent improvement in “please don’t embarrass yourself with this prediction.” Using **50-dimensional embeddings** and a neural tower of **[128, 64, 32]**, it learns user–movie interactions that are far from trivial.

But rating prediction only tells part of the story. What you *actually* want is a ranked list that puts good movies at the top instead of burying them below eight mediocre thrillers and a rom-com you’d rather pretend doesn’t exist.

Top-K metrics look like this:
- **Precision@10:** 0.34  
- **Recall@10:** 0.28  
- **NDCG@10:** 0.89  

These numbers translate roughly to: “The model has a pretty good idea of what you’ll like, and it puts those movies near the top rather than playing hide-and-seek.”

Cold-start gaps are patched with content features (genres, cast, release year), because even the best CF model can’t guess the preferences of someone who just showed up and rated nothing.

Swap the dataset, keep the math, and this pipeline becomes a recommender for products, playlists, news, and even who-to-follow social suggestions, just replace “movie” with whatever people obsess over next.

[View on GitHub](https://github.com/nikolaosJP/Projects/tree/main/Recommendation-Systems)

