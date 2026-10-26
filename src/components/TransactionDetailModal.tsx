import React from 'react';
import { formatUGX } from './KiPayLogo';
import { Transaction } from '../types';
import { CheckCircle2, ShieldCheck, X, FileText } from 'lucide-react';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose
}) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0b1c30]/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#1d68bd]" />
            <h3 className="text-xs font-bold text-slate-900">Official KiPay Receipt</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Transaction Amount
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-0.5 font-mono-numbers">
            {transaction.type === 'credit' ? '+' : '-'}
            {formatUGX(transaction.amount)}
          </h2>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed & Settled</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-200/80">
          <div className="flex justify-between">
            <span className="text-slate-400">Service</span>
            <span className="font-bold text-slate-900">{transaction.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Timestamp</span>
            <span className="font-medium text-slate-700">{transaction.timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reference ID</span>
            <span className="font-mono-numbers font-bold text-slate-800">
              {transaction.token || `KP-${transaction.id.toUpperCase()}`}
            </span>
          </div>

          {transaction.details &&
            Object.entries(transaction.details).map(([key, val]) => (
              <div key={key} className="flex justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-400">{key}</span>
                <span className="font-semibold text-slate-900 text-right">{val}</span>
              </div>
            ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Close Receipt
        </button>
      </div>
    </div>
  );
};
