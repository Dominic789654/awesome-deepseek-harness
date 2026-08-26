---
name: technical-writer
description: Produces clear, well-structured technical documentation — guides, API docs, READMEs, tutorials, reference pages, and release notes — by analyzing audience, choosing the right document type, applying plain-language and information-architecture principles, and including runnable examples.
license: MIT
---

# Technical Writer

## Overview

This skill turns raw knowledge into documentation a real reader can act on. Good technical writing is not "explain everything"; it is "help this specific reader accomplish this specific task with the least friction."

## When to Use

- Writing or reviewing READMEs, API documentation, tutorials, how-to guides, or release notes
- Restructuring existing documentation for clarity
- Producing documentation from code, specifications, or notes
- Editing drafts for readability, consistency, or plain language
- Creating example-driven documentation

## Diátaxis Framework

Classify every piece of documentation into one of four types. Each serves a different reader need and follows different conventions:

| Type | Reader Need | Tone | Key Question |
|------|-------------|------|--------------|
| **Tutorial** | Learning-oriented | Friendly, guided | "Can I learn by doing?" |
| **How-to Guide** | Task-oriented | Practical, concise | "Can I get this done?" |
| **Reference** | Information-oriented | Precise, complete | "Can I look this up?" |
| **Explanation** | Understanding-oriented | Discursive, clear | "Can I understand why?" |

Most documents are one type. If a document mixes types, separate them into sections or separate pages.

## Workflow

### 1. Identify the Reader and Their Job

Before writing, answer these questions:

- **Who** is reading? (developer, operator, end user, contributor)
- **What** are they trying to accomplish?
- **What** do they already know? (assumed context)
- **What** do they need to learn or do?

Write for one reader. If you have multiple audiences, write separate documents or clearly separate sections.

### 2. Choose the Document Type

Based on the reader's need:

- **They are learning** → Tutorial (step-by-step, with working code)
- **They have a goal** → How-to Guide (concise steps to achieve something specific)
- **They need facts** → Reference (accurate, complete, scannable)
- **They need context** → Explanation (background, rationale, how things fit together)

### 3. Outline the Information Architecture

Plan before writing:

- **Logical flow**: What does the reader need to know first?
- **Progressive disclosure**: Start simple, add complexity
- **Navigation**: Headings, TOC, links to related content
- **Completeness**: Does this cover the full task, or do readers need to jump elsewhere?

### 4. Write the First Draft

- Start with the goal, not the background
- Use the active voice
- Write short sentences and short paragraphs
- One idea per paragraph
- Use concrete nouns and specific verbs
- Avoid jargon unless your audience shares it
- Include code examples that run

### 5. Edit for Clarity

- Remove unnecessary words
- Replace passive voice with active voice
- Break long sentences into short ones
- Ensure every heading is meaningful
- Verify code examples are correct and runnable
- Check that technical terms are defined on first use

### 6. Verify with Readability Checks

- **Flesch-Kincaid grade level**: Aim for 8–12 for general developer docs
- **Reading time**: Estimate and display
- **Link check**: Verify all links work
- **Example check**: Run every code example
- **Peer review**: Have someone else read it

## Writing Principles

### Plain Language

- Use simple words: "use" not "utilize", "start" not "commence"
- Use active voice: "The function returns..." not "The value is returned by..."
- Be direct: "Configure the port" not "It is recommended that the port be configured"
- Define acronyms on first use

### Information Architecture

- **Front-load important information**: Don't bury the answer
- **Use consistent structure**: Same format for same document types
- **Provide navigation**: TOC, breadcrumbs, related links
- **Make things findable**: Use clear, descriptive headings

### Code Examples

- **Runnable**: Every example should be copy-paste runnable
- **Complete**: Show the full context, not just the snippet
- **Tested**: Verify examples work before publishing
- **Commented**: Explain non-obvious parts

### Formatting

- Use headings (H1–H6) consistently
- Use code blocks for code, commands, output, and config
- Use lists for sequences and groupings
- Use tables for structured data
- Use callouts for warnings, tips, and notes

## Document Type Guidelines

### Tutorial

- Teach a concept through guided practice
- Small steps with clear outcomes
- Working code throughout
- Explain what the reader is learning, not just doing
- End with a working result the reader can build on

### How-to Guide

- Start with what the reader wants to accomplish
- Numbered steps for sequential tasks
- Brief, practical explanations
- Include troubleshooting for common issues
- Link to reference for details

### Reference

- Organize by topic, not narrative
- Complete and accurate
- Consistent format across entries
- Include type information, parameters, return values
- Don't explain "why" — link to explanation

### Explanation

- Provide context and background
- Explain how things work and why they are that way
- Connect concepts to each other
- Use examples to illustrate abstract ideas
- Don't include procedures — link to how-to guides

## Quality Checklist

- [ ] One clear purpose per document
- [ ] Correct document type for the reader's need
- [ ] Active voice throughout
- [ ] Short sentences and paragraphs
- [ ] Technical terms defined on first use
- [ ] Code examples are runnable and tested
- [ ] Headings are descriptive and scannable
- [ ] No jargon the audience won't know
- [ ] Links all work
- [ ] Consistent formatting and style
