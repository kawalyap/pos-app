import React, { useState } from 'react';
import { KiPayLogo } from './KiPayLogo';
import { Vehicle } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  Fingerprint,
  Lock,
  Car,
  LogOut,
  ChevronRight,
  Check,
  Bell,
  Smartphone
} from 'lucide-react';

interface ProfileScreenProps {
  vehicles: Vehicle[];
  onBack: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  vehicles,
  onBack,
  onLogout
}) => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [smsReceipts, setSmsReceipts] = useState(true);
  const [pinNotice, setPinNotice] = useState(false);

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
            <h2 className="text-sm font-bold text-slate-900">Profile & Security</h2>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1d68bd] to-[#006a61] text-white font-extrabold flex items-center justify-center text-base shadow-sm shrink-0">
            SN
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900">Sarah Namukasa</h3>
            <p className="text-[11px] text-slate-500 font-mono-numbers">+256 700 892 110</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                <span>Tier 2 KYC Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden divide-y divide-slate-100 text-xs">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Fingerprint className="w-4 h-4 text-[#006a61]" />
              <span className="font-semibold text-slate-800">Biometric Touch ID / Face ID</span>
            </div>
            <button
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                biometricsEnabled ? 'bg-[#006a61]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div
            onClick={() => setPinNotice(!pinNotice)}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-[#1d68bd]" />
              <span className="font-semibold text-slate-800">Change 4-Digit Security PIN</span>
            </div>
            <span className="text-slate-400 font-medium">Update →</span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-800">SMS Instant Clearance Receipts</span>
            </div>
            <button
              onClick={() => setSmsReceipts(!smsReceipts)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                smsReceipts ? 'bg-[#1d68bd]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  smsReceipts ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {pinNotice && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex justify-between items-center">
            <span>Current security PIN is active. Test code: <b>1234</b></span>
            <button onClick={() => setPinNotice(false)} className="text-blue-700 font-bold ml-2">
              ✕
            </button>
          </div>
        )}

        {/* Registered Vehicles Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-slate-600" />
              <h4 className="text-xs font-bold text-slate-900">Registered Plates</h4>
            </div>
            <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              {vehicles.length} Vehicles
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {vehicles.map((v) => (
              <div key={v.plate} className="py-2 flex justify-between items-center">
                <span className="font-mono-numbers font-bold text-slate-900">{v.plate}</span>
                <span className="text-slate-500 text-[11px]">{v.model} ({v.color})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
