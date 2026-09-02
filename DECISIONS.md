# Architectural & Design Decisions

This document outlines the core product decisions, design philosophy, and deliberate non-goals for **Decision Log**.

---

## 1. Design Overhaul & Anti-AI Aesthetic Principles

Generic AI generated apps often suffer from telltale tropes:
- Excessive neon gradients, blur overload, and generic rainbow badges.
- Buzzword-heavy copy (*"Supercharge your team's synergy with quantum speed"*).
- Generic cards that look like standard dashboard templates.

### What We Changed to Make It Human & Purpose-Built:
1. **Quiet Luxury & Technical Precision**:
   - Palette built on refined dark obsidian (`#0C0D0E`), warm surface panels (`#121316`), crisp 1px borders, and pure white high-contrast micro-accents.
   - Typography pairing: **Newsreader** for editorial elegance in headlines + **Plus Jakarta Sans** for crisp legible UI body + **JetBrains Mono** for technical metadata and status badges.
2. **Authentic Technical Copy**:
   - Headlines and problem framing speak directly to seasoned engineers and CTOs: *“Why did we build it this way? An answer that doesn't rot in Slack.”*
   - Preloaded realistic decisions with real trade-offs (PostgreSQL RLS tenant isolation, gRPC protobuf schemas, PWA consolidation, telemetry Parquet retention).
3. **Restrained, High-Density Information Layout**:
   - Clean, scannable decision streams with clear superseding DAG lineage.
   - 1-Click standardized Markdown ADR and JSON export for actual engineering workflows.

---

## 2. What We Deliberately Chose NOT to Build

1. **Authentication / Backend Database Persistence**:
   - Kept in reactive in-memory state as per prompt requirements so anyone can instantly test without friction.
2. **Heavy WYSIWYG / Rich-Text Editor**:
   - A rigid 4-field schema (Title, Context/Why, Exact Decision, Rejected Alternatives) enforces high-signal clarity far better than unformatted markdown blobs.
3. **Complex Multi-Step Jira / GitHub Sync Webhooks**:
   - Focused purely on lightweight, immediate decision capture and export.
