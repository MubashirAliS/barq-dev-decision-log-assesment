# Decision Log

> **The institutional memory engine for high-velocity teams.** Stop re-debating solved engineering problems.

A lightweight, high-craft web product designed for founders, CTOs, and staff architects to capture and query binding decisions: **what was decided**, **why**, **when**, and **whether it remains active**.

---

## Live Links & Submission Deliverables
- **Live Demo & Landing Page**: Deployed on GitHub Pages
- **Original Build Prompts**: [`PROMPTS.md`](./PROMPTS.md)
- **Deliberate Design Decisions & Non-Goals**: [`DECISIONS.md`](./DECISIONS.md)

---

## Core Capabilities

1. **Executive-Credible Landing Page**:
   - Compelling value proposition for leadership teams suffering from "knowledge decay" and "Slack archeology".
   - Breakdown of the Decision Architecture and comparison against generic wikis (Notion) and chat.
   - 1-Click Launch into the interactive product workspace.

2. **Interactive Decision Log Demo**:
   - **ADR Structure**: Logs title, context/why, exact decision, consequences, and evaluated alternatives with rejection rationale.
   - **First-Class Status Tracking**: Filter and update records between `Active`, `Proposed`, `Superseded`, and `Deprecated`.
   - **Superseded Lineage**: Trace how older architectural decisions were replaced by newer RFCs.
   - **Instant Search & Filter**: Instant query across titles, rationale, deciders, tags, categories, and status badges.
   - **ADR Exporters**: Export full workspace as JSON or individual ADRs as standardized Markdown.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Production build
npm run build
```

---

## Deployment to GitHub Pages

This repository includes both:
- **GitHub Actions Workflow** in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) (auto-deploys upon push to `main`).
- **`gh-pages` script** configured in `package.json` for manual deployment if desired.
