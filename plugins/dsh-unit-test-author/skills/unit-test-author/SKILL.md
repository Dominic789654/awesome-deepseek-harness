---
name: unit-test-author
description: Writes thorough, maintainable unit tests with comprehensive edge cases, table-driven cases, proper mocking/stubbing, and meaningful coverage across languages and frameworks (pytest, Jest/Vitest, Go testing, JUnit, RSpec, xUnit, Rust). Use this skill when the user asks to "write tests", "add unit tests", "improve coverage", "test this function/class/module", "add edge cases", "mock this dependency", "make these tests table-driven", "test error handling", or wants a test plan before implementing.
license: MIT
---

# Unit Test Author

## Overview
This skill produces unit tests that are correct, behavior-focused, exhaustive on edge cases, and resistant to brittleness. It applies across languages and frameworks and emphasizes testing observable behavior over implementation details.

## Core Principles
1. Test behavior, not implementation
2. One logical concept per test
3. Deterministic always (no real clocks, randomness, network)
4. Arrange-Act-Assert (AAA) structure
5. Fail for one reason (precise assertions)
6. Cover the contract, then the edges

## Workflow
1. Identify the unit and its contract
2. Detect the framework and conventions
3. Enumerate test cases using edge-case checklist
4. Choose structure (table-driven or individual)
5. Plan test double strategy (mock vs stub vs fake vs spy)
6. Write tests with descriptive names, AAA layout, precise assertions
7. Add error-path and edge tests
8. Run tests and verify