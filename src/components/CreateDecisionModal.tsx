import React, { useState } from 'react';
import { 
  X, 
  Trash2,
  CheckCircle2
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
  const [tags, setTags] = useState<string[]>(['Core', 'Scale']);

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
        role: deciderRole.trim() || 'Principal Engineer'
      },
      context: context.trim() || 'Documented during technical architecture review.',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl my-auto bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-modal">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-800 bg-neutral-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-mono text-xs font-bold shrink-0">
              +
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">Record Architecture Decision</h2>
              <p className="text-[10px] sm:text-xs text-neutral-400 hidden xs:block">Capture what was decided, why, and trade-offs considered.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1 text-xs">
          <div>
            <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              Decision Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Adopt OpenTelemetry across backend services"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DecisionCategory)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500 text-xs"
              >
                <option value="Architecture">Architecture</option>
                <option value="Product">Product</option>
                <option value="Engineering">Engineering</option>
                <option value="Security">Security</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DecisionStatus)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500 text-xs"
              >
                <option value="active">Active (Enforced)</option>
                <option value="proposed">Proposed (Review)</option>
                <option value="superseded">Superseded</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Impact Rating
              </label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-orange-500 text-xs"
              >
                <option value="High">High (Breaking/Core)</option>
                <option value="Medium">Medium (Moderate)</option>
                <option value="Low">Low (Isolated)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Decider / Author
              </label>
              <input
                type="text"
                value={deciderName}
                onChange={(e) => setDeciderName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Role / Team
              </label>
              <input
                type="text"
                value={deciderRole}
                onChange={(e) => setDeciderRole(e.target.value)}
                placeholder="e.g. Principal Architect"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              Context & Business Problem *
            </label>
            <textarea
              rows={2}
              required
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Why was this decision required? What constraints triggered it?"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 resize-none font-sans text-xs"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              Exact Decision (What was chosen) *
            </label>
            <textarea
              rows={2}
              required
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="Unambiguous statement of the technical standard chosen."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 resize-none font-sans text-xs"
            />
          </div>

          {/* Supersedes Field */}
          <div>
            <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              Supersedes Previous Decision (Optional)
            </label>
            <input
              type="text"
              value={supersedes}
              onChange={(e) => setSupersedes(e.target.value)}
              placeholder="e.g. DEC-012"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 font-mono text-xs"
            />
          </div>

          {/* Consequences */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                Key Trade-offs & Consequences
              </label>
              <button
                type="button"
                onClick={handleAddConsequence}
                className="text-orange-400 hover:text-orange-300 font-mono text-[11px] flex items-center gap-1 font-semibold cursor-pointer"
              >
                + Add item
              </button>
            </div>
            <div className="space-y-1.5">
              {consequences.map((c, idx) => (
                <div key={idx} className="flex gap-1.5">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => handleConsequenceChange(idx, e.target.value)}
                    placeholder={`Trade-off #${idx + 1}`}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 text-xs"
                  />
                  {consequences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveConsequence(idx)}
                      className="text-neutral-500 hover:text-rose-400 px-1 cursor-pointer"
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
              <label className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
                Alternatives Evaluated & Reasons Rejected
              </label>
              <button
                type="button"
                onClick={handleAddAlternative}
                className="text-orange-400 hover:text-orange-300 font-mono text-[11px] flex items-center gap-1 font-semibold cursor-pointer"
              >
                + Add alternative
              </button>
            </div>
            <div className="space-y-2">
              {alternatives.map((alt, idx) => (
                <div key={idx} className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={alt.option}
                      onChange={(e) => handleAlternativeChange(idx, 'option', e.target.value)}
                      placeholder="Option Name (e.g. Apache Kafka)"
                      className="w-full bg-transparent border-b border-neutral-800 pb-1 text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 font-medium text-xs"
                    />
                    {alternatives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAlternative(idx)}
                        className="text-neutral-500 hover:text-rose-400 text-xs pl-2 cursor-pointer shrink-0"
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
            <label className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              Tags (Press Enter)
            </label>
            <div className="flex flex-wrap items-center gap-1 p-1.5 bg-neutral-950 border border-neutral-800 rounded-lg">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
                  #{tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-400 cursor-pointer">
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
                className="bg-transparent border-none text-[11px] text-white focus:outline-none flex-1 min-w-[80px]"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-end gap-2 text-xs shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn-tactile px-3 py-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-orange-glow px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-neutral-950 font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Commit Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};
