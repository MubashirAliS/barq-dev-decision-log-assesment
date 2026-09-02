import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ArrowLeft, 
  RotateCcw, 
  Clock, 
  AlertTriangle,
  Tag,
  Download,
  ChevronRight
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

  // Compute metrics
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
    downloadAnchor.setAttribute("download", `decision-log-export-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetSampleData = () => {
    setDecisions(INITIAL_DECISIONS);
    setSelectedDecision(null);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-200 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Banner / Breadcrumb Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-900 border border-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Landing Page</span>
            <span className="sm:hidden">Exit</span>
          </button>
          
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-mono font-bold">
              D
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">Decisions Registry</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Interactive Demo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSampleData}
            title="Reset to factory sample records"
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Data</span>
          </button>

          <button
            onClick={handleExportJson}
            className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="text-xs text-slate-950 font-semibold bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-lg shadow-sm shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Decision</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass-panel p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Total Recorded</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-white font-mono">{totalCount}</span>
              <span className="text-xs text-slate-500 font-mono">ADRs</span>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active Enforced
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-emerald-300 font-mono">{activeCount}</span>
              <span className="text-xs text-emerald-500/70 font-mono">
                {Math.round((activeCount / (totalCount || 1)) * 100)}%
              </span>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1">
              <RotateCcw className="w-3 h-3 text-slate-500" />
              Superseded
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-slate-300 font-mono">{supersededCount}</span>
              <span className="text-xs text-slate-500 font-mono">Archived</span>
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Under Review
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-amber-300 font-mono">{proposedCount}</span>
              <span className="text-xs text-amber-500/70 font-mono">RFC</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, rationale, decider, or code..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
              >
                &times;
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
              {(['all', 'active', 'proposed', 'superseded'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-md font-medium capitalize transition cursor-pointer ${
                    statusFilter === st
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
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
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-slate-400">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Quick Filter:
            </span>
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-mono transition shrink-0 cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Tags
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono transition shrink-0 cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-amber-400 text-slate-950 font-semibold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Decision Cards Stream */}
        {filteredDecisions.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
            <h3 className="text-base font-semibold text-white">No decisions match your filter</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query, status filters, or tags to find past architecture records.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); setSelectedTag('all'); }}
              className="text-xs text-amber-400 underline pt-2 inline-block hover:text-amber-300 cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDecisions.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDecision(item)}
                className="group glass-panel glass-panel-hover p-5 rounded-xl border border-slate-800/80 cursor-pointer relative transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1 pr-4">
                    {/* Status & Code line */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {item.code}
                      </span>
                      <span className="text-xs font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                        {item.category}
                      </span>

                      {item.status === 'active' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      )}
                      {item.status === 'superseded' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                          <RotateCcw className="w-3 h-3 text-slate-500" />
                          Superseded {item.supersededBy ? `by ${item.supersededBy}` : ''}
                        </span>
                      )}
                      {item.status === 'proposed' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          Proposed
                        </span>
                      )}

                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Context Excerpt */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      <span className="text-slate-300 font-medium">Why: </span>
                      {item.context}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map(t => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-800">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side: Author & Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                    <div className="text-left md:text-right">
                      <p className="text-xs font-medium text-slate-300">{item.decider.name}</p>
                      <p className="text-[10px] text-slate-500">{item.decider.role}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 transition">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Slide-out Drawer for Decision Details */}
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
