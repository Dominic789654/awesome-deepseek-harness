---
name: refactoring-guide
description: Applies safe, incremental, behavior-preserving refactorings (extract function/variable, rename, inline, decompose conditionals, remove duplication, replace conditional with polymorphism, introduce parameter object) using a test-protected, small-step workflow. Use this skill when the user asks to "refactor", "clean up", "simplify", "extract a method/function", "rename", "remove duplication", "reduce nesting", "break up a god class/long function", "improve readability", "untangle" code, "make this testable", "reduce complexity", or "tidy up" without changing what the code does.
license: MIT
---

# Refactoring Guide

## Overview
Refactoring is changing the internal structure of code without changing its observable behavior. The goal is readability, maintainability, and testability.

The two non-negotiable rules:
1. Behavior must not change. No new functionality, no bug fixes, no API changes in a refactoring commit.
2. Tests stay green at every step. Refactor in small steps; run tests after each.

## Workflow
1. Establish a safety net (run existing tests, write characterization tests if needed)
2. Identify the smell and pick ONE refactoring
3. Apply the smallest mechanical step
4. Run tests to verify behavior unchanged
5. Commit
6. Repeat