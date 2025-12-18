---
title: MNIST: The "Hello World" of deep learning
date: March 10, 2022
tags: "#DeepLearning #ComputerVision #Python"
code_url: https://github.com/nikolaosJP/Projects/tree/main/Exploring-MNIST-Dataset-with-MLPs
---

## Introduction

If deep learning had a kindergarten, MNIST would be the finger-painting table. It’s the dataset everyone starts with: 70,000 grayscale digits that look like they were written by people in a hurry, under duress, or possibly with their non-dominant hand. And yet, this humble collection is still the perfect way to check whether your model-building machinery is actually doing what you think it’s doing.

Run a network on MNIST and you get a front-row seat to one of the great joys of machine learning: watching a model start out as a clueless toddler ("What is a number?") and graduate into a reasonably competent adult ("Ah yes, that’s a 7, don’t embarrass me.") in a matter of minutes.

## Why MNIST Still Works

MNIST trains so quickly that you can break your model fifteen different ways before lunch and still have time to fix it before dinner. If you can't push accuracy into the 98-percent range, you don’t have a “digit recognition problem.” You have a “something in your pipeline is doing interpretive dance” problem.

It’s not really about recognizing digits. It’s about testing your preprocessing, initialization, activations, regularization, training loop, and general ability to not set your learning rate to 7 by mistake.

## The Model (AKA: The Minimal Viable Brain)

A plain multilayer perceptron is more than enough to make MNIST behave:
- Input: 784 numbers that pretend to be an image  
- Hidden layers: 256 → 128, both powered by ReLU (because if it works, it works)  
- Output: 10-way softmax  
- Optimizer: Adam at lr=0.001, because we all love sensible defaults  
- Regularization: dropout 0.2 + L2 (so the model doesn’t start hallucinating digits)  
- Training time: under a minute on GPU, a few minutes on CPU unless your CPU is vintage  

This architecture is the deep learning equivalent of a reliable old hatchback: not flashy, but it gets you where you need to go and rarely bursts into flames.

## Results

The model’s learning curve looked like the intellectual development of a child prodigy:
- Epoch 1: 92.3 percent ("I have discovered numbers!")  
- Epoch 5: 97.1 percent ("I can read your handwriting now, human.")  
- Epoch 10: 98.2 percent ("Bow before me.")  

Naturally, it struggled with the classic MNIST troublemakers: 4 vs 9, 5 vs 3, 7 vs 1. These aren’t just hard for models. They’re hard for you, me, and anyone who’s ever tried to read a doctor’s handwriting.

## What You Actually Learn

Running MNIST is like doing scales on a piano. It reinforces the basics:
- How preprocessing affects everything  
- Why activations matter  
- How regularization keeps your model from becoming a conspiracy theorist  
- How to structure a training loop without crying  

After MNIST, you’re not an expert—but you’re officially dangerous.

## Where to Go Next

Once you can casually hit high-98s, it’s time to leave the nursery.  
Fashion-MNIST introduces texture and slightly more existential confusion ("Is this a shirt? Is this a sandal? Does anyone know anymore?"). ForgeryNet then drops you into full-color chaos, where models start sweating and your GPU starts making airplane noises.

MNIST gives you confidence. The next datasets give you humility.

![mnist sample](/content/projects/assets/mnist.jpeg)

