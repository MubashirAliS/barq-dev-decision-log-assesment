import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2,
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
  
  // Consequences list
  const [consequences, setConsequences] = useState<string[]>(['']);
  
  // Alternatives list
  const [alternatives, setAlternatives] = useState<{ option: string; whyRejected: string }[]>([
    { option: '', whyRejected: '' }
  ]);
  
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Core', 'Strategy']);

  if (!isOpen) return null;

  const handleAddConsequence = () => {
    setConsequences([...consequences, '']);
  };

  const handleRemoveConsequence = (index: number) => {
    setConsequences(consequences.filter((_, i) => i !== index));
  };

  const handleConsequenceChange = (index: number, val: string) => {
    const updated = [...consequences];
    updated[index] = val;
    setConsequences(updated);
  };

  const handleAddAlternative = () => {
    setAlternatives([...alternatives, { option: '', whyRejected: '' }]);
  };

  const handleRemoveAlternative = (index: number) => {
    setAlternatives(alternatives.filter((_, i) => i !== index));
  };

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

    // Generate next code
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
        name: deciderName.trim() || 'You (Logged User)',
        role: deciderRole.trim() || 'Lead Engineer'
      },
      context: context.trim() || 'Documented during interactive session to capture architectural consensus.',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
              +
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Log New Architectural Decision</h2>
              <p className="text-xs text-slate-400">Record what was decided, the trade-offs, and why.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-sm">
          {/* Decision Title */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Decision Headline <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Adopt OpenTelemetry across all backend services for distributed tracing"
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
            />
          </div>

          {/* Category & Status & Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DecisionCategory)}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Architecture">Architecture</option>
                <option value="Product">Product</option>
                <option value="Engineering">Engineering</option>
                <option value="Security">Security</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DecisionStatus)}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="active">Active (Enforced)</option>
                <option value="proposed">Proposed (Review)</option>
                <option value="superseded">Superseded</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                System Impact
              </label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="High">High (Breaking/Core)</option>
                <option value="Medium">Medium (Moderate)</option>
                <option value="Low">Low (Isolated)</option>
              </select>
            </div>
          </div>

          {/* Decider Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Decider / Author
              </label>
              <input
                type="text"
                value={deciderName}
                onChange={(e) => setDeciderName(e.target.value)}
                placeholder="e.g., Alex Rivera"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Role / Team
              </label>
              <input
                type="text"
                value={deciderRole}
                onChange={(e) => setDeciderRole(e.target.value)}
                placeholder="e.g., Principal Architect / Infrastructure"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Context / Why */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Context & Problem (Why was this needed?) <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="What pain points, scaling bottlenecks, or business constraints triggered this decision?"
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none font-sans"
            />
          </div>

          {/* What was Decided */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Exact Decision (What was chosen?) <span className="text-amber-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="Concrete, unambiguous statement of what the team is doing going forward."
              className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none font-sans"
            />
          </div>

          {/* Consequences / Ramifications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Key Consequences & Trade-offs
              </label>
              <button
                type="button"
                onClick={handleAddConsequence}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                + Add Consequence
              </button>
            </div>
            <div className="space-y-2">
              {consequences.map((c, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => handleConsequenceChange(idx, e.target.value)}
                    placeholder={`Consequence #${idx + 1} (e.g., Eliminates 40% of boilerplate, but adds a build step)`}
                    className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  {consequences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveConsequence(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives Considered */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Alternatives Considered & Why Rejected
              </label>
              <button
                type="button"
                onClick={handleAddAlternative}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                + Add Alternative
              </button>
            </div>
            <div className="space-y-3">
              {alternatives.map((alt, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">Alternative #{idx + 1}</span>
                    {alternatives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAlternative(idx)}
                        className="text-slate-500 hover:text-rose-400 transition text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={alt.option}
                    onChange={(e) => handleAlternativeChange(idx, 'option', e.target.value)}
                    placeholder="Alternative Option (e.g. Apache Kafka)"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={alt.whyRejected}
                    onChange={(e) => handleAlternativeChange(idx, 'whyRejected', e.target.value)}
                    placeholder="Why was it rejected? (e.g., Operational overhead was 3x higher for our current volume)"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Supersedes existing */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Supersedes Previous Decision (Optional)
            </label>
            <input
              type="text"
              value={supersedes}
              onChange={(e) => setSupersedes(e.target.value)}
              placeholder="e.g. DEC-012"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-lg px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono text-xs"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Tags (Press Enter to add)
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950/80 border border-slate-700/80 rounded-lg">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
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
                placeholder="Add tag + Enter..."
                className="bg-transparent border-none text-xs text-white focus:outline-none flex-1 min-w-[120px] p-1"
              />
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg font-semibold shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Commit Decision Record
          </button>
        </div>
      </div>
    </div>
  );
};
