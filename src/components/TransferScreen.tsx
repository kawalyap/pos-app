import React, { useState } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ArrowLeft, Send, User, CheckCircle2 } from 'lucide-react';

interface TransferScreenProps {
  balance: number;
  onBack: () => void;
  onTransfer: (recipient: string, amount: number, note: string) => void;
}

export const TransferScreen: React.FC<TransferScreenProps> = ({
  balance,
  onBack,
  onTransfer
}) => {
  const [recipient, setRecipient] = useState('@david_k');
  const [amountStr, setAmountStr] = useState('25,000');
  const [note, setNote] = useState('Lunch & Parking Share');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAmount = parseInt(amountStr.replace(/\D/g, ''), 10) || 10000;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onTransfer(recipient, cleanAmount, note);
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
          <h2 className="text-sm font-bold text-slate-900">Transfer Money</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSend} className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Recipient KiPay Tag or Phone Number
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <User className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="@username or +256..."
                  className="w-full text-xs font-bold text-slate-900 focus:outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Amount (UGX)
                </label>
                <span className="text-[10px] text-slate-400 font-mono-numbers">
                  Bal: {formatUGX(balance)}
                </span>
              </div>
              <input
                type="text"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="25,000"
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-lg font-black text-slate-900 focus:outline-none focus:border-blue-600 font-mono-numbers"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Note / Description (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Fuel split, rent, etc."
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600"
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
              <>
                <Send className="w-4 h-4" />
                <span>Send Funds Instant</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
