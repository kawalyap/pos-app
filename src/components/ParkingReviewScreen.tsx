import React, { useState } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ParkingSite, Vehicle } from '../types';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Car,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ParkingReviewScreenProps {
  site: ParkingSite;
  vehicle: Vehicle;
  durationHours: number;
  walletBalance: number;
  onChangeDuration: (hours: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const ParkingReviewScreen: React.FC<ParkingReviewScreenProps> = ({
  site,
  vehicle,
  durationHours,
  walletBalance,
  onChangeDuration,
  onConfirm,
  onBack
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'kipay' | 'mtn' | 'airtel'>('kipay');

  const baseTariff = site.ratePerHour * durationHours;
  const kccaFee = 200;
  const convenienceFee = 0;
  const totalDue = baseTariff + kccaFee + convenienceFee;

  const getEndTime = () => {
    const end = new Date();
    end.setHours(end.getHours() + durationHours);
    let hours = end.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const mins = end.getMinutes().toString().padStart(2, '0');
    return `${hours}:${mins} ${ampm}`;
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 custom-scrollbar bg-[#f8f9ff] relative font-sans">
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
            <h2 className="font-heading text-sm font-bold text-slate-900">Step 3: Review Details</h2>
          </div>
        </div>

        <span className="font-sans text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
          Step 3 of 4
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Target Site & Vehicle Recap Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs border border-amber-500 font-mono-numbers">
                UG
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold text-slate-400 uppercase">Vehicle Plate</span>
                <h3 className="font-heading text-sm font-black text-slate-900 tracking-wider font-mono-numbers">
                  {vehicle.plate}
                </h3>
              </div>
            </div>
            <span className="bg-[#86f2e4]/30 text-[#006f66] border border-[#86f2e4] text-[10px] font-bold px-2 py-0.5 rounded-full font-sans uppercase">
              KCCA Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-sans text-[10px] text-slate-400 block font-medium">Municipal Zone</span>
              <span className="font-semibold text-slate-900">{site.municipalZone}</span>
            </div>
            <div>
              <span className="font-sans text-[10px] text-slate-400 block font-medium">Hourly Tariff</span>
              <span className="font-semibold text-slate-900 font-mono-numbers">{formatUGX(site.ratePerHour)} / hr</span>
            </div>
          </div>
        </div>

        {/* Duration Selector */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Select Parking Duration
            </label>
            <span className="text-xs text-[#1d68bd] font-semibold flex items-center gap-1 font-mono-numbers">
              <Clock className="w-3.5 h-3.5" />
              <span>Until {getEndTime()}</span>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((hrs) => (
              <button
                key={hrs}
                type="button"
                onClick={() => onChangeDuration(hrs)}
                className={`py-2.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                  durationHours === hrs
                    ? 'bg-[#1d68bd] text-white shadow-sm ring-2 ring-blue-600/30'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {hrs} {hrs === 1 ? 'Hour' : 'Hours'}
              </button>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={() => onChangeDuration(8)}
              className={`w-full py-2.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                durationHours === 8
                  ? 'bg-[#1d68bd] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Full Day Pass (8 Hours)
            </button>
          </div>
        </div>

        {/* Payment Breakdown Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Official Municipal Tariff Breakdown
          </h4>

          <div className="divide-y divide-slate-100 text-xs font-sans">
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">
                Tariff ({durationHours} hr{durationHours > 1 ? 's' : ''} × {formatUGX(site.ratePerHour)})
              </span>
              <span className="font-semibold text-slate-900 font-mono-numbers">
                {formatUGX(baseTariff)}
              </span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">KCCA Enforcement & Tech Fee</span>
              <span className="font-semibold text-slate-900 font-mono-numbers">
                {formatUGX(kccaFee)}
              </span>
            </div>

            <div className="flex justify-between py-1.5 items-center">
              <span className="text-slate-500">KiPay Convenience Fee</span>
              <span className="bg-[#86f2e4] text-[#006f66] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                FREE
              </span>
            </div>

            <div className="flex justify-between pt-2.5 text-sm items-center">
              <div>
                <span className="font-heading font-extrabold text-slate-900 block">Total Due</span>
                <span className="text-[10px] text-slate-400">Fixed KCCA rate applied</span>
              </div>
              <span className="font-heading text-xl font-extrabold text-[#1d68bd] font-mono-numbers">
                {formatUGX(totalDue)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Source Selection */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 font-sans">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Payment Method
          </label>

          <div className="space-y-2">
            <div
              onClick={() => setSelectedMethod('kipay')}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedMethod === 'kipay'
                  ? 'border-[#1d68bd] bg-blue-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#006a61] text-white flex items-center justify-center text-xs font-bold">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">KiPay Wallet</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">
                      Fastest
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono-numbers">
                    Available: {formatUGX(walletBalance)}
                  </span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  selectedMethod === 'kipay' ? 'bg-[#1d68bd] text-white' : 'border border-slate-300'
                }`}
              >
                {selectedMethod === 'kipay' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div
              onClick={() => setSelectedMethod('mtn')}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                selectedMethod === 'mtn'
                  ? 'border-[#1d68bd] bg-blue-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black">
                  MTN
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">MTN Mobile Money</span>
                  <span className="text-[10px] text-slate-500 block font-mono-numbers">+256 772 401 341</span>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  selectedMethod === 'mtn' ? 'bg-[#1d68bd] text-white' : 'border border-slate-300'
                }`}
              >
                {selectedMethod === 'mtn' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg">
        <button
          onClick={onConfirm}
          className="w-full py-3.5 bg-[#000000] hover:bg-slate-900 active:scale-98 text-white font-sans font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Confirm & Authorize Payment ({formatUGX(totalDue)})</span>
        </button>
      </div>
    </div>
  );
};
