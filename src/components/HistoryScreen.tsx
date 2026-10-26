import React, { useState } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { Transaction } from '../types';
import { ArrowLeft, Search, Filter, ShieldCheck, ChevronRight, FileText } from 'lucide-react';

interface HistoryScreenProps {
  transactions: Transaction[];
  onBack: () => void;
  onViewDetails: (tx: Transaction) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  transactions,
  onBack,
  onViewDetails
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'parking', label: 'Parking' },
    { id: 'utility', label: 'Utilities' },
    { id: 'deposit', label: 'Deposits' }
  ];

  const filtered = transactions.filter((tx) => {
    const matchesCat = filterCategory === 'all' || tx.category === filterCategory;
    const matchesSearch =
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20 custom-scrollbar bg-[#f8f9ff]">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <KiPayLogo size="sm" />
            <h2 className="text-sm font-bold text-slate-900">Transaction History</h2>
          </div>
        </div>
        <span className="text-[11px] font-bold text-slate-400 font-mono-numbers">
          {filtered.length} Records
        </span>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Search */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions, plates or tokens..."
            className="w-full text-xs font-medium focus:outline-none bg-transparent text-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-[#1d68bd] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {filtered.map((tx) => (
            <div
              key={tx.id}
              onClick={() => onViewDetails(tx)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    tx.category === 'parking'
                      ? 'bg-amber-100 text-amber-900'
                      : tx.category === 'utility'
                      ? 'bg-blue-50 text-blue-700'
                      : tx.category === 'deposit'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-purple-50 text-purple-700'
                  }`}
                >
                  {tx.category === 'parking' ? 'P' : tx.category === 'utility' ? '⚡' : tx.category === 'deposit' ? '↓' : '🛒'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {tx.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    {tx.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span
                    className={`text-xs font-bold font-mono-numbers ${
                      tx.type === 'credit' ? 'text-[#006a61]' : 'text-slate-900'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}
                    {formatUGX(tx.amount)}
                  </span>
                  <span className="block text-[9px] text-slate-400 uppercase font-semibold">
                    {tx.status}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-semibold">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
