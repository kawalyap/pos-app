import React, { useState } from 'react';
import { formatUGX } from './KiPayLogo';
import { ParkingSite, Vehicle } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Fingerprint,
  Delete,
  MapPin,
  Clock,
  Wallet,
  Tag
} from 'lucide-react';

interface ParkingConfirmModalProps {
  site: ParkingSite;
  vehicle: Vehicle;
  durationHours: number;
  totalAmount: number;
  walletBalance: number;
  onAuthorize: () => void;
  onCancel: () => void;
}

export const ParkingConfirmModal: React.FC<ParkingConfirmModalProps> = ({
  site,
  vehicle,
  durationHours,
  totalAmount,
  walletBalance,
  onAuthorize,
  onCancel
}) => {
  const [pin, setPin] = useState('123'); // 3 dots pre-filled like in reference
  const [isProcessing, setIsProcessing] = useState(false);

  const getEndTime = () => {
    const end = new Date();
    end.setHours(end.getHours() + durationHours);
    let hours = end.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const mins = end.getMinutes().toString().padStart(2, '0');
    return `${hours}:${mins} ${ampm}`;
  };

  const handleKeyClick = (digit: string) => {
    if (pin.length < 4) {
      const updated = pin + digit;
      setPin(updated);
      if (updated.length === 4) {
        triggerAuthorize();
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const triggerAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAuthorize();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Modal Backdrop Scrim with fade animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-[#213145]/50 backdrop-blur-[2px] transition-opacity"
      />

      {/* Payment Confirmation Bottom Sheet with spring slide up */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="relative z-50 w-full max-w-lg mx-auto bg-white rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden pb-safe max-h-[94vh]"
      >
        {/* Top Grab Handle */}
        <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        <div className="px-5 pt-1 pb-4 overflow-y-auto custom-scrollbar space-y-3.5 font-sans">
          {/* Header & Badges */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5eeff] text-[#0b1c30] mb-2 border border-blue-100">
              <ShieldCheck className="w-4 h-4 text-[#006a61]" />
              <span className="font-sans text-[11px] font-bold tracking-wide">
                Encrypted KCCA Transaction
              </span>
            </div>

            <h2 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">
              Confirm Parking Payment
            </h2>

            {/* Target Merchant & Plate Tile */}
            <div className="flex items-center justify-center gap-2 mt-1.5 text-slate-700 text-xs font-sans">
              <span className="font-bold text-slate-900">MyParking Uganda</span>
              <span className="text-slate-400">•</span>
              <span className="bg-[#dce9ff] px-2.5 py-0.5 rounded font-mono font-bold text-[#0b1c30] tracking-wider text-[12px] border border-blue-200">
                {vehicle.plate}
              </span>
            </div>
          </div>

          {/* Total Amount Hero Panel */}
          <div className="bg-[#eff4ff] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs border border-[#dce9ff]">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Authorized Total Charge
            </span>
            <div className="flex items-baseline justify-center gap-1.5 mt-0.5">
              <span className="font-sans text-xs font-bold text-[#006a61]">UGX</span>
              <span className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight font-mono-numbers">
                {totalAmount.toLocaleString('en-US')}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[#006a61] font-sans text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Official Tariff Rate Applied</span>
            </div>
          </div>

          {/* Breakdown Summary List with Crisp High-Contrast Typography */}
          <div className="space-y-2.5 font-sans text-xs divide-y divide-slate-100 px-1">
            <div className="flex justify-between items-center pt-1">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="font-medium">Parking Zone</span>
              </div>
              <span className="font-bold text-slate-900">{site.municipalZone}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="font-medium">Duration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">{durationHours} Hours</span>
                <span className="text-slate-500 text-[11px] font-medium">(until {getEndTime()})</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Wallet className="w-4 h-4 text-slate-500" />
                <span className="font-medium">Payment Method</span>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                  <span className="font-bold text-slate-900">KiPay Wallet</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono-numbers font-medium">
                  Bal: {formatUGX(walletBalance)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Tag className="w-4 h-4 text-slate-500" />
                <span className="font-medium">Convenience Fee</span>
              </div>
              <span className="bg-[#86f2e4] text-[#006f66] font-sans text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                FREE
              </span>
            </div>
          </div>

          {/* Security PIN & Biometric Authorization Container */}
          <div className="p-4 rounded-2xl bg-[#e5eeff] border border-[#dce9ff] flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-slate-900 font-sans text-xs font-bold mb-3">
              <Lock className="w-4 h-4 text-[#006a61]" />
              <span>Enter 4-digit KiPay Security PIN</span>
            </div>

            {/* 4-digit PIN Dots with dynamic animations */}
            <div className="flex items-center gap-4 py-1 mb-3">
              {[0, 1, 2, 3].map((index) => {
                const isFilled = index < pin.length;
                const isCurrent = index === pin.length;
                return (
                  <motion.div
                    key={index}
                    animate={isFilled ? { scale: [1, 1.25, 1] } : {}}
                    transition={{ duration: 0.15 }}
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                      isFilled
                        ? 'bg-slate-950 shadow-xs ring-1 ring-slate-800'
                        : isCurrent
                        ? 'bg-[#d3e4fe] border-2 border-[#1d68bd] animate-pulse ring-2 ring-blue-400/30'
                        : 'bg-[#cbdbf5]'
                    }`}
                  >
                    {isFilled && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </motion.div>
                );
              })}
            </div>

            {/* Numeric Keypad with tactile spring physics */}
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-[260px] text-sm font-bold text-slate-900">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <motion.button
                  key={digit}
                  whileTap={{ scale: 0.92, backgroundColor: '#f1f5f9' }}
                  type="button"
                  onClick={() => handleKeyClick(digit)}
                  className="py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all font-mono-numbers cursor-pointer text-slate-950 font-bold"
                >
                  {digit}
                </motion.button>
              ))}

              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={triggerAuthorize}
                className="py-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xs font-bold cursor-pointer"
                title="Use Biometrics"
              >
                <Fingerprint className="w-4 h-4 text-[#006a61]" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92, backgroundColor: '#f1f5f9' }}
                type="button"
                onClick={() => handleKeyClick('0')}
                className="py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all font-mono-numbers cursor-pointer text-slate-950 font-bold"
              >
                0
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={handleDelete}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                title="Backspace"
              >
                <Delete className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Biometric Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={triggerAuthorize}
              className="mt-3.5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-50 transition-colors shadow-xs border border-slate-200 font-sans text-xs font-bold cursor-pointer"
            >
              <Fingerprint className="w-4 h-4 text-[#006a61]" />
              <span>Touch ID or Face ID</span>
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="pt-1 pb-1 space-y-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              disabled={isProcessing}
              onClick={triggerAuthorize}
              className="w-full h-12 rounded-xl bg-[#000000] hover:bg-slate-900 text-white font-sans font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {isProcessing ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Authorize Payment ({formatUGX(totalAmount)})</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancel}
              className="w-full h-11 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-slate-700 font-sans font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer"
            >
              Cancel Transaction
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
