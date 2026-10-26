import React from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ScreenView } from '../types';
import {
  Smartphone,
  Maximize2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface FlowControllerProps {
  currentView: ScreenView;
  isDeviceFrame: boolean;
  walletBalance: number;
  selectedVehiclePlate: string;
  hasActivePass: boolean;
  onNavigate: (view: ScreenView) => void;
  onToggleFrame: () => void;
  onResetData: () => void;
  onTrigger15mAlert?: () => void;
}

export const FlowController: React.FC<FlowControllerProps> = ({
  currentView,
  isDeviceFrame,
  walletBalance,
  selectedVehiclePlate,
  hasActivePass,
  onNavigate,
  onToggleFrame,
  onResetData,
  onTrigger15mAlert
}) => {
  const getViewReadableName = (v: ScreenView) => {
    switch (v) {
      case 'login':
        return 'Login — KiPay';
      case 'dashboard':
        return 'Home Dashboard — KiPay';
      case 'merchants':
        return 'Pay — Merchant Selection';
      case 'parking-sites':
        return 'MyParking — Site Selection';
      case 'parking-vehicle':
        return 'MyParking — Vehicle Entry';
      case 'parking-review':
        return 'MyParking — Review';
      case 'parking-confirm':
        return 'Payment Confirmation PIN Sheet';
      case 'parking-success':
        return 'Active Gate Pass & Receipt';
      case 'deposit':
        return 'Deposit Funds — KiPay';
      case 'transfer':
        return 'Transfer Money — KiPay';
      case 'utilities':
        return 'Utilities Bill Pay — KiPay';
      case 'history':
        return 'Transaction History Ledger';
      case 'profile':
        return 'Profile & Security — KiPay';
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans">
      {/* Main Flow Controller Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 p-1 flex items-center justify-center">
              <KiPayLogo size="sm" />
            </div>
            <div>
              <h2 className="font-heading text-sm font-bold text-white tracking-tight">
                KiPay Flow Controller
              </h2>
              <p className="font-sans text-[11px] text-slate-400">Interactive Prototype Simulation</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleFrame}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Toggle Device Frame vs Full View"
            >
              {isDeviceFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[10px]">
                {isDeviceFrame ? 'Full View' : 'Device Frame'}
              </span>
            </button>
            <button
              onClick={onResetData}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
              title="Reset Demo State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="font-sans text-xs text-slate-400 leading-relaxed mb-4">
          Click buttons inside the phone screen, or jump directly between application states using the direct route triggers below:
        </p>

        {/* 15-Minute Expiry Alert Simulation Callout */}
        {onTrigger15mAlert && (
          <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/40 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              <div>
                <span className="text-[11px] font-bold text-amber-300 block leading-tight">
                  15-Min Expiry Alert
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Simulate warning notification in UI
                </span>
              </div>
            </div>
            <button
              onClick={onTrigger15mAlert}
              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 font-sans"
            >
              Trigger Alert
            </button>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-3.5">
          {/* Category 1: Authentication & Hub */}
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Authentication & Hub
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('login')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'login'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                1. Login Screen
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'dashboard'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                2. Home Dashboard
              </button>
            </div>
          </div>

          {/* Category 2: 4-Step MyParking Dedicated Workflow */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-500">
                4-Step MyParking Dedicated Workflow
              </span>
              <span className="font-sans text-[9px] text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
                Primary Flow
              </span>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => onNavigate('parking-sites')}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all flex justify-between items-center cursor-pointer ${
                  currentView === 'parking-sites'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                <span>Step 1: Site Selection</span>
                <span className="text-[10px] text-amber-400 font-bold">Zone A</span>
              </button>

              <button
                onClick={() => onNavigate('parking-vehicle')}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all flex justify-between items-center cursor-pointer ${
                  currentView === 'parking-vehicle'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                <span>Step 2: Vehicle Entry</span>
                <span className="text-[10px] text-blue-400 font-bold font-mono-numbers">
                  {selectedVehiclePlate}
                </span>
              </button>

              <button
                onClick={() => onNavigate('parking-review')}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all flex justify-between items-center cursor-pointer ${
                  currentView === 'parking-review'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                <span>Step 3: Review & Tariff</span>
                <span className="text-[10px] text-slate-400 font-mono-numbers">UGX 3,200</span>
              </button>

              <button
                onClick={() => onNavigate('parking-confirm')}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all flex justify-between items-center cursor-pointer ${
                  currentView === 'parking-confirm'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                <span>Step 4A: PIN Confirmation</span>
                <span className="text-[10px] text-indigo-400 font-bold">Modal</span>
              </button>

              <button
                onClick={() => onNavigate('parking-success')}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all flex justify-between items-center cursor-pointer ${
                  currentView === 'parking-success'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                <span>Step 4B: QR Gate Pass & Receipt</span>
                <span
                  className={`text-[10px] font-bold ${
                    hasActivePass ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {hasActivePass ? 'Pass Active' : 'View Pass'}
                </span>
              </button>
            </div>
          </div>

          {/* Category 3: Financial Services & Ledger */}
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Financial Services & Ledger
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('merchants')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'merchants'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                Merchants Pay
              </button>

              <button
                onClick={() => onNavigate('deposit')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'deposit'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                Deposit Funds
              </button>

              <button
                onClick={() => onNavigate('transfer')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'transfer'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                Transfer Money
              </button>

              <button
                onClick={() => onNavigate('utilities')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'utilities'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                Utilities Pay
              </button>

              <button
                onClick={() => onNavigate('history')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'history'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                History Ledger
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                  currentView === 'profile'
                    ? 'bg-[#1d68bd] border-blue-400 text-white font-bold shadow-md shadow-blue-900/50 ring-1 ring-blue-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 font-medium'
                }`}
              >
                Profile & Security
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current State Info Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-xs space-y-2 text-slate-400 shadow-xl font-sans">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Current View:</span>
          <span className="font-heading font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700 text-[11px]">
            {getViewReadableName(currentView)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Wallet Balance:</span>
          <span className="font-heading font-extrabold text-emerald-400 font-mono-numbers">
            {formatUGX(walletBalance)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Active Brand Mark:</span>
          <span className="font-semibold text-blue-400 font-sans">Official Blue/Amber Emblem</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Design System:</span>
          <span className="font-semibold text-slate-300 font-sans">Cobalt Pulse Modern Fintech</span>
        </div>
      </div>
    </div>
  );
};
