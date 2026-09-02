import React from 'react';
import { 
  ArrowUpRight, 
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo }) => {
  return (
    <div className="min-h-screen bg-[#0C0D0E] text-[#E5E5E7] antialiased selection:bg-[#E5E5E7] selection:text-[#0C0D0E] font-sans">
      
      {/* Top Navigation */}
      <header className="border-b border-white/[0.08] sticky top-0 bg-[#0C0D0E]/90 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white text-black font-mono font-bold text-xs flex items-center justify-center rounded-sm">
              D
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">Decision Log</span>
            <span className="text-[11px] font-mono text-neutral-400 border border-white/[0.08] px-1.5 py-0.5 rounded">
              open preview
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-neutral-400 font-medium">
            <a href="#problem" className="hover:text-white transition">The Problem</a>
            <a href="#schema" className="hover:text-white transition">ADR Schema</a>
            <a href="#comparison" className="hover:text-white transition">System Design</a>
          </div>

          <button
            onClick={onLaunchDemo}
            className="px-3.5 py-1.5 rounded text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Open Decision Registry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 border border-white/[0.08] bg-[#141518] px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Architectural Decision Records for Engineering & Product</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-white leading-[1.15]">
            Why did we build it this way? <br />
            <span className="font-editorial italic font-normal text-neutral-400">An answer that doesn’t rot in Slack.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed font-normal">
            When teams grow, original context disappears. Engineers leave, trade-offs are forgotten, and past decisions get endlessly re-debated. Decision Log is an immutable ledger of what was decided, the trade-offs rejected, and what it supersedes.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onLaunchDemo}
              className="px-5 py-2.5 rounded bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Interactive Registry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <a
              href="#schema"
              className="px-4 py-2.5 rounded border border-white/[0.12] bg-[#141518] text-neutral-300 hover:text-white hover:border-white/20 transition text-xs sm:text-sm font-medium"
            >
              Read Decision Schema
            </a>
          </div>
        </div>

        {/* Real Decision Card Sample */}
        <div className="mt-16 border border-white/[0.1] bg-[#121316] rounded-lg p-6 sm:p-7 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-white/5 border border-white/10 rounded text-neutral-300">
                DEC-042
              </span>
              <span className="text-xs text-neutral-400 font-medium">Architecture</span>
              <span className="text-neutral-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ACTIVE
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500">August 14, 2026</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight">
              Standardize on PostgreSQL with Row-Level Security for multi-tenant data isolation
            </h3>
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-400">
              <div className="bg-[#17181C] p-3.5 rounded border border-white/[0.04]">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 mb-1">Problem & Why</p>
                <p className="leading-relaxed">Database-per-tenant ballooned AWS RDS monthly costs by 68% with excessive connection pooling overhead.</p>
              </div>
              <div className="bg-[#17181C] p-3.5 rounded border border-white/[0.04]">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 mb-1">What was decided</p>
                <p className="leading-relaxed text-neutral-200">Enforce RLS scoped to tenant_id on single pooled cluster. Eliminates data leaks at the engine layer.</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-neutral-800 text-neutral-300 flex items-center justify-center font-mono text-[10px]">
                ER
              </span>
              <span>Elena Rostova (VP of Engineering)</span>
            </div>
            <button 
              onClick={onLaunchDemo}
              className="text-neutral-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              Open in demo &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Practical Metrics Strip */}
      <section className="border-y border-white/[0.08] bg-[#0E0F12] py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <p className="text-neutral-500">FORMAT</p>
            <p className="text-white text-sm mt-1">Lightweight ADR Standard</p>
          </div>
          <div>
            <p className="text-neutral-500">STATUS LINEAGE</p>
            <p className="text-white text-sm mt-1">Superseding Chain (DAG)</p>
          </div>
          <div>
            <p className="text-neutral-500">SEARCH</p>
            <p className="text-white text-sm mt-1">Sub-10ms Exact Keyword</p>
          </div>
          <div>
            <p className="text-neutral-500">EXPORT</p>
            <p className="text-white text-sm mt-1">Markdown & JSON Compliant</p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-3 mb-12">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">The Knowledge Decay Problem</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            How fast-moving teams lose their reasoning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="border border-white/[0.08] bg-[#121316] p-5 rounded-lg space-y-2.5">
            <span className="font-mono text-neutral-500 text-[11px]">01 / RE-DEBATING</span>
            <h4 className="font-semibold text-white text-sm">Circular Discussions</h4>
            <p className="text-neutral-400">
              New team members propose tools that were already evaluated and rejected 4 months ago, triggering the same 3-hour Slack argument.
            </p>
          </div>

          <div className="border border-white/[0.08] bg-[#121316] p-5 rounded-lg space-y-2.5">
            <span className="font-mono text-neutral-500 text-[11px]">02 / BLACK BOXES</span>
            <h4 className="font-semibold text-white text-sm">Untouchable Systems</h4>
            <p className="text-neutral-400">
              Nobody knows why an unusual caching policy or queue design exists. Engineers fear refactoring working code because the trade-offs are lost.
            </p>
          </div>

          <div className="border border-white/[0.08] bg-[#121316] p-5 rounded-lg space-y-2.5">
            <span className="font-mono text-neutral-500 text-[11px]">03 / WIKI ROT</span>
            <h4 className="font-semibold text-white text-sm">Unstructured Docs</h4>
            <p className="text-neutral-400">
              Notion and Confluence pages don’t track whether a document is still actively enforced, leading to conflicting architecture guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ADR Schema Breakdown */}
      <section id="schema" className="max-w-4xl mx-auto px-6 py-16 border-t border-white/[0.08]">
        <div className="space-y-3 mb-10">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Structured Architecture</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Four fields that define every decision
          </h2>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="border border-white/[0.08] bg-[#121316] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">01</span>
              <span className="text-white font-semibold font-sans text-sm">What was decided</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">A single declarative sentence establishing team policy.</span>
          </div>

          <div className="border border-white/[0.08] bg-[#121316] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">02</span>
              <span className="text-white font-semibold font-sans text-sm">Why it was decided</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">The technical, operational, or budgetary constraint.</span>
          </div>

          <div className="border border-white/[0.08] bg-[#121316] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">03</span>
              <span className="text-white font-semibold font-sans text-sm">Alternatives discarded</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">Options considered and the specific reasons for rejection.</span>
          </div>

          <div className="border border-white/[0.08] bg-[#121316] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">04</span>
              <span className="text-white font-semibold font-sans text-sm">Superseding lineage</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">Never delete old decisions; mark them superseded by the new RFC.</span>
          </div>
        </div>
      </section>

      {/* Direct Comparison Table */}
      <section id="comparison" className="max-w-4xl mx-auto px-6 py-16 border-t border-white/[0.08]">
        <div className="space-y-3 mb-10">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Comparison</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Designed specifically for technical decision trails
          </h2>
        </div>

        <div className="overflow-x-auto border border-white/[0.08] rounded-lg">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#141518] text-neutral-400 font-mono text-[11px]">
                <th className="p-3.5">Capability</th>
                <th className="p-3.5">Slack / Chat</th>
                <th className="p-3.5">Notion / Docs</th>
                <th className="p-3.5 text-white bg-white/[0.04]">Decision Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-neutral-300">
              <tr>
                <td className="p-3.5 font-medium text-white">Status Lifecycle (Active / Superseded)</td>
                <td className="p-3.5 text-neutral-500">None</td>
                <td className="p-3.5 text-neutral-500">Manual tags (often rot)</td>
                <td className="p-3.5 text-emerald-400 font-mono bg-white/[0.04]">First-class state</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Rejected Alternatives Recorded</td>
                <td className="p-3.5 text-neutral-500">Lost in thread replies</td>
                <td className="p-3.5 text-neutral-500">Rarely documented</td>
                <td className="p-3.5 text-white font-mono bg-white/[0.04]">Structured schema field</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Superseded Lineage Link</td>
                <td className="p-3.5 text-neutral-500">Impossible</td>
                <td className="p-3.5 text-neutral-500">Broken bookmarks</td>
                <td className="p-3.5 text-white font-mono bg-white/[0.04]">Bi-directional DAG pointers</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Export for Audit / SOC2</td>
                <td className="p-3.5 text-neutral-500">None</td>
                <td className="p-3.5 text-neutral-500">Manual copy paste</td>
                <td className="p-3.5 text-white font-mono bg-white/[0.04]">1-Click Markdown & JSON</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/[0.08]">
        <div className="border border-white/[0.1] bg-[#121316] p-8 sm:p-12 rounded-lg text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Start capturing decisions with zero friction.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            No signup, database, or configuration required. Open the demo, create a decision record, and export standard markdown.
          </p>
          <div className="pt-2">
            <button
              onClick={onLaunchDemo}
              className="px-6 py-2.5 rounded bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Decision Registry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-white font-semibold">Decision Log</span>
            <span>— Architecture Registry</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Decision Log. Clean engineering records.</p>
        </div>
      </footer>
    </div>
  );
};
