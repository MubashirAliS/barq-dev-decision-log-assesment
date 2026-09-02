# Architectural & Design Decisions

This document outlines the core product design decisions, trade-offs, and deliberate non-goals made during the build of **Decision Log**.

---

## 1. What We Built & Why

### A. High-Credibility, Executive Landing Page
- **Why**: The prompt explicitly emphasized that the landing page is more important than the product itself. The value proposition is targeted at founders, CTOs, and staff engineers who feel the pain of knowledge decay, tribal knowledge loss, and circular quarterly re-debates.
- **Key Elements**:
  - Crisp headline focusing on "institutional memory engine" rather than generic "note-taking".
  - Concrete problem breakdown: *The Perpetual Re-debate*, *The Tribal Knowledge Trap*, *The Notion Graveyard*.
  - Live interactive floating card preview so visitors immediately understand the schema before clicking demo.
  - Realistic stats (0 hrs lost in Slack archeology, 100% audit trail compliance).
  - Feature comparison table highlighting the structural advantages over Slack and messy wikis.

### B. Opinionated, Structured ADR Data Schema
- Rather than a freeform markdown textarea, we implemented a structured Architecture Decision Record (ADR) format:
  1. **What was decided** (Declarative commitment)
  2. **Context & Why** (Business / technical driver)
  3. **Consequences & Trade-offs** (Benefits and trade-offs)
  4. **Alternatives Considered & Why Rejected** (Critical to stop future re-debating)
  5. **Status & Superseding Lineage** (`Active`, `Proposed`, `Superseded`, `Deprecated`)

### C. Realistic Founder & Engineering Content
- Pre-populated the workspace with authentic, technical decisions (PostgreSQL RLS for tenant isolation, PWA consolidation over native mobile, gRPC migration, telemetry retention) rather than "Lorem Ipsum" or generic placeholder text.

### D. Restrained, Editorial Design System
- Avoided generic AI-generated aesthetics (purple gradients, generic glass blobs, template cards).
- Built around a dark-slate `#090A0F` base, amber `#F59E0B` accents for emphasis, and emerald `#10B981` indicators for active system states, with typography pairing Inter and JetBrains Mono.

---

## 2. What We Deliberately Chose NOT to Build

1. **Authentication & Multi-user Accounts**:
   - *Rationale*: Out of scope for a fast interactive demo; adds friction to testing the core value proposition.
2. **Persistent Database Backend / LocalStorage Sync**:
   - *Rationale*: The specification stated data may reset on refresh. Keeping all mutations in reactive client state ensures high responsiveness with zero cold-start latency.
3. **Complex Markdown Editor with Image Uploads**:
   - *Rationale*: Freeform rich text leads to inconsistent documentation. A strict field-based schema enforces concise, high-signal decision logging.
4. **Heavy Workflow Approval Chains (Multi-stage voting / Jira sync)**:
   - *Rationale*: Enterprise approval workflows introduce bloat. Decision Log is focused on lightweight consensus and immutable preservation.
