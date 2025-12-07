---
title: Anomaly Detection
date: July 18, 2022
tags: "#VGG16 #ComputerVision #Manufacturing"
---

## Introduction

Imagine a factory worker whose entire job is to stare at metal parts and decide whether they look “weird.” Now imagine asking that person to do it for eight hours straight, five days a week, while the parts whiz by like they’re late for a flight. Humans are wonderful creatures, but they’re not exactly optimized for endless spot-the-difference marathons.

A fine-tuned VGG16 model, however, is basically the intern who never blinks, never gets bored, and never says “Hmm, maybe it’s just the lighting.” Feeding it the MVTec dataset (15 product categories, each with a personality disorder), it quickly learns what “normal” looks like. And once it knows that, anything even slightly funky starts glowing like a neon sign.

![anomaly sample](/content/projects/assets/anomaly.jpeg)

## Method

### Transfer Learning; Teaching a Vision Model to Judge Stuff

Thanks to pretraining on ImageNet, VGG16 already understands the visual universe: edges, textures, shapes, the general idea of “things.” All we do is fine-tune the last three convolutional blocks so it can stop being a general-purpose scholar and start being a judgmental inspector with strong opinions about surface imperfections.

It doesn’t need tons of defect examples either. Most defects are rare, unpredictable, and almost intentionally annoying. So instead of learning all the ways something can go wrong (a hopeless task), the model learns the sprawling, high-dimensional concept of “normal.” Anything too far off that manifold? Suspicious.

### The Training Routine (Minus the Academic Pretension)

- Heavy augmentation: rotate it, brighten it, darken it, tilt it like a confused photographer.  
- Weighted or focal losses so anomalies don’t get drowned out by normal samples.  
- A few hundred labeled images per category is usually enough; no need for a data center or a research grant with a dramatic title.

## Performance

### The Numbers (Because Even Funny People Need Data)

The system hits around 94.7 percent accuracy, with about 3.2 percent false positives. Each image gets processed in roughly 50 ms on a GPU, which is fast enough that the conveyor belt doesn’t need to pretend it’s on break.

In real deployments, setups like this reduce escaped defects by 60–80 percent. And if you toss in a quick human double-check on borderline cases, you end up north of 99 percent coverage. Humans are still involved, but now they get to do the fun part: saying “yes” or “no” instead of playing industrial Where’s Waldo all day.

### Why It Works (In English)

The model learns “normal” so well that anything abnormal becomes obvious. This approach scales, adapts, and happily detects defect types it never saw during training. It stops being a classifier and starts being more like a slightly paranoid quality-control professional.

## Broader Relevance

Once you realize that “learn normal, flag weird” is the entire trick, you start seeing it everywhere. Cracks in bridges? Same idea. Medical images with suspicious blobs? Yep. Cybersecurity logs that suddenly behave like they drank three espressos? Still the same recipe.

Whenever the world behaves predictably for long enough, a model like this can learn the pattern and point out when reality wanders off script. And reality wanders off script a lot.

[View on GitHub](https://github.com/nikolaosJP/Projects/tree/main/MVTec-Anomaly-Detection)
