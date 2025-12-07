---
title: Building a Custom Linux Kernel Module
date: December 2, 2024
tags: "#Linux #C #Kernel"
---

Kernel development provides direct hardware access and system-level control. Requirements: Linux kernel headers, build-essential package, and C programming basics.

## Hello World Module

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>

static int __init hello_init(void) {
    printk(KERN_INFO "Hello, Kernel!\n");
    return 0;
}

static void __exit hello_exit(void) {
    printk(KERN_INFO "Goodbye, Kernel!\n");
}

module_init(hello_init);
module_exit(hello_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("hypercube");
MODULE_DESCRIPTION("A simple kernel module");
```

## Compilation and Loading

Use make with a proper Makefile, then insmod to load and rmmod to unload. Check dmesg for kernel log messages.
