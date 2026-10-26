import React, { useState } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ArrowLeft, Zap, Droplets, CheckCircle2 } from 'lucide-react';

interface UtilitiesScreenProps {
  onBack: () => void;
  onPayUtility: (title: string, amount: number, details: Record<string, string>) => void;
}

export const UtilitiesScreen: React.FC<UtilitiesScreenProps> = ({ onBack, onPayUtility }) => {
  const [selectedUtility, setSelectedUtility] = useState<'yaka' | 'nwsc'>('yaka');
  const [meterNumber, setMeterNumber] = useState('3719002148');
  const [amountStr, setAmountStr] = useState('50,000');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(amountStr.replace(/\D/g, ''), 10) || 30000;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (selectedUtility === 'yaka') {
        onPayUtility('UMEME Yaka Prepaid Power', cleanAmount, {
          Meter: meterNumber,
          Token: '9841-2041-3941-8812-4019',
          Units: `${(cleanAmount / 850).toFixed(1)} kWh Units Generated`
        });
      } else {
        onPayUtility('NWSC Water Bill', cleanAmount, {
          Account: meterNumber,
          Status: 'Water Service Active'
        });
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6 custom-scrollbar bg-[#f8f9ff]">
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-3 sticky top-0 z-30 shadow-2xs">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <KiPayLogo size="sm" />
          <h2 className="text-sm font-bold text-slate-900">Utilities Bill Pay</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Utility Type Selector */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => {
              setSelectedUtility('yaka');
              setMeterNumber('3719002148');
            }}
            className={`p-3.5 bg-white rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 shadow-2xs ${
              selectedUtility === 'yaka' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">UMEME Yaka</h4>
              <p className="text-[10px] text-slate-500">Prepaid Power</p>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedUtility('nwsc');
              setMeterNumber('NW-88912');
            }}
            className={`p-3.5 bg-white rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 shadow-2xs ${
              selectedUtility === 'nwsc' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">NWSC Water</h4>
              <p className="text-[10px] text-slate-500">Mains Water</p>
            </div>
          </div>
        </div>

        {/* Input Details */}
        <form onSubmit={handlePay} className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {selectedUtility === 'yaka' ? 'Meter Number' : 'Water Customer Account'}
              </label>
              <input
                type="text"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                placeholder="e.g. 3719002148"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 font-mono-numbers"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Payment Amount (UGX)
              </label>
              <input
                type="text"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="50,000"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-black text-slate-900 focus:outline-none focus:border-blue-600 font-mono-numbers"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 bg-[#1d68bd] hover:bg-[#15549b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {isProcessing ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>Purchase Utility Token Instant</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
