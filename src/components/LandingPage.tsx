import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution' | 'export'>('problem');
  const [activeSlide, setActiveSlide] = useState(0);

  const SLIDES = [
    {
      code: 'DEC-042',
      category: 'Architecture',
      status: 'active',
      date: 'August 14, 2026',
      title: 'Standardize on PostgreSQL with Row-Level Security for multi-tenant data isolation',
      context: 'Database-per-tenant ballooned AWS RDS monthly costs by 68% with excessive connection pooling overhead.',
      decision: 'Enforce RLS scoped to tenant_id on single pooled cluster. Eliminates data leaks at the engine layer.',
      author: 'Elena Rostova',
      role: 'VP of Engineering'
    },
    {
      code: 'DEC-041',
      category: 'Product Strategy',
      status: 'active',
      date: 'July 28, 2026',
      title: 'Consolidate Swift & Kotlin into unified high-performance Progressive Web App (PWA)',
      context: 'Dual native store releases caused 48-hour security deployment delays and consumed 55% of mobile engineering.',
      decision: 'Sunset native codebases. Unify all feature velocity into responsive web client with WebAuthn & biometric auth.',
      author: 'Marcus Chen',
      role: 'Head of Product'
    },
    {
      code: 'DEC-038',
      category: 'Infrastructure',
      status: 'active',
      date: 'June 11, 2026',
      title: 'Migrate inter-service microservice communication to strict Protobuf gRPC contracts',
      context: 'JSON payload parsing overhead accounted for 30% of p99 latency spikes in the live auction cluster.',
      decision: 'Centralize strict protobuf schemas in proto repository with automated client generation on commit.',
      author: 'David Vance',
      role: 'Staff Infrastructure Architect'
    }
  ];

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = SLIDES[activeSlide];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#E2E4E9] antialiased selection:bg-[#E2E4E9] selection:text-[#08090A] font-sans">
      
      {/* Top Navigation */}
      <header className="border-b border-white/[0.08] sticky top-0 bg-[#08090A]/90 backdrop-blur-md z-40 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white text-black font-mono font-bold text-xs flex items-center justify-center rounded-sm shadow-sm transition-transform hover:rotate-6">
              D
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">Decision Log</span>
            <span className="text-[11px] font-mono text-neutral-400 border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 rounded">
              v2.5
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-neutral-400 font-medium">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#interactive-slider" className="hover:text-white transition-colors">Live Decision Stream</a>
            <a href="#schema" className="hover:text-white transition-colors">ADR Schema</a>
            <a href="#comparison" className="hover:text-white transition-colors">System Design</a>
          </div>

          <button
            onClick={onLaunchDemo}
            className="btn-tactile px-3.5 py-1.5 rounded text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-white/10 hover:scale-[1.03]"
          >
            <span>Launch Registry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section with Entry Animation */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 animate-fade-in">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 border border-white/[0.08] bg-[#101216] px-3.5 py-1.5 rounded-full shadow-inner hover:border-white/20 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator"></span>
            <span>Architectural Decision Records for Engineering Leaders</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-white leading-[1.12]">
            Why did we build it this way? <br />
            <span className="font-editorial italic font-normal text-neutral-400">An answer that doesn’t rot in Slack.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed font-normal">
            When teams scale, original reasoning evaporates. Developers leave, trade-offs are forgotten, and past decisions get endlessly re-argued. Decision Log is an immutable ledger of what was chosen, what was rejected, and what it supersedes.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onLaunchDemo}
              className="btn-tactile px-5 py-3 rounded bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5 hover:scale-[1.02]"
            >
              <span>Explore Interactive Registry</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <a
              href="#interactive-slider"
              className="btn-tactile px-4 py-3 rounded border border-white/[0.12] bg-[#111317] text-neutral-300 hover:text-white hover:border-white/25 transition-all duration-200 text-xs sm:text-sm font-medium"
            >
              Watch Interactive Carousel &darr;
            </a>
          </div>
        </div>

        {/* Live Sliding Interactive Carousel Card */}
        <div id="interactive-slider" className="mt-16 border border-white/[0.1] bg-[#101216] rounded-xl p-6 sm:p-7 shadow-2xl space-y-4 transition-all duration-300 relative overflow-hidden">
          
          {/* Slide Indicator Bar & Carousel Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-white/5 border border-white/10 rounded text-neutral-300 transition-all">
                {currentSlide.code}
              </span>
              <span className="text-xs text-neutral-400 font-medium">{currentSlide.category}</span>
              <span className="text-neutral-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator"></span>
                ACTIVE
              </span>
            </div>

            {/* Slider Switcher Buttons */}
            <div className="flex items-center gap-1.5 bg-[#08090A] p-1 rounded-lg border border-white/[0.06]">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.code}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'bg-white text-black font-bold scale-105'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {s.code}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Slide Content */}
          <div key={currentSlide.code} className="animate-fade-in space-y-4">
            <h3 className="text-lg sm:text-xl font-medium text-white tracking-tight leading-snug">
              {currentSlide.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-400">
              <div className="bg-[#14161C] p-4 rounded-lg border border-white/[0.04] transition-all hover:border-white/10">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                  Problem Context
                </p>
                <p className="leading-relaxed text-neutral-400">{currentSlide.context}</p>
              </div>
              <div className="bg-[#14161C] p-4 rounded-lg border border-white/[0.04] transition-all hover:border-white/10">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                  What was decided
                </p>
                <p className="leading-relaxed text-neutral-200">{currentSlide.decision}</p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-neutral-500 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-neutral-800 text-neutral-300 flex items-center justify-center font-mono text-[10px] font-bold">
                  {currentSlide.author.split(' ').map(n => n[0]).join('')}
                </span>
                <span className="text-neutral-400">{currentSlide.author} ({currentSlide.role})</span>
              </div>
              <button 
                onClick={onLaunchDemo}
                className="text-neutral-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-all hover:translate-x-1"
              >
                Open in demo &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Metrics Strip */}
      <section className="border-y border-white/[0.08] bg-[#0B0C0E] py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <p className="text-neutral-500 text-[11px]">STRUCTURE</p>
            <p className="text-white text-sm">Strict ADR Schema</p>
          </div>
          <div className="space-y-1">
            <p className="text-neutral-500 text-[11px]">STATUS LINEAGE</p>
            <p className="text-white text-sm">Superseding Chain</p>
          </div>
          <div className="space-y-1">
            <p className="text-neutral-500 text-[11px]">SEARCH ENGINE</p>
            <p className="text-white text-sm">Sub-10ms Exact Search</p>
          </div>
          <div className="space-y-1">
            <p className="text-neutral-500 text-[11px]">EXPORT FORMAT</p>
            <p className="text-white text-sm">Markdown & JSON</p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-3 mb-12">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">The Knowledge Decay Problem</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            How fast-moving engineering teams lose their reasoning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="card-hover border border-white/[0.08] bg-[#101216] p-5 rounded-lg space-y-2.5 cursor-default">
            <span className="font-mono text-neutral-500 text-[11px]">01 / RE-DEBATING</span>
            <h4 className="font-semibold text-white text-sm">Circular Discussions</h4>
            <p className="text-neutral-400">
              New team members propose tools that were already evaluated and rejected 4 months ago, triggering the same 3-hour Slack argument.
            </p>
          </div>

          <div className="card-hover border border-white/[0.08] bg-[#101216] p-5 rounded-lg space-y-2.5 cursor-default">
            <span className="font-mono text-neutral-500 text-[11px]">02 / BLACK BOXES</span>
            <h4 className="font-semibold text-white text-sm">Untouchable Systems</h4>
            <p className="text-neutral-400">
              Nobody knows why an unusual caching policy or queue design exists. Engineers fear refactoring working code because the trade-offs are lost.
            </p>
          </div>

          <div className="card-hover border border-white/[0.08] bg-[#101216] p-5 rounded-lg space-y-2.5 cursor-default">
            <span className="font-mono text-neutral-500 text-[11px]">03 / WIKI ROT</span>
            <h4 className="font-semibold text-white text-sm">Unstructured Docs</h4>
            <p className="text-neutral-400">
              Notion and Confluence pages don’t track whether a document is still actively enforced, leading to conflicting architecture guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/[0.08]">
        <div className="space-y-3 mb-8">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Workflow Overview</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            How Decision Log fits into your development lifecycle
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 text-xs font-mono">
          <button
            onClick={() => setActiveTab('problem')}
            className={`btn-tactile px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'problem'
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white bg-[#101216]'
            }`}
          >
            1. Capture Rationale
          </button>
          <button
            onClick={() => setActiveTab('solution')}
            className={`btn-tactile px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'solution'
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white bg-[#101216]'
            }`}
          >
            2. Lineage & Superseding
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`btn-tactile px-3.5 py-2 rounded transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white bg-[#101216]'
            }`}
          >
            3. Git & Compliance Export
          </button>
        </div>

        {/* Tab Content Box with Keyframe Animation */}
        <div key={activeTab} className="mt-4 border border-white/[0.08] bg-[#101216] p-6 rounded-lg text-xs leading-relaxed text-neutral-300 min-h-[150px] flex items-center animate-fade-in shadow-lg">
          {activeTab === 'problem' && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white">Record what, why, and what was discarded</h4>
              <p className="text-neutral-400">
                Whenever an RFC, technical PR, or strategy change is approved, write a 60-second ADR. Enforcing the "Alternatives Considered" field stops future engineers from reopening the same topic without new data.
              </p>
            </div>
          )}

          {activeTab === 'solution' && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white">Never delete historical context</h4>
              <p className="text-neutral-400">
                When requirements evolve, mark the existing record as <code className="text-neutral-200 font-mono bg-white/5 px-1 py-0.5 rounded">SUPERSEDED</code> and point to the newer record. This creates an unbroken historical timeline of how the architecture grew.
              </p>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white">Version control & SOC2 audit ready</h4>
              <p className="text-neutral-400">
                Export records as standardized GitHub Markdown ADR files (`docs/adr/0042-postgres-rls.md`) or JSON bundles for compliance auditors with a single click.
              </p>
            </div>
          )}
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
          <div className="card-hover border border-white/[0.08] bg-[#101216] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">01</span>
              <span className="text-white font-semibold font-sans text-sm">What was decided</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">A single declarative sentence establishing team policy.</span>
          </div>

          <div className="card-hover border border-white/[0.08] bg-[#101216] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">02</span>
              <span className="text-white font-semibold font-sans text-sm">Why it was decided</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">The technical, operational, or budgetary constraint.</span>
          </div>

          <div className="card-hover border border-white/[0.08] bg-[#101216] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">03</span>
              <span className="text-white font-semibold font-sans text-sm">Alternatives discarded</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">Options considered and the specific reasons for rejection.</span>
          </div>

          <div className="card-hover border border-white/[0.08] bg-[#101216] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 w-6">04</span>
              <span className="text-white font-semibold font-sans text-sm">Superseding lineage</span>
            </div>
            <span className="text-neutral-400 font-sans text-xs sm:text-right">Never delete old decisions; mark them superseded by the new RFC.</span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
              <tr className="border-b border-white/[0.08] bg-[#111317] text-neutral-400 font-mono text-[11px]">
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
        <div className="border border-white/[0.1] bg-[#101216] p-8 sm:p-12 rounded-xl text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
            Start capturing decisions with zero friction.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            No signup, database, or configuration required. Open the demo, create a decision record, and export standard markdown.
          </p>
          <div className="pt-2">
            <button
              onClick={onLaunchDemo}
              className="btn-tactile px-6 py-3 rounded bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5 hover:scale-105"
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
