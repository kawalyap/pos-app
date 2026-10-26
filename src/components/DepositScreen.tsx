import React, { useState } from 'react';
import { KiPayLogo } from './KiPayLogo';
import { motion } from 'motion/react';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';

interface DepositScreenProps {
  onBack: () => void;
  onSuccess: (amount: number, source: string) => void;
}

export const DepositScreen: React.FC<DepositScreenProps> = ({ onBack, onSuccess }) => {
  const [amountStr, setAmountStr] = useState('100,000');
  const [selectedSource, setSelectedSource] = useState<'mtn' | 'airtel' | 'card'>('mtn');
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = [20000, 50000, 100000, 250000];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(amountStr.replace(/\D/g, ''), 10) || 50000;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const sourceName =
        selectedSource === 'mtn'
          ? 'MTN MoMo (+256 772 401 341)'
          : selectedSource === 'airtel'
          ? 'Airtel Money (+256 700 892 110)'
          : 'Visa Card •••• 4402';
      onSuccess(cleanAmount, sourceName);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6 custom-scrollbar bg-[#f8f9ff] font-sans">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-3 sticky top-0 z-30 shadow-2xs">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <div className="flex items-center gap-2">
          <KiPayLogo size="sm" />
          <h2 className="font-heading text-sm font-bold text-slate-900">Deposit Funds</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Enter Amount Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
            Enter Deposit Amount (UGX)
          </label>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-500">UGX</span>
            <input
              type="text"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              className="w-full text-2xl font-black text-slate-900 focus:outline-none font-mono-numbers"
              placeholder="50,000"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            {presets.map((preset) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={preset}
                type="button"
                onClick={() => setAmountStr(preset.toLocaleString('en-US'))}
                className="py-1.5 px-1 rounded-xl bg-slate-50 hover:bg-blue-50 text-[11px] font-bold text-slate-800 hover:text-blue-700 border border-slate-200 transition-colors font-mono-numbers cursor-pointer"
              >
                {preset >= 1000 ? `${preset / 1000}k` : preset}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Source Selection */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-1 block">
            Select Payment Source
          </label>

          {/* MTN MoMo */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSource('mtn')}
            className={`p-3.5 bg-white rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
              selectedSource === 'mtn' ? 'border-[#1d68bd] ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs font-mono-numbers">
                MTN
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-slate-900">MTN MoMo</h4>
                <p className="text-[11px] text-slate-500 font-mono-numbers font-medium">+256 772 401 341</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedSource === 'mtn' ? 'bg-[#1d68bd] text-white' : 'border border-slate-300'
              }`}
            >
              {selectedSource === 'mtn' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </motion.div>

          {/* Airtel Money */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSource('airtel')}
            className={`p-3.5 bg-white rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
              selectedSource === 'airtel' ? 'border-[#1d68bd] ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-black flex items-center justify-center text-xs shadow-xs font-mono-numbers">
                AIR
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-slate-900">Airtel Money</h4>
                <p className="text-[11px] text-slate-500 font-mono-numbers font-medium">+256 700 892 110</p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                selectedSource === 'airtel' ? 'bg-[#1d68bd] text-white' : 'border border-slate-300'
              }`}
            >
              {selectedSource === 'airtel' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </motion.div>
        </div>

        {/* Security badge */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-[11px] text-emerald-900 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Zero top-up fee. Instantly reflected in KiPay wallet.</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleDeposit}
          disabled={isProcessing}
          className="w-full py-3.5 bg-[#1d68bd] hover:bg-[#15549b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          {isProcessing ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span>Confirm Deposit</span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
