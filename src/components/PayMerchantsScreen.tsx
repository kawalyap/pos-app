import React, { useState } from 'react';
import { KiPayLogo } from './KiPayLogo';
import { MERCHANTS_LIST } from '../data/mockData';
import { motion } from 'motion/react';
import { ArrowLeft, Search, ShieldCheck, ChevronRight } from 'lucide-react';

interface PayMerchantsScreenProps {
  onBack: () => void;
  onSelectParking: () => void;
  onPayMerchant: (merchantName: string, amount: number) => void;
}

export const PayMerchantsScreen: React.FC<PayMerchantsScreenProps> = ({
  onBack,
  onSelectParking,
  onPayMerchant
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customPayOpen, setCustomPayOpen] = useState(false);
  const [customTill, setCustomTill] = useState('');
  const [customAmount, setCustomAmount] = useState('15,000');

  const categories = ['All', 'Transit', 'Fuel', 'Groceries', 'Dining'];

  const filteredMerchants = MERCHANTS_LIST.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.rateNote.toLowerCase().includes(search.toLowerCase());

    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Transit') return matchesSearch && m.isParking;
    if (selectedCategory === 'Fuel') return matchesSearch && m.category.includes('Fuel');
    if (selectedCategory === 'Groceries') return matchesSearch && m.category.includes('Retail');
    if (selectedCategory === 'Dining') return matchesSearch && m.category.includes('Food');
    return matchesSearch;
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(customAmount.replace(/\D/g, ''), 10) || 10000;
    onPayMerchant(customTill || 'Quick Merchant Pay', cleanAmount);
    setCustomPayOpen(false);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#f8f9ff] font-sans">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex items-center gap-2">
            <KiPayLogo size="sm" />
            <h2 className="font-heading text-sm font-bold text-slate-900">Pay — Merchant Selection</h2>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setCustomPayOpen(true)}
          className="font-sans text-xs font-bold text-[#1d68bd] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-blue-200"
        >
          Enter Code
        </motion.button>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Search Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-blue-600/30 focus-within:border-blue-600 transition-all font-sans">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search merchant, paybill or till code..."
            className="w-full text-xs font-medium focus:outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-xs text-slate-400 hover:text-slate-700 px-1 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 font-sans">
          {categories.map((cat) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1d68bd] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Section Label */}
        <div className="flex items-center justify-between pt-1 font-sans">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Available Verified Merchants
          </span>
          <span className="text-[11px] text-slate-500 font-semibold font-mono-numbers">
            {filteredMerchants.length} services
          </span>
        </div>

        {/* Merchants List with Motion tap physics */}
        <div className="space-y-2.5">
          {filteredMerchants.map((merchant) => (
            <motion.div
              whileTap={{ scale: 0.98 }}
              key={merchant.id}
              onClick={() => {
                if (merchant.isParking) {
                  onSelectParking();
                } else {
                  onPayMerchant(merchant.name, 25000);
                }
              }}
              className={`p-3.5 bg-white rounded-2xl border transition-all cursor-pointer shadow-2xs hover:shadow-xs flex items-center justify-between group ${
                merchant.isParking
                  ? 'border-blue-400 ring-2 ring-blue-500/20 bg-blue-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl ${merchant.iconBg} ${merchant.iconText} font-black flex items-center justify-center text-base shadow-xs shrink-0 font-heading`}
                >
                  {merchant.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {merchant.name}
                    </h3>
                    {merchant.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                  </div>
                  <p className="font-sans text-[11px] text-slate-600 mt-0.5 line-clamp-1 font-normal">
                    {merchant.description}
                  </p>
                  <span className="font-sans text-[11px] font-bold text-slate-500 mt-0.5 block font-mono-numbers">
                    {merchant.rateNote}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold shrink-0 font-sans">
                <span className={merchant.isParking ? 'text-[#1d68bd]' : 'text-slate-600'}>
                  {merchant.isParking ? 'Select' : 'Pay'}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Paybill Modal */}
        {customPayOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-white rounded-2xl border-2 border-blue-500 shadow-lg space-y-3 font-sans"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-heading text-xs font-bold text-slate-900">Direct Merchant / Till Entry</h4>
              <button
                onClick={() => setCustomPayOpen(false)}
                className="text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                  Merchant Till / Paybill Code
                </label>
                <input
                  type="text"
                  value={customTill}
                  onChange={(e) => setCustomTill(e.target.value)}
                  placeholder="e.g. 991028 or SHELL-04"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold focus:outline-none focus:border-blue-600 font-mono-numbers"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                  Amount (UGX)
                </label>
                <input
                  type="text"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="10,000"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-black focus:outline-none focus:border-blue-600 font-mono-numbers"
                  required
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 bg-[#1d68bd] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#15549b] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};
