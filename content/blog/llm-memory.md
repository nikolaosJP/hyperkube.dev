---
title: Managing Context Windows in LLMs
date: September 15, 2025
tags: "#AI #LLM #Engineering"
---

## The Problem

Even with 128k+ token context windows, long conversations exceed limits. Including everything reduces response quality and increases costs.

## Strategies

### 1. Semantic Summarization

After every N exchanges, use the LLM itself to create a semantic summary of the conversation, preserving key facts while reducing token count.

### 2. Vector-Based Retrieval

Store message embeddings in a vector database. For each new query, retrieve the most relevant past exchanges rather than including the entire history.

### 3. Hierarchical Memory

Maintain multiple memory layers: immediate context (last few messages), session summary, and long-term facts. Each serves different purposes.

```javascript
class ConversationMemory {
  constructor() {
    this.immediate = []; // Last 10 messages
    this.summary = "";   // Session summary
    this.facts = [];     // Extracted key facts
  }

  async addMessage(msg) {
    this.immediate.push(msg);
    if (this.immediate.length > 10) {
      await this.consolidate();
    }
  }

  async consolidate() {
    const summary = await this.summarize(this.immediate);
    this.summary = this.mergeSummaries(this.summary, summary);
    this.facts.push(...await this.extractFacts(this.immediate));
    this.immediate = this.immediate.slice(-3);
  }
}
```

## Real-World Impact

These techniques reduced our average context size by 70% while maintaining conversation quality, resulting in faster responses and lower costs.
