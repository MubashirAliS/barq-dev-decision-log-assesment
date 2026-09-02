import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Lock, 
  RotateCcw,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo }) => {
  return (
    <div className="min-h-screen bg-[#07080B] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden font-sans">
      {/* Dynamic Background Glow & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl opacity-50" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-30 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold font-mono shadow-lg shadow-amber-500/20">
            D
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white">Decision Log</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-slate-700/60">
              v2.4
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#why" className="hover:text-white transition">The Problem</a>
          <a href="#architecture" className="hover:text-white transition">Architecture</a>
          <a href="#comparison" className="hover:text-white transition">Comparison</a>
          <a href="#testimonials" className="hover:text-white transition">Leadership</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchDemo}
            className="group px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Try Interactive Demo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
        {/* Momentum Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Stop re-debating solved engineering problems.</span>
          <span className="text-amber-400 font-semibold cursor-pointer hover:underline" onClick={onLaunchDemo}>Explore Live Demo &rarr;</span>
        </div>

        {/* Main Value Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          The institutional memory engine for <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">high-velocity</span> teams.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Decisions made in Slack threads and 1-on-1s vanish in weeks. Decision Log gives founders, CTOs, and staff architects an immutable record of <em>what was decided</em>, <em>why</em>, and <em>what it supersedes</em>.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onLaunchDemo}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Launch Live Interactive Demo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <a
            href="#architecture"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Read Architecture Manifesto</span>
          </a>
        </div>

        {/* Floating Interactive Decision Card Preview */}
        <div className="mt-16 relative mx-auto max-w-3xl text-left">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-indigo-500/20 rounded-2xl blur-lg opacity-70" />
          
          <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  DEC-042
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active & Enforced
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">August 14, 2026</span>
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Standardize on PostgreSQL with Row-Level Security for multi-tenant data isolation
              </h3>
              
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-xs text-slate-300">
                <p className="text-amber-400/90 font-semibold mb-1 font-mono text-[11px] uppercase tracking-wider">
                  The Core Rationale:
                </p>
                Database-per-tenant ballooned AWS RDS monthly costs by 68% and caused severe connection-pooling bottlenecks. RLS delivers SOC2-grade tenant isolation with zero extra infrastructure overhead.
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold flex items-center justify-center">
                    ER
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Elena Rostova (VP of Engineering)</span>
                </div>
                <button
                  onClick={onLaunchDemo}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  Interact with this record &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Stats Banner */}
      <section className="relative z-10 border-y border-slate-800/60 bg-slate-950/50 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">0 hrs</p>
            <p className="text-xs text-slate-400 mt-1">Lost in Slack search archeology</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">100%</p>
            <p className="text-xs text-slate-400 mt-1">Audit trail for compliance & SOC2</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">4.2x</p>
            <p className="text-xs text-slate-400 mt-1">Faster new engineer onboarding</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">&lt; 30s</p>
            <p className="text-xs text-slate-400 mt-1">To record a binding team decision</p>
          </div>
        </div>
      </section>

      {/* Why Existing Tools Fail */}
      <section id="why" className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
            The Knowledge Decay Dilemma
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why brilliant decisions get unmade 6 months later.
          </p>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            When teams grow quickly, context dissipates. New hires rewrite working subsystems because nobody documented why the original trade-offs were made.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">The Perpetual Re-debate</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every quarter, a well-meaning engineer suggests GraphQL, MongoDB, or Kubernetes. Without an immutable log of past evaluations, your team re-argues the same choices forever.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">The Tribal Knowledge Trap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When senior engineers leave, the "why" leaves with them. Legacy codebases become untouchable black boxes where developers fear refactoring anything.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">The Notion Graveyard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Doc wikis become unsearchable clutter. Without strict schema (decision, context, status, superseding chain), documentation rots on day two.
            </p>
          </div>
        </div>
      </section>

      {/* The Decision Log Anatomy / Architecture */}
      <section id="architecture" className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            The Decision Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Structure that enforces clarity without friction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Unambiguous Decision Statement</h4>
                <p className="text-xs text-slate-400 mt-1">
                  A single declarative sentence stating what the organization is committed to doing.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Explicit Alternatives & Why Discarded</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Document the runner-up options and why they were rejected. This prevents future circular debates.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Explicit Superseding Lineage</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Decisions aren't deleted when requirements shift—they are marked <em>superseded</em> and linked to the new decision record.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                04
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Decider & Stakeholder Accountability</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Clear ownership eliminates diffuse responsibility and builds organizational momentum.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-amber-400">Live Decision Stream</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Sync Active</span>
            </div>
            
            {/* Mock Timeline UI */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-amber-400 font-bold">DEC-041</span>
                  <span>Jul 28, 2026</span>
                </div>
                <p className="text-slate-200 mt-1 font-sans text-xs">
                  Drop native mobile apps in favor of PWA.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">Active</span>
                  <span className="text-[10px] text-slate-500">Decider: Marcus Chen (Product)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/40 opacity-70">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="line-through">DEC-029</span>
                  <span>Apr 02, 2026</span>
                </div>
                <p className="text-slate-400 mt-1 font-sans text-xs line-through">
                  Monolithic Next.js frontend for marketing and dashboard.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">Superseded by DEC-045</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLaunchDemo}
              className="w-full mt-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Interactive Decision Registry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-3">
            Why Settle for Docs?
          </h2>
          <p className="text-3xl font-bold text-white tracking-tight">
            Decision Log vs. Generic Wikis & Slack
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                <th className="py-3 px-4">Capability</th>
                <th className="py-3 px-4 text-rose-400/90">Slack / Discord</th>
                <th className="py-3 px-4 text-slate-400">Notion / Google Docs</th>
                <th className="py-3 px-4 text-amber-400 bg-amber-500/5 rounded-t-lg">Decision Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Status Tracking (Active/Superseded)</td>
                <td className="py-4 px-4 text-slate-500">❌ Impossible</td>
                <td className="py-4 px-4 text-slate-500">⚠️ Manual freeform tags</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-amber-500/5">✅ First-class state engine</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Alternatives & Rejection Rationale</td>
                <td className="py-4 px-4 text-slate-500">❌ Buried in thread replies</td>
                <td className="py-4 px-4 text-slate-500">⚠️ Usually skipped</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-amber-500/5">✅ Mandatory structured ADR schema</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Audit Trail & Compliance Export</td>
                <td className="py-4 px-4 text-slate-500">❌ None</td>
                <td className="py-4 px-4 text-slate-500">⚠️ Messy PDF printouts</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-amber-500/5">✅ 1-Click Markdown & JSON ADR Export</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-white">Superseded Lineage Linking</td>
                <td className="py-4 px-4 text-slate-500">❌ Broken URL links</td>
                <td className="py-4 px-4 text-slate-500">⚠️ Out of sync pages</td>
                <td className="py-4 px-4 font-semibold text-emerald-400 bg-amber-500/5">✅ Automated bi-directional DAG links</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Leadership & Founder Testimonials */}
      <section id="testimonials" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">
            Trusted by High-Velocity Engineering Teams
          </h2>
          <p className="text-3xl font-bold text-white tracking-tight">
            What leaders say about preserving context
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "When we scaled from 15 to 80 engineers, our Slack became a chaotic mess of 'why did we pick DynamoDB over Postgres?' Decision Log saved us hundreds of engineering hours in recurring debates."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-xs">
                SL
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Sarah Lindqvist</p>
                <p className="text-[10px] text-slate-500">CTO @ HyperScale Data</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "The ability to tag a decision as 'Superseded' and point directly to the newer RFC is pure gold. It turned our architecture documentation into a living history."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                DV
              </div>
              <div>
                <p className="text-xs font-semibold text-white">David Vance</p>
                <p className="text-[10px] text-slate-500">Principal Architect @ FinVelo</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "SOC2 auditors loved our exportable ADR records. What used to take a 3-week documentation sprint was done with a single JSON export."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-slate-950 text-xs">
                ER
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Elena Rostova</p>
                <p className="text-[10px] text-slate-500">VP of Engineering @ NexaCloud</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-amber-500/30 text-center relative overflow-hidden bg-gradient-to-b from-amber-500/10 to-transparent">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop losing your team's hard-won architectural wisdom.
          </h2>
          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Try the zero-friction interactive demo now. Create records, review trade-offs, toggle status, and export in seconds.
          </p>
          <div className="mt-8">
            <button
              onClick={onLaunchDemo}
              className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch Interactive Demo Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950 py-10 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-400 text-slate-950 font-mono font-bold flex items-center justify-center text-[10px]">
              D
            </div>
            <span className="font-semibold text-slate-300">Decision Log</span>
            <span>— The Immutable Architecture Registry</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Decision Log. Built for founders, architects, and engineering leaders.</p>
        </div>
      </footer>
    </div>
  );
};
