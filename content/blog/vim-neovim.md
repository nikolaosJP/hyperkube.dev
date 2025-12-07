---
title: Why I Switched from Vim to Neovim
date: August 21, 2024
tags: "#Vim #Neovim #Tools"
---

After years of Vim, I switched to Neovim. Here's why.

## Key Improvements

### 1. Built-in LSP Support

Neovim's native LSP client provides IntelliSense-like features without heavy plugins. Autocompletion, go-to-definition, and refactoring work out of the box.

### 2. Lua Configuration

Lua is faster and more intuitive than VimScript. Configuration is cleaner and plugin development is more straightforward.

### 3. TreeSitter Integration

Superior syntax highlighting and code understanding through abstract syntax trees. Enables advanced features like smart text objects and refactoring.

### 4. Better Async Support

Modern async architecture means plugins don't block the editor. Background tasks run smoothly without freezing the UI.

## Migration Tips

Your existing .vimrc works in Neovim, so you can migrate gradually. Start with init.lua and convert configs piece by piece.

The ecosystem is vibrant with plugins like telescope.nvim, nvim-cmp, and lualine providing modern editor features.
