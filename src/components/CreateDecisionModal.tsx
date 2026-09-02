import React, { useState } from 'react';
import { 
  X, 
  Trash2
} from 'lucide-react';
import type { DecisionRecord, DecisionCategory, DecisionStatus } from '../types/decision';

interface CreateDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (decision: DecisionRecord) => void;
  existingDecisions: DecisionRecord[];
}

export const CreateDecisionModal: React.FC<CreateDecisionModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  existingDecisions
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DecisionCategory>('Architecture');
  const [status, setStatus] = useState<DecisionStatus>('active');
  const [deciderName, setDeciderName] = useState('');
  const [deciderRole, setDeciderRole] = useState('');
  const [context, setContext] = useState('');
  const [decision, setDecision] = useState('');
  const [impact, setImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [supersedes, setSupersedes] = useState('');
  
  const [consequences, setConsequences] = useState<string[]>(['']);
  const [alternatives, setAlternatives] = useState<{ option: string; whyRejected: string }[]>([
    { option: '', whyRejected: '' }
  ]);
  
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Core']);

  if (!isOpen) return null;

  const handleAddConsequence = () => setConsequences([...consequences, '']);
  const handleRemoveConsequence = (index: number) => setConsequences(consequences.filter((_, i) => i !== index));
  const handleConsequenceChange = (index: number, val: string) => {
    const updated = [...consequences];
    updated[index] = val;
    setConsequences(updated);
  };

  const handleAddAlternative = () => setAlternatives([...alternatives, { option: '', whyRejected: '' }]);
  const handleRemoveAlternative = (index: number) => setAlternatives(alternatives.filter((_, i) => i !== index));
  const handleAlternativeChange = (index: number, field: 'option' | 'whyRejected', val: string) => {
    const updated = [...alternatives];
    updated[index][field] = val;
    setAlternatives(updated);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !decision.trim()) return;

    const nextNum = existingDecisions.length + 43;
    const code = `DEC-0${nextNum}`;

    const newRecord: DecisionRecord = {
      id: `dec-${Date.now()}`,
      code,
      title: title.trim(),
      status,
      category,
      date: new Date().toISOString().split('T')[0],
      decider: {
        name: deciderName.trim() || 'Logged User',
        role: deciderRole.trim() || 'Lead Engineer'
      },
      context: context.trim() || 'Documented during technical consensus review.',
      decision: decision.trim(),
      consequences: consequences.filter(c => c.trim().length > 0),
      alternativesConsidered: alternatives.filter(a => a.option.trim().length > 0),
      impact,
      supersedes: supersedes || undefined,
      tags: tags.length > 0 ? tags : ['General']
    };

    onCreate(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-2xl my-8 bg-[#121316] border border-white/[0.12] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#141518]">
          <div>
            <h2 className="text-base font-semibold text-white">Record Architectural Decision</h2>
            <p className="text-xs text-neutral-400">Establish consensus, rationale, and consequences.</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1 text-xs">
          <div>
            <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
              Decision Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Adopt OpenTelemetry across backend services for distributed tracing"
              className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DecisionCategory)}
                className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-white/30"
              >
                <option value="Architecture">Architecture</option>
                <option value="Product">Product</option>
                <option value="Engineering">Engineering</option>
                <option value="Security">Security</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DecisionStatus)}
                className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-white/30"
              >
                <option value="active">Active (Enforced)</option>
                <option value="proposed">Proposed (Review)</option>
                <option value="superseded">Superseded</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
                System Impact
              </label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-white/30"
              >
                <option value="High">High (Breaking)</option>
                <option value="Medium">Medium (Moderate)</option>
                <option value="Low">Low (Isolated)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
                Decider / Author
              </label>
              <input
                type="text"
                value={deciderName}
                onChange={(e) => setDeciderName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-3 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
                Role / Team
              </label>
              <input
                type="text"
                value={deciderRole}
                onChange={(e) => setDeciderRole(e.target.value)}
                placeholder="e.g. Principal Architect"
                className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-3 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
              Context & Business Problem *
            </label>
            <textarea
              rows={2}
              required
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Why was this decision required? What constraints triggered it?"
              className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 resize-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
              Exact Decision (What was chosen) *
            </label>
            <textarea
              rows={2}
              required
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="Unambiguous statement of the technical standard chosen."
              className="w-full bg-[#0C0D0E] border border-white/[0.1] rounded px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 resize-none"
            />
          </div>

          {/* Consequences */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-[11px] uppercase text-neutral-400">
                Key Trade-offs / Consequences
              </label>
              <button
                type="button"
                onClick={handleAddConsequence}
                className="text-neutral-300 hover:text-white font-mono text-[10px]"
              >
                + Add item
              </button>
            </div>
            <div className="space-y-1.5">
              {consequences.map((c, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => handleConsequenceChange(idx, e.target.value)}
                    placeholder={`Trade-off #${idx + 1}`}
                    className="flex-1 bg-[#0C0D0E] border border-white/[0.08] rounded px-2.5 py-1 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                  />
                  {consequences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveConsequence(idx)}
                      className="text-neutral-500 hover:text-rose-400 px-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-[11px] uppercase text-neutral-400">
                Alternatives Evaluated & Why Discarded
              </label>
              <button
                type="button"
                onClick={handleAddAlternative}
                className="text-neutral-300 hover:text-white font-mono text-[10px]"
              >
                + Add alternative
              </button>
            </div>
            <div className="space-y-2">
              {alternatives.map((alt, idx) => (
                <div key={idx} className="p-2.5 bg-[#0C0D0E] rounded border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={alt.option}
                      onChange={(e) => handleAlternativeChange(idx, 'option', e.target.value)}
                      placeholder="Option Name (e.g. Apache Kafka)"
                      className="w-full bg-transparent border-b border-white/[0.08] pb-1 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                    />
                    {alternatives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAlternative(idx)}
                        className="text-neutral-500 hover:text-rose-400 text-[10px] pl-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={alt.whyRejected}
                    onChange={(e) => handleAlternativeChange(idx, 'whyRejected', e.target.value)}
                    placeholder="Why rejected? (e.g. Operational overhead exceeded value)"
                    className="w-full bg-transparent text-neutral-300 placeholder-neutral-600 focus:outline-none text-[11px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-mono text-[11px] uppercase text-neutral-400 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#0C0D0E] border border-white/[0.08] rounded">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                  #{tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-400">
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="tag + Enter..."
                className="bg-transparent border-none text-xs text-white focus:outline-none flex-1 min-w-[100px]"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#141518] flex items-center justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-neutral-400 hover:text-white rounded transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded bg-white text-black font-semibold hover:bg-neutral-200 transition"
          >
            Commit Record
          </button>
        </div>
      </div>
    </div>
  );
};
