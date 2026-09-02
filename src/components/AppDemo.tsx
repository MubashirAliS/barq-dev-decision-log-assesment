import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ArrowLeft, 
  RotateCcw, 
  Download,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { INITIAL_DECISIONS } from '../types/decision';
import type { DecisionRecord, DecisionStatus, DecisionCategory } from '../types/decision';
import { CreateDecisionModal } from './CreateDecisionModal';
import { DecisionDrawer } from './DecisionDrawer';

interface AppDemoProps {
  onBackToLanding: () => void;
}

export const AppDemo: React.FC<AppDemoProps> = ({ onBackToLanding }) => {
  const [decisions, setDecisions] = useState<DecisionRecord[]>(INITIAL_DECISIONS);
  const [selectedDecision, setSelectedDecision] = useState<DecisionRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DecisionStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<DecisionCategory | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');

  // Metrics
  const totalCount = decisions.length;
  const activeCount = decisions.filter(d => d.status === 'active').length;
  const supersededCount = decisions.filter(d => d.status === 'superseded').length;
  const proposedCount = decisions.filter(d => d.status === 'proposed').length;

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    decisions.forEach(d => d.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [decisions]);

  // Filtered decisions
  const filteredDecisions = useMemo(() => {
    return decisions.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.decision.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.decider.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesTag = selectedTag === 'all' || item.tags.includes(selectedTag);

      return matchesSearch && matchesStatus && matchesCategory && matchesTag;
    });
  }, [decisions, searchQuery, statusFilter, categoryFilter, selectedTag]);

  const handleCreateDecision = (newRecord: DecisionRecord) => {
    setDecisions([newRecord, ...decisions]);
    setSelectedDecision(newRecord);
  };

  const handleUpdateStatus = (id: string, newStatus: DecisionStatus) => {
    const updated = decisions.map(d => {
      if (d.id === id) {
        return { ...d, status: newStatus };
      }
      return d;
    });
    setDecisions(updated);
    if (selectedDecision && selectedDecision.id === id) {
      setSelectedDecision({ ...selectedDecision, status: newStatus });
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(decisions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `decision-log-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetSampleData = () => {
    setDecisions(INITIAL_DECISIONS);
    setSelectedDecision(null);
  };

  return (
    <div className="min-h-screen bg-[#0C0D0E] text-[#E5E5E7] flex flex-col font-sans selection:bg-[#E5E5E7] selection:text-[#0C0D0E]">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#0C0D0E]/95 sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded bg-[#141518] border border-white/[0.08] transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Overview</span>
          </button>
          
          <div className="h-4 w-px bg-white/[0.08] hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-white">DECISION REGISTRY</span>
            <span className="text-[10px] font-mono text-neutral-400 border border-white/[0.08] px-1.5 py-0.5 rounded">
              {filteredDecisions.length} records
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSampleData}
            title="Reset sample records"
            className="text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded border border-white/[0.08] bg-[#141518] hover:bg-[#1B1D22] transition flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            onClick={handleExportJson}
            className="text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 rounded border border-white/[0.08] bg-[#141518] hover:bg-[#1B1D22] transition flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <Download className="w-3 h-3 text-neutral-400" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="text-xs text-black font-semibold bg-white hover:bg-neutral-200 px-3 py-1.5 rounded transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Decision</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
        {/* Status Counters Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="border border-white/[0.08] bg-[#121316] p-3 rounded flex justify-between items-center">
            <span className="text-neutral-500">TOTAL</span>
            <span className="text-white font-semibold text-sm">{totalCount}</span>
          </div>
          <div className="border border-white/[0.08] bg-[#121316] p-3 rounded flex justify-between items-center">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              ACTIVE
            </span>
            <span className="text-white font-semibold text-sm">{activeCount}</span>
          </div>
          <div className="border border-white/[0.08] bg-[#121316] p-3 rounded flex justify-between items-center">
            <span className="text-neutral-400">SUPERSEDED</span>
            <span className="text-white font-semibold text-sm">{supersededCount}</span>
          </div>
          <div className="border border-white/[0.08] bg-[#121316] p-3 rounded flex justify-between items-center">
            <span className="text-amber-400">PROPOSED</span>
            <span className="text-white font-semibold text-sm">{proposedCount}</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border border-white/[0.08] bg-[#121316] p-3 rounded flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search decisions, why, decider..."
              className="w-full bg-[#0C0D0E] border border-white/[0.08] rounded pl-8 pr-3 py-1.5 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status switcher */}
            <div className="flex items-center bg-[#0C0D0E] border border-white/[0.08] rounded p-0.5 font-mono text-[11px]">
              {(['all', 'active', 'proposed', 'superseded'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded capitalize transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="bg-[#0C0D0E] border border-white/[0.08] rounded px-2.5 py-1.5 text-neutral-300 focus:outline-none focus:border-white/30"
            >
              <option value="all">All Categories</option>
              <option value="Architecture">Architecture</option>
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
              <option value="Security">Security</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-neutral-400 pb-1">
            <span className="text-neutral-500 shrink-0 mr-1">Tags:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2 py-0.5 rounded border transition cursor-pointer ${
                selectedTag === 'all'
                  ? 'border-white bg-white/10 text-white'
                  : 'border-white/[0.08] bg-[#121316] text-neutral-400 hover:text-white'
              }`}
            >
              all
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-2 py-0.5 rounded border transition cursor-pointer ${
                  selectedTag === tag
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/[0.08] bg-[#121316] text-neutral-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Decision List Stream */}
        {filteredDecisions.length === 0 ? (
          <div className="border border-white/[0.08] bg-[#121316] p-12 text-center rounded text-xs space-y-2">
            <p className="text-white font-medium">No matching decision records found</p>
            <p className="text-neutral-500">Try modifying your query or clearing active filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); setSelectedTag('all'); }}
              className="text-neutral-300 underline pt-2 inline-block hover:text-white cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDecisions.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDecision(item)}
                className="group border border-white/[0.08] hover:border-white/20 bg-[#121316] hover:bg-[#15171B] p-4 sm:p-5 rounded cursor-pointer transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="font-semibold text-white px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">
                        {item.code}
                      </span>
                      <span className="text-neutral-400 font-sans">{item.category}</span>
                      <span className="text-neutral-600">•</span>

                      {item.status === 'active' && (
                        <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          ACTIVE
                        </span>
                      )}
                      {item.status === 'superseded' && (
                        <span className="text-neutral-500 text-[11px]">
                          SUPERSEDED {item.supersededBy ? `BY ${item.supersededBy}` : ''}
                        </span>
                      )}
                      {item.status === 'proposed' && (
                        <span className="text-amber-400 text-[11px]">PROPOSED</span>
                      )}
                      {item.status === 'deprecated' && (
                        <span className="text-rose-400 text-[11px]">DEPRECATED</span>
                      )}

                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-500 text-[11px]">{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-medium text-white group-hover:text-neutral-200 transition leading-snug">
                      {item.title}
                    </h3>

                    {/* Context Summary */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      <span className="text-neutral-300 font-medium">Why: </span>
                      {item.context}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map(t => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 bg-[#0C0D0E] text-neutral-400 rounded border border-white/[0.04]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decider */}
                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-2 md:pt-0 border-white/[0.04] text-xs shrink-0 font-mono">
                    <span className="text-neutral-300">{item.decider.name}</span>
                    <span className="text-neutral-500 text-[11px]">{item.decider.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Slide-out Drawer */}
      <DecisionDrawer
        decision={selectedDecision}
        onClose={() => setSelectedDecision(null)}
        onUpdateStatus={handleUpdateStatus}
        allDecisions={decisions}
        onSelectDecision={(d) => setSelectedDecision(d)}
      />

      {/* Create Modal */}
      <CreateDecisionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateDecision}
        existingDecisions={decisions}
      />
    </div>
  );
};
