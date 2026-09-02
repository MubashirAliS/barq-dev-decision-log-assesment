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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-sans">
      <div className="w-full max-w-xl bg-[#121316] border-l border-white/[0.1] h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#141518]">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-semibold px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white">
              {decision.code}
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
              decision.status === 'active'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : decision.status === 'superseded'
                ? 'text-neutral-400 bg-white/5 border border-white/10'
                : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
            }`}>
              {decision.status.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded bg-[#0C0D0E] border border-white/[0.08] transition cursor-pointer font-mono"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy MD'}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-300">
          {/* Superseded banner */}
          {decision.status === 'superseded' && decision.supersededBy && (
            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-amber-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Superseded by newer decision {decision.supersededBy}.</span>
              </div>
              {supersededTarget && (
                <button
                  onClick={() => onSelectDecision(supersededTarget)}
                  className="font-mono underline text-amber-300 hover:text-white"
                >
                  View &rarr;
                </button>
              )}
            </div>
          )}

          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 mb-1.5">
              <span>{decision.category}</span>
              <span>•</span>
              <span>{decision.date}</span>
              <span>•</span>
              <span>{decision.impact} Impact</span>
            </div>
            <h1 className="text-lg font-semibold text-white leading-snug">
              {decision.title}
            </h1>
            
            <div className="mt-3 flex items-center gap-2 font-mono text-xs text-neutral-400 bg-[#0C0D0E] p-2.5 rounded border border-white/[0.04]">
              <span className="text-white font-medium">{decision.decider.name}</span>
              <span className="text-neutral-600">/</span>
              <span>{decision.decider.role}</span>
            </div>
          </div>

          {/* Context */}
          <div className="space-y-1.5">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Problem & Context</h4>
            <div className="p-3.5 rounded bg-[#0C0D0E] border border-white/[0.06] text-neutral-300 leading-relaxed font-sans">
              {decision.context}
            </div>
          </div>

          {/* Exact Decision */}
          <div className="space-y-1.5">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Decision Statement</h4>
            <div className="p-3.5 rounded bg-white/[0.03] border border-white/[0.1] text-white font-medium leading-relaxed font-sans">
              {decision.decision}
            </div>
          </div>

          {/* Consequences */}
          {decision.consequences.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Trade-offs & Consequences</h4>
              <ul className="space-y-1.5 font-sans">
                {decision.consequences.map((c, i) => (
                  <li key={i} className="p-2.5 rounded bg-[#0C0D0E] border border-white/[0.04] text-neutral-300 flex items-start gap-2">
                    <span className="text-neutral-500 font-mono mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternatives */}
          {decision.alternativesConsidered.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Alternatives Discarded</h4>
              <div className="space-y-1.5 font-sans">
                {decision.alternativesConsidered.map((alt, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#0C0D0E] border border-white/[0.04]">
                    <div className="font-medium text-neutral-200">{alt.option}</div>
                    <div className="text-neutral-400 mt-0.5 text-[11px]"><span className="text-neutral-500 font-mono">Why rejected:</span> {alt.whyRejected}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {decision.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2 font-mono text-[10px]">
              {decision.tags.map(t => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-[#0C0D0E] border border-white/[0.06] text-neutral-400">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Status Bar */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#141518] flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">Set Status:</span>
          <div className="flex items-center gap-1">
            {(['active', 'proposed', 'superseded', 'deprecated'] as DecisionStatus[]).map(st => (
              <button
                key={st}
                onClick={() => onUpdateStatus(decision.id, st)}
                className={`px-2 py-0.5 rounded text-[10px] uppercase transition cursor-pointer ${
                  decision.status === st
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white bg-white/5'
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
