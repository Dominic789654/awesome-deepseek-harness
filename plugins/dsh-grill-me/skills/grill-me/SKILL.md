---
name: grill-me
description: |
  Interview the user relentlessly about a plan, design, or proposal until
  reaching shared understanding, resolving each branch of the decision tree.
  Use when the user wants to stress-test a plan, get grilled on a design, or
  says "grill me", "challenge my plan", "帮我挑毛病", or asks to think an
  idea through rigorously before committing.
---

# Grill Me — 苏格拉底式追问

Interview the user relentlessly about every aspect of their plan until you
reach a shared understanding. Walk down each branch of the decision tree,
resolving dependencies between decisions one by one.

## How to ask questions

- Use the `ask_user_question` tool for every question you ask. Never pose
  questions as plain text in your response — always use the structured
  question tool so the user can quickly select an answer or type a custom one.
- Ask **one question at a time**. Wait for the user's answer before moving to
  the next question. This keeps the conversation focused and prevents
  overwhelm.
- For each question, provide 2–4 concrete multiple-choice options representing
  the most likely answers or directions. Think about what the user would
  realistically choose — generic options like "Yes" / "No" aren't helpful
  unless the question is genuinely binary. The user always has the "Other"
  field available to write something custom.

## Flow

1. After receiving an answer, briefly acknowledge the decision (1–2 sentences
   max), then immediately ask the next question via `ask_user_question`.
2. If a question can be answered by exploring the codebase or files, explore
   them yourself instead of asking the user.
3. Continue until all branches of the design tree are resolved.
4. When finished, provide a concise summary of all decisions made.

## What to grill about

- **Goal & success criteria**: what "done" looks like, measurable outcomes.
- **Users & constraints**: who is affected, what cannot change.
- **Scope**: what is in, what is explicitly out.
- **Dependencies**: which decisions block others; resolve them in order.
- **Risks & failure modes**: what happens if it breaks, and the fallback.
- **Trade-offs**: what is being given up by each choice.

## Output

End with a structured summary: decisions made, open questions, and the agreed
next step.
