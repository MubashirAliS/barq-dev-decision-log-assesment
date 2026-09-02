import React from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  Copy, 
  Check
} from 'lucide-react';
import type { DecisionRecord, DecisionStatus } from '../types/decision';

interface DecisionDrawerProps {
  decision: DecisionRecord | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: DecisionStatus) => void;
  allDecisions: DecisionRecord[];
  onSelectDecision: (dec: DecisionRecord) => void;
}

export const DecisionDrawer: React.FC<DecisionDrawerProps> = ({
  decision,
  onClose,
  onUpdateStatus,
  allDecisions,
  onSelectDecision
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!decision) return null;

  const handleCopyMarkdown = () => {
    const md = `
# [${decision.code}] ${decision.title}

**Status:** ${decision.status.toUpperCase()}
**Date:** ${decision.date}
**Decider:** ${decision.decider.name} (${decision.decider.role})
**Category:** ${decision.category} | **Impact:** ${decision.impact}
**Tags:** ${decision.tags.map(t => `#${t}`).join(', ')}

## Context & Problem
${decision.context}

## Decision
${decision.decision}

## Consequences & Trade-offs
${decision.consequences.map(c => `- ${c}`).join('\n')}

## Alternatives Considered
${decision.alternativesConsidered.map(a => `- **${a.option}**: ${a.whyRejected}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: DecisionStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active & Enforced
          </span>
        );
      case 'superseded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <RotateCcw className="w-3 h-3 text-slate-400" />
            Superseded
          </span>
        );
      case 'proposed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Under Proposed Review
          </span>
        );
      case 'deprecated':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Deprecated
          </span>
        );
    }
  };

  const supersededTarget = decision.supersededBy 
    ? allDecisions.find(d => d.code === decision.supersededBy) 
    : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Top Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-1 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
              {decision.code}
            </span>
            {getStatusBadge(decision.status)}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              title="Copy as Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied ADR' : 'Export MD'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Superseded Notice */}
          {decision.status === 'superseded' && decision.supersededBy && (
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/30 text-xs text-amber-200 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">This decision has been superseded.</span>
                  <p className="text-amber-200/80 mt-0.5">
                    Subsequent requirements led to a revised architecture in record {decision.supersededBy}.
                  </p>
                </div>
              </div>
              {supersededTarget && (
                <button
                  onClick={() => onSelectDecision(supersededTarget)}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded font-medium border border-amber-500/30 transition shrink-0"
                >
                  View {decision.supersededBy} &rarr;
                </button>
              )}
            </div>
          )}

          {/* Title & Metadata Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-amber-400">
                {decision.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                {new Date(decision.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-slate-600">•</span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                decision.impact === 'High' 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                  : decision.impact === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {decision.impact} Impact
              </span>
            </div>
            <h1 className="text-xl font-bold text-white leading-snug tracking-tight">
              {decision.title}
            </h1>
            
            {/* Decider */}
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-slate-950">
                {decision.decider.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{decision.decider.name}</p>
                <p className="text-[11px] text-slate-400">{decision.decider.role}</p>
              </div>
            </div>
          </div>

          {/* Section: Context & Why */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              Context & Business Problem
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-slate-300 leading-relaxed text-xs sm:text-sm">
              {decision.context}
            </div>
          </div>

          {/* Section: The Exact Decision */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              What Was Decided
            </h3>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-100 font-medium leading-relaxed text-xs sm:text-sm">
              {decision.decision}
            </div>
          </div>

          {/* Section: Consequences & Trade-offs */}
          {decision.consequences.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                Consequences & Ramifications
              </h3>
              <ul className="space-y-2">
                {decision.consequences.map((c, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/30 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Alternatives Considered */}
          {decision.alternativesConsidered.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                Alternatives Evaluated & Discarded
              </h3>
              <div className="space-y-2">
                {decision.alternativesConsidered.map((alt, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <span className="text-rose-500 font-mono">✕</span>
                      {alt.option}
                    </div>
                    <p className="text-slate-400 mt-1 pl-4 border-l border-slate-800 text-[11px] leading-relaxed">
                      <span className="text-slate-500 font-medium">Why rejected:</span> {alt.whyRejected}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {decision.tags.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {decision.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-mono px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded border border-slate-700/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Status State Switcher Bottom Bar */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Update Status:</span>
          <div className="flex items-center gap-1.5">
            {(['active', 'proposed', 'superseded', 'deprecated'] as DecisionStatus[]).map(st => (
              <button
                key={st}
                onClick={() => onUpdateStatus(decision.id, st)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  decision.status === st
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
