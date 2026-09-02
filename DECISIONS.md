# Design Decisions & Deliberate Non-Goals

### 1. Decisions Made & Rationale

- **Editorial & Minimalist Technical Aesthetic**: Instead of neon gradients, generic glass blobs, and template SaaS illustrations, we used an obsidian base (`#0C0D0E`), subtle border dividers, and focused typography (**Newsreader** for editorial headings, **Plus Jakarta Sans** for interface readability, and **JetBrains Mono** for ADR status badges).
- **Practical 4-Field ADR Structure**: Rather than a freeform markdown textarea, we enforced an opinionated Architecture Decision Record schema:
  1. *What was decided*
  2. *Why it was decided (Problem context)*
  3. *Key trade-offs & consequences*
  4. *Alternatives considered and reasons rejected*
- **First-Class Status & Lineage Tracking**: Every decision tracks whether it is `ACTIVE`, `PROPOSED`, `SUPERSEDED`, or `DEPRECATED`. Superseded items explicitly link to the newer RFC (e.g. `DEC-029 superseded by DEC-045`).
- **Authentic Realistic Content**: Seeded the registry with realistic technical decisions (PostgreSQL RLS for tenant isolation, PWA over dual native repos, gRPC migration, and telemetry retention).
- **1-Click Export**: Included instant standardized Markdown ADR copy and JSON export.

---

### 2. Deliberately Chosen NOT to Build

- **User Authentication / Multi-Tenant DB Backend**: The prompt explicitly stated no persistence or backend is required. Keeping state in memory ensures zero cold starts and immediate demo interactivity.
- **Heavy Rich-Text / WYSIWYG Editor**: Unstructured text editors produce bloated, inconsistent documentation. A strict field-based format guarantees concise, high-signal decision records.
- **Complex Jira / Slack Integration Webhooks**: Kept out of scope to focus on zero-friction decision capture and clean repository exports.
