import React from 'react';
import { 
  X, 
  Copy, 
  Check,
  RotateCcw
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

- **Status:** ${decision.status.toUpperCase()}
- **Date:** ${decision.date}
- **Author:** ${decision.decider.name} (${decision.decider.role})
- **Category:** ${decision.category}
- **Impact:** ${decision.impact}

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

  const supersededTarget = decision.supersededBy 
    ? allDecisions.find(d => d.code === decision.supersededBy) 
    : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="w-full sm:max-w-xl bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl overflow-hidden animate-drawer">
        
        {/* Header with compact responsive layout */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 border-b border-neutral-800 bg-neutral-950 gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="font-bold px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-orange-400 text-xs font-mono shrink-0">
              {decision.code}
            </span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
              decision.status === 'active'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : decision.status === 'superseded'
                ? 'text-neutral-400 bg-neutral-800 border border-neutral-700'
                : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
            }`}>
              {decision.status.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyMarkdown}
              className="btn-tactile inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 transition cursor-pointer font-mono whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-orange-400" />}
              <span>{copied ? 'Copied' : 'Export MD'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 text-xs text-neutral-300">
          
          {/* Superseded banner */}
          {decision.status === 'superseded' && decision.supersededBy && (
            <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-500/30 text-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fade-down text-xs">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Superseded by newer record {decision.supersededBy}.</span>
              </div>
              {supersededTarget && (
                <button
                  onClick={() => onSelectDecision(supersededTarget)}
                  className="font-mono underline text-orange-300 hover:text-white shrink-0 self-start sm:self-auto"
                >
                  View Record &rarr;
                </button>
              )}
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-neutral-400">
              <span className="text-orange-400 font-semibold">{decision.category}</span>
              <span>•</span>
              <span>{decision.date}</span>
              <span>•</span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">{decision.impact} Impact</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {decision.title}
            </h1>
            
            <div className="mt-3 flex items-center gap-2.5 font-mono text-xs text-neutral-400 bg-neutral-950 p-2.5 sm:p-3 rounded-xl border border-neutral-800">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-300 flex items-center justify-center font-bold text-xs shrink-0">
                {decision.decider.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="overflow-hidden">
                <p className="text-neutral-200 font-semibold truncate">{decision.decider.name}</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 truncate">{decision.decider.role}</p>
              </div>
            </div>
          </div>

          {/* Context */}
          <div className="space-y-1">
            <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
              Context & Business Driver
            </h4>
            <div className="p-3 sm:p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 leading-relaxed font-sans text-xs">
              {decision.context}
            </div>
          </div>

          {/* Exact Decision */}
          <div className="space-y-1">
            <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Decision Statement
            </h4>
            <div className="p-3 sm:p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-neutral-100 font-medium leading-relaxed font-sans text-xs">
              {decision.decision}
            </div>
          </div>

          {/* Consequences */}
          {decision.consequences.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                Trade-offs & Ramifications
              </h4>
              <ul className="space-y-1.5 font-sans">
                {decision.consequences.map((c, i) => (
                  <li key={i} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-start gap-2 text-xs">
                    <span className="text-orange-400 font-mono mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternatives */}
          {decision.alternativesConsidered.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                Alternatives Considered & Reasons Rejected
              </h4>
              <div className="space-y-1.5 font-sans">
                {decision.alternativesConsidered.map((alt, i) => (
                  <div key={i} className="p-2.5 sm:p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <span className="text-rose-500 font-mono">✕</span>
                      {alt.option}
                    </div>
                    <div className="text-neutral-400 mt-1 pl-3 border-l border-neutral-800 text-[11px] leading-relaxed">
                      <span className="text-neutral-500 font-mono">Why rejected:</span> {alt.whyRejected}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {decision.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
              {decision.tags.map(t => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Status Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono shrink-0">
          <span className="text-neutral-400 text-[10px] sm:text-[11px]">Set Status:</span>
          <div className="flex items-center gap-1 overflow-x-auto">
            {(['active', 'proposed', 'superseded', 'deprecated'] as DecisionStatus[]).map(st => (
              <button
                key={st}
                onClick={() => onUpdateStatus(decision.id, st)}
                className={`btn-tactile px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] uppercase transition cursor-pointer shrink-0 ${
                  decision.status === st
                    ? 'bg-orange-500 text-neutral-950 font-bold shadow-md shadow-orange-500/20'
                    : 'text-neutral-400 hover:text-white bg-neutral-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
