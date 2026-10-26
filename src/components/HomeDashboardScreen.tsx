import React, { useState } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ParkingSession, Transaction } from '../types';
import { motion } from 'motion/react';
import {
  QrCode,
  ArrowDownLeft,
  ArrowUpRight,
  Zap,
  ChevronRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  AlertTriangle,
  PlusCircle
} from 'lucide-react';

interface HomeDashboardProps {
  balance: number;
  activeSession: ParkingSession | null;
  recentTransactions: Transaction[];
  onNavigate: (screen: any) => void;
  onViewTransaction: (tx: Transaction) => void;
}

const USER_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCpckHcS8BjHimaGyUCngTMeZ4XFfLRuui4nmKJAHikoXzVN-2daynJEG32U9BpElKNeXDCmIYbuAs7gxM_zo2DQydk6Z3QoVsd_Uia7iU5Rrf_T-w1nzPDlOb_57af05hFoLAjTfquHmaFX1s4palVKO-jhLbmFxw_TLBpmhUnppJFkc3adiPGW7HGFiH-kz8tGBapVCDbNvDvgwz8MmWvs-lPpT1iFZVdu5T1r66eZIderxH1-nA';

export const HomeDashboardScreen: React.FC<HomeDashboardProps> = ({
  balance,
  activeSession,
  recentTransactions,
  onNavigate,
  onViewTransaction
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [avatarError, setAvatarError] = useState(false);

  const getRemainingInfo = () => {
    if (!activeSession) return null;
    const now = new Date();
    const diffMs = activeSession.expiryTime.getTime() - now.getTime();
    if (diffMs <= 0) return { label: 'Session Expired', isCritical: true };
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    const isCritical = diffMs <= 900000; // <= 15 minutes
    return {
      label: `${hrs > 0 ? `${hrs}h ` : ''}${remMins}m remaining`,
      isCritical
    };
  };

  const remainingInfo = getRemainingInfo();

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-[#f8f9ff] font-sans">
      {/* Top Bar with KiPay Monogram and User Avatar */}
      <div className="px-5 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <KiPayLogo size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                KiPay Wallet
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="font-heading text-xs font-bold text-slate-900 leading-tight">Sarah Namukasa</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onNavigate('history')}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            title="Activity Notifications"
          >
            <Clock className="w-4 h-4 text-slate-700" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer shadow-xs bg-slate-100"
          >
            {!avatarError ? (
              <img
                src={USER_AVATAR_URL}
                alt="Profile"
                referrerPolicy="no-referrer"
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#1d68bd] to-[#006a61] text-white flex items-center justify-center text-[11px] font-black">
                SN
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-tr from-[#0b1c30] via-[#0f2b5c] to-[#1d68bd] rounded-3xl p-5 text-white shadow-xl shadow-blue-950/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-40"></div>
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 pointer-events-none"></div>

          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-semibold text-blue-200">Available Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-blue-200 hover:text-white transition-colors cursor-pointer"
                >
                  {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 font-mono-numbers text-white">
                {showBalance ? formatUGX(balance) : 'UGX ••••••••'}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-sans font-bold text-[10px] border border-amber-400/40 flex items-center gap-1 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Tier 2 KYC</span>
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100 relative z-10 font-sans">
            <span className="font-mono-numbers text-[11px] font-semibold opacity-90 tracking-wide">A/C: •••• 9210</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('deposit')}
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>+ Quick Top Up</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Action 4-Grid with tactile physics */}
        <div className="grid grid-cols-4 gap-2.5">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onNavigate('merchants')}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1d68bd] flex items-center justify-center group-hover:bg-[#1d68bd] group-hover:text-white transition-colors">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="font-sans text-[11px] font-bold text-slate-800">Pay</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onNavigate('deposit')}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006a61] flex items-center justify-center group-hover:bg-[#006a61] group-hover:text-white transition-colors">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <span className="font-sans text-[11px] font-bold text-slate-800">Deposit</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onNavigate('transfer')}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <span className="font-sans text-[11px] font-bold text-slate-800">Transfer</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => onNavigate('utilities')}
            className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-sans text-[11px] font-bold text-slate-800">Utilities</span>
          </motion.button>
        </div>

        {/* Featured MyParking Banner (Adapts dynamically to 15m Expiry Alert) */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => activeSession ? onNavigate('parking-success') : onNavigate('parking-sites')}
          className={`rounded-3xl p-4 text-white shadow-md border cursor-pointer transition-all flex items-center justify-between group ${
            remainingInfo?.isCritical
              ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-amber-500/80 ring-2 ring-amber-500/40 shadow-amber-900/30'
              : 'bg-gradient-to-r from-slate-950 via-slate-900 to-[#131b2e] border-slate-800 hover:ring-2 hover:ring-blue-500/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl font-black flex items-center justify-center text-xl shadow-sm shrink-0 font-heading ${
                remainingInfo?.isCritical
                  ? 'bg-amber-500 text-slate-950 animate-bounce'
                  : 'bg-amber-500 text-slate-950'
              }`}
            >
              {remainingInfo?.isCritical ? '⚠️' : 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xs font-bold text-white tracking-tight">
                  {remainingInfo?.isCritical ? 'Parking Expiring Soon' : 'MyParking Express'}
                </h3>
                {activeSession ? (
                  <span
                    className={`font-sans text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      remainingInfo?.isCritical
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : 'bg-emerald-500 text-white animate-pulse'
                    }`}
                  >
                    {remainingInfo?.isCritical ? '15m Alert' : 'Live Session'}
                  </span>
                ) : (
                  <span className="font-sans text-[9px] bg-blue-500/30 text-blue-300 font-bold px-1.5 py-0.5 rounded">
                    Zone A/B
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-slate-300 mt-0.5">
                {activeSession ? (
                  <span
                    className={`font-bold font-mono-numbers ${
                      remainingInfo?.isCritical ? 'text-amber-300' : 'text-emerald-300'
                    }`}
                  >
                    {activeSession.vehicle.plate} • {remainingInfo?.label}
                  </span>
                ) : (
                  'Instant City Parking & KCCA Clearance'
                )}
              </p>
            </div>
          </div>
          <ChevronRight
            className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
              remainingInfo?.isCritical ? 'text-amber-300' : 'text-amber-400'
            }`}
          />
        </motion.div>

        {/* Recent Activity Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent Activity
            </h4>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('history')}
              className="font-sans text-xs font-bold text-[#1d68bd] hover:underline cursor-pointer"
            >
              View All
            </motion.button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {recentTransactions.slice(0, 3).map((tx) => (
              <motion.div
                whileTap={{ backgroundColor: '#f8fafc' }}
                key={tx.id}
                onClick={() => onViewTransaction(tx)}
                className="p-3 sm:p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
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
                    <p className="font-heading text-xs font-bold text-slate-900 group-hover:text-[#1d68bd] transition-colors">
                      {tx.title}
                    </p>
                    <span className="font-sans text-[11px] text-slate-500 block font-medium">
                      {tx.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-heading text-xs font-bold font-mono-numbers ${
                      tx.type === 'credit' ? 'text-[#006a61]' : 'text-slate-950'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : '-'}
                    {formatUGX(tx.amount)}
                  </span>
                  <span className="block font-sans text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Completed
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Zero Fee Guarantee Notice */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#eff4ff] to-[#e5eeff] border border-blue-100 text-xs text-blue-900 flex items-start gap-3 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#1d68bd] shrink-0 mt-0.5" />
          <div className="font-sans">
            <p className="font-bold text-[11px] text-blue-950">Zero Convenience Fees on KiPay</p>
            <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed font-normal">
              All municipal parking clearances and utility payments via KiPay wallet are exempt from gateway surcharges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
