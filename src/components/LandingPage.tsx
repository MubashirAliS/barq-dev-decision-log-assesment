import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ChevronRight,
  CodeXml,
  Layers,
  Terminal,
  Database,
  ShieldCheck,
  Cpu,
  Sparkles,
  Server,
  Play,
  RotateCcw,
  Copy,
  Check,
  Menu,
  X
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'decision' | 'eval' | 'adr'>('decision');
  const [copied, setCopied] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll reveal observer hook
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TECH_TAPE = [
    { name: 'PostgreSQL 16', icon: Database },
    { name: 'Row-Level Security', icon: ShieldCheck },
    { name: 'gRPC / Protocol Buffers', icon: Terminal },
    { name: 'Vite + React 19', icon: Layers },
    { name: 'TypeScript 5.8', icon: CodeXml },
    { name: 'AWS & Microservices', icon: Server },
    { name: 'OpenTelemetry', icon: Cpu },
    { name: 'Markdown ADR Engine', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-orange-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* Top Header Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-orange-400 font-mono font-bold text-xs sm:text-sm shadow-md shrink-0">
              D
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">Decision Log</span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 hidden xs:inline-block">
                SYSTEMS ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-neutral-400">
            <a href="#overview" className="hover:text-orange-400 transition-colors">Overview</a>
            <a href="#system" className="hover:text-orange-400 transition-colors">Engine</a>
            <a href="#schema" className="hover:text-orange-400 transition-colors">Schema</a>
            <a href="#comparison" className="hover:text-orange-400 transition-colors">Comparison</a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ADR Engine Active
            </div>

            <button
              onClick={onLaunchDemo}
              className="btn-orange-glow inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-500/20 shrink-0"
            >
              <span>Launch Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileNavOpen && (
          <div className="md:hidden pt-4 pb-2 px-2 space-y-2 border-t border-neutral-800/80 mt-3 animate-fade-down text-xs font-mono">
            <a 
              href="#overview" 
              onClick={() => setMobileNavOpen(false)}
              className="block p-2 rounded bg-neutral-900 text-neutral-200 hover:text-orange-400"
            >
              Overview
            </a>
            <a 
              href="#system" 
              onClick={() => setMobileNavOpen(false)}
              className="block p-2 rounded bg-neutral-900 text-neutral-200 hover:text-orange-400"
            >
              Architecture Engine
            </a>
            <a 
              href="#comparison" 
              onClick={() => setMobileNavOpen(false)}
              className="block p-2 rounded bg-neutral-900 text-neutral-200 hover:text-orange-400"
            >
              System Comparison
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="overview" className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 overflow-hidden border-b border-neutral-900 z-10">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[300px] sm:h-[450px] bg-gradient-to-r from-orange-500/15 via-amber-500/5 to-transparent blur-[120px] sm:blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex-1 flex flex-col justify-between relative z-10">
          
          {/* Top Pill Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-neutral-900 pb-4 animate-fade-up">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-800 max-w-full">
              <span className="text-orange-400 font-bold shrink-0">#</span>
              <span className="truncate">DECISION LOG — THE INSTITUTIONAL MEMORY ENGINE</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-800 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Zero-Config • Instant ADR Export</span>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 reveal-left">
              <div className="space-y-2.5 sm:space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold block">
                  ARCHITECTURE & PRODUCT MOMENTUM
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
                  Decision Records <br />
                  <span className="text-neutral-400">that never rot in Slack.</span>
                </h1>
              </div>

              <p className="max-w-xl text-neutral-300 text-sm sm:text-lg font-normal leading-relaxed">
                When teams scale, original reasoning evaporates. Founders and architects use Decision Log as an immutable registry to capture <em>what was decided</em>, <em>why</em>, and <em>what it supersedes</em>.
              </p>

              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <button
                  onClick={onLaunchDemo}
                  className="btn-orange-glow inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-orange-500/25"
                >
                  <span>Explore Interactive Registry</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-950" />
                </button>

                <a
                  href="#system"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all"
                >
                  <span>System Architecture</span>
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                </a>
              </div>
            </div>

            {/* Right Interactive Code Panel */}
            <div className="lg:col-span-5 reveal-right">
              <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                
                {/* Code Window Header */}
                <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0"></div>
                    <span className="ml-2 text-[11px] sm:text-xs font-mono text-neutral-400 truncate">adr/DEC-042.ts</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="text-neutral-400 hover:text-white text-xs font-mono flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 transition cursor-pointer shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-orange-400" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Sub-tabs */}
                <div className="bg-neutral-900 px-3 py-2 border-b border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto text-[10px] sm:text-[11px] font-mono">
                  <button
                    onClick={() => setActiveCodeTab('decision')}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      activeCodeTab === 'decision'
                        ? 'bg-neutral-800 text-white font-semibold border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    DEC-042 (PostgreSQL RLS)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('eval')}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      activeCodeTab === 'eval'
                        ? 'bg-neutral-800 text-white font-semibold border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    DEC-041 (PWA Transition)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('adr')}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      activeCodeTab === 'adr'
                        ? 'bg-neutral-800 text-white font-semibold border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    DEC-038 (gRPC Migration)
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-4 bg-neutral-950 font-mono text-xs text-neutral-300 overflow-x-auto min-h-[200px] sm:min-h-[220px] max-h-[260px] leading-relaxed">
                  {activeCodeTab === 'decision' && (
                    <pre><code><span className="text-orange-400">export const</span> DEC_042 = &#123;
  code: <span className="text-emerald-300">"DEC-042"</span>,
  status: <span className="text-emerald-400">"ACTIVE"</span>,
  decision: <span className="text-neutral-200">"Standardize on PostgreSQL Row-Level Security"</span>,
  context: <span className="text-neutral-400">"Database-per-tenant ballooned AWS RDS cost 68%"</span>,
  alternativesRejected: [
    &#123; name: <span className="text-rose-400">"DynamoDB per tenant"</span>, reason: <span className="text-neutral-400">"4x monthly cost"</span> &#125;
  ],
  enforcedBy: <span className="text-amber-300">"Elena Rostova (VP Eng)"</span>
&#125;;</code></pre>
                  )}

                  {activeCodeTab === 'eval' && (
                    <pre><code><span className="text-orange-400">export const</span> DEC_041 = &#123;
  code: <span className="text-emerald-300">"DEC-041"</span>,
  status: <span className="text-emerald-400">"ACTIVE"</span>,
  decision: <span className="text-neutral-200">"Sunset Swift/Kotlin in favor of responsive PWA"</span>,
  context: <span className="text-neutral-400">"Dual mobile store maintenance consumed 55% eng"</span>,
  consequences: [
    <span className="text-emerald-300">"Instant zero-blocker continuous deployment"</span>,
    <span className="text-amber-300">"Reallocated 2 mobile headcount to core API"</span>
  ]
&#125;;</code></pre>
                  )}

                  {activeCodeTab === 'adr' && (
                    <pre><code><span className="text-orange-400">export const</span> DEC_038 = &#123;
  code: <span className="text-emerald-300">"DEC-038"</span>,
  status: <span className="text-emerald-400">"ACTIVE"</span>,
  decision: <span className="text-neutral-200">"Migrate inter-service microservices to gRPC/proto"</span>,
  consequences: [
    <span className="text-emerald-300">"p99 RPC latency dropped 84ms -&gt; 11ms"</span>,
    <span className="text-emerald-300">"Compile-time breaking schema prevention"</span>
  ]
&#125;;</code></pre>
                  )}
                </div>

                {/* Status bottom bar */}
                <div className="bg-neutral-950 px-4 py-2.5 border-t border-neutral-800 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Play className="w-3 h-3" /> Immutable Audit Trail
                  </span>
                  <span>100% Type-Safe ADR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom KPI Bar */}
          <div className="pt-6 border-t border-neutral-900 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 font-mono reveal-on-scroll">
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-orange-500/40 transition-colors">
              <div className="text-xl sm:text-3xl font-bold text-white font-mono">0 hrs</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider mt-1">Slack Search Lost</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-orange-500/40 transition-colors">
              <div className="text-xl sm:text-3xl font-bold text-orange-400 font-mono">100%</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider mt-1">SOC2 Audit Ready</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-orange-500/40 transition-colors">
              <div className="text-xl sm:text-3xl font-bold text-white font-mono">4.2x</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider mt-1">Faster Onboarding</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-orange-500/40 transition-colors">
              <div className="text-xl sm:text-3xl font-bold text-emerald-400 font-mono">&lt; 30s</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider mt-1">To Log Binding Decision</div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Technology Tape */}
      <div className="w-full bg-neutral-950 border-y border-neutral-900 py-3.5 overflow-hidden relative z-20">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee space-x-4 sm:space-x-6 flex items-center">
          {[...TECH_TAPE, ...TECH_TAPE, ...TECH_TAPE].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-900/60 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wider hover:border-orange-500/50 hover:text-white transition-colors shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                <span>{tech.name}</span>
                <span className="w-1 h-1 rounded-full bg-orange-500/50 ml-1"></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section id="system" className="py-20 sm:py-24 bg-neutral-950 text-white relative z-10 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-10 sm:mb-12 reveal-on-scroll">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                SYSTEMS ARCHITECTURE & CONTROL
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 font-medium">(01)</span>
          </div>

          <div className="max-w-3xl space-y-4 mb-12 sm:mb-16 reveal-on-scroll">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Designed for technical teams who value precision and momentum.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Every major architectural choice has consequences. Capture them cleanly so future engineers don't rewrite working code out of missing context.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="orange-card-hover relative flex flex-col justify-between min-h-[300px] sm:min-h-[320px] p-6 sm:p-7 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 reveal-on-scroll">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-neutral-500 font-bold">01</span>
                <span className="rounded-full border border-neutral-700/80 bg-neutral-950/80 px-3 py-1 text-[10px] font-mono text-orange-400 uppercase">
                  Declarative
                </span>
              </div>
              <div className="my-5 sm:my-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-orange-400 mb-4 shadow-md">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Binding Decision Statement</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  A single declarative commitment. No ambiguity or vague intentions—just the explicit standard agreed upon by leadership.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                Guaranteed clarity across teams
              </div>
            </div>

            <div className="orange-card-hover relative flex flex-col justify-between min-h-[300px] sm:min-h-[320px] p-6 sm:p-7 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 reveal-on-scroll">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-neutral-500 font-bold">02</span>
                <span className="rounded-full border border-neutral-700/80 bg-neutral-950/80 px-3 py-1 text-[10px] font-mono text-orange-400 uppercase">
                  Anti-Redebate
                </span>
              </div>
              <div className="my-5 sm:my-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-orange-400 mb-4 shadow-md">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Rejected Alternatives Log</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Documents the runner-up solutions and the exact reasons they were discarded, permanently ending recurring circular debates.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                Saves hundreds of meeting hours
              </div>
            </div>

            <div className="orange-card-hover relative flex flex-col justify-between min-h-[300px] sm:min-h-[320px] p-6 sm:p-7 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 reveal-on-scroll">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-neutral-500 font-bold">03</span>
                <span className="rounded-full border border-neutral-700/80 bg-neutral-950/80 px-3 py-1 text-[10px] font-mono text-orange-400 uppercase">
                  Lineage DAG
                </span>
              </div>
              <div className="my-5 sm:my-6 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-orange-400 mb-4 shadow-md">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Superseded Lineage Link</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Decisions aren’t wiped when requirements change. They are marked superseded and link directly to the replacing RFC.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                Full chronological history
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section id="comparison" className="py-20 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8 reveal-on-scroll">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 font-semibold">
                SYSTEM COMPARISON
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 font-medium">(02)</span>
          </div>

          <div className="overflow-x-auto border border-neutral-800 rounded-xl bg-neutral-900/40">
            <table className="w-full text-left text-xs font-sans min-w-[550px]">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-400 font-mono text-[11px]">
                  <th className="p-4">CAPABILITY</th>
                  <th className="p-4">SLACK / DISCORD</th>
                  <th className="p-4">NOTION / CONFLUENCE</th>
                  <th className="p-4 text-orange-400 bg-orange-500/5">DECISION LOG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                <tr>
                  <td className="p-4 font-medium text-white">Status Tracking (Active/Superseded)</td>
                  <td className="p-4 text-neutral-500">None</td>
                  <td className="p-4 text-neutral-500">Manual tags (often rot)</td>
                  <td className="p-4 text-emerald-400 font-mono bg-orange-500/5">First-class state engine</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Rejected Alternatives Log</td>
                  <td className="p-4 text-neutral-500">Lost in replies</td>
                  <td className="p-4 text-neutral-500">Rarely documented</td>
                  <td className="p-4 text-orange-400 font-mono bg-orange-500/5">Mandatory structured field</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Superseded Lineage Link</td>
                  <td className="p-4 text-neutral-500">Impossible</td>
                  <td className="p-4 text-neutral-500">Broken bookmarks</td>
                  <td className="p-4 text-white font-mono bg-orange-500/5">Bi-directional DAG pointers</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Audit Trail & Compliance Export</td>
                  <td className="p-4 text-neutral-500">None</td>
                  <td className="p-4 text-neutral-500">Manual copy paste</td>
                  <td className="p-4 text-white font-mono bg-orange-500/5">1-Click Markdown & JSON</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Footer Card */}
      <section className="py-16 sm:py-20 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="p-6 sm:p-14 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center relative overflow-hidden space-y-4 sm:space-y-5 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero friction decision preservation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Start preserving architectural wisdom now.
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
              No authentication or database required. Open the demo, create a decision record, filter your stack, and export.
            </p>

            <div className="pt-2">
              <button
                onClick={onLaunchDemo}
                className="btn-orange-glow inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-xl shadow-orange-500/30"
              >
                <span>Launch Interactive Registry</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-950" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 sm:py-8 px-4 sm:px-6 text-xs font-mono text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-orange-500 text-neutral-950 flex items-center justify-center font-bold text-[10px]">
              D
            </div>
            <span className="text-neutral-300 font-bold">DECISION LOG</span>
            <span>— Architecture Registry</span>
          </div>
          <p className="text-center sm:text-right">&copy; {new Date().getFullYear()} Decision Log. Systems Architecture & Records.</p>
        </div>
      </footer>
    </div>
  );
};
