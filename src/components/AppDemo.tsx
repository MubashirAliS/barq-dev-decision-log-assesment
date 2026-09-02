import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ArrowLeft, 
  RotateCcw, 
  Download
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

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    decisions.forEach(d => d.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [decisions]);

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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/95 sticky top-0 z-30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition cursor-pointer font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Overview</span>
          </button>
          
          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-white tracking-wider">DECISION REGISTRY</span>
            <span className="text-[10px] font-mono text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded">
              {filteredDecisions.length} Active Records
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSampleData}
            title="Reset sample records"
            className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            onClick={handleExportJson}
            className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <Download className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-orange-glow text-xs text-neutral-950 font-bold bg-orange-500 hover:bg-orange-600 px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-md"
          >
            <Plus className="w-4 h-4 text-neutral-950" />
            <span>New Decision</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="border border-neutral-800 bg-neutral-900/60 p-4 rounded-xl flex justify-between items-center">
            <span className="text-neutral-500">TOTAL</span>
            <span className="text-white font-bold text-lg font-mono">{totalCount}</span>
          </div>
          <div className="border border-emerald-500/20 bg-emerald-950/10 p-4 rounded-xl flex justify-between items-center">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ACTIVE
            </span>
            <span className="text-emerald-300 font-bold text-lg font-mono">{activeCount}</span>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/60 p-4 rounded-xl flex justify-between items-center">
            <span className="text-neutral-400">SUPERSEDED</span>
            <span className="text-white font-bold text-lg font-mono">{supersededCount}</span>
          </div>
          <div className="border border-amber-500/20 bg-amber-950/10 p-4 rounded-xl flex justify-between items-center">
            <span className="text-amber-400">REVIEW (RFC)</span>
            <span className="text-amber-300 font-bold text-lg font-mono">{proposedCount}</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border border-neutral-800 bg-neutral-900/60 p-3 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search decisions, why, decider..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-mono text-[11px]">
            {/* Status switcher */}
            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-0.5">
              {(['all', 'active', 'proposed', 'superseded'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-md capitalize transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-orange-500 text-neutral-950 font-bold'
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
              className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-300 focus:outline-none focus:border-orange-500"
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

        {/* Tag pills */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-neutral-400 pb-1">
            <span className="text-neutral-500 shrink-0 mr-1">Tags:</span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-0.5 rounded-full border transition cursor-pointer ${
                selectedTag === 'all'
                  ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 font-bold'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              all
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-2.5 py-0.5 rounded-full border transition cursor-pointer ${
                  selectedTag === tag
                    ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 font-bold'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Decision List Stream */}
        {filteredDecisions.length === 0 ? (
          <div className="border border-neutral-800 bg-neutral-900/40 p-12 text-center rounded-2xl text-xs space-y-2">
            <p className="text-white font-medium">No matching decision records found</p>
            <p className="text-neutral-500">Try modifying your query or clearing active filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); setSelectedTag('all'); }}
              className="text-orange-400 underline pt-2 inline-block hover:text-orange-300 cursor-pointer"
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
                className="orange-card-hover group border border-neutral-800/80 bg-neutral-900/50 p-5 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-orange-400 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded">
                        {item.code}
                      </span>
                      <span className="text-neutral-400 font-sans">{item.category}</span>
                      <span className="text-neutral-600">•</span>

                      {item.status === 'active' && (
                        <span className="text-emerald-400 text-[11px] font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          ACTIVE
                        </span>
                      )}
                      {item.status === 'superseded' && (
                        <span className="text-neutral-400 text-[11px] bg-neutral-800 px-2 py-0.5 rounded">
                          SUPERSEDED {item.supersededBy ? `BY ${item.supersededBy}` : ''}
                        </span>
                      )}
                      {item.status === 'proposed' && (
                        <span className="text-amber-400 text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          PROPOSED
                        </span>
                      )}

                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-500 text-[11px]">{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white group-hover:text-orange-300 transition leading-snug">
                      {item.title}
                    </h3>

                    {/* Context Summary */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      <span className="text-neutral-300 font-medium">Why: </span>
                      {item.context}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                      {item.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-neutral-950 text-neutral-400 rounded border border-neutral-800">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decider */}
                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-2 md:pt-0 border-neutral-800 text-xs shrink-0 font-mono">
                    <span className="text-neutral-200 font-medium">{item.decider.name}</span>
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
