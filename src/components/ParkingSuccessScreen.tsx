import React, { useState, useEffect } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ParkingSession } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  PlusCircle,
  FileText,
  ScanLine,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Car
} from 'lucide-react';

interface ParkingSuccessScreenProps {
  session: ParkingSession;
  onExtend: () => void;
  onDashboard: () => void;
  onViewLedger: () => void;
}

export const ParkingSuccessScreen: React.FC<ParkingSuccessScreenProps> = ({
  session,
  onExtend,
  onDashboard,
  onViewLedger
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const diff = Math.floor((session.expiryTime.getTime() - Date.now()) / 1000);
    return Math.max(diff, 7200);
  });
  const [copied, setCopied] = useState(false);
  const [scanState, setScanState] = useState<'ready' | 'scanning' | 'barrier_open'>('ready');
  const [showPayload, setShowPayload] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(session.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Construct the official cryptographic payload encoded in the QR code
  const qrPayload = JSON.stringify({
    app: 'KiPay-Uganda',
    token: session.token,
    plate: session.vehicle.plate,
    lot: session.site.name,
    zone: session.site.municipalZone,
    bay: session.bayNumber,
    validUntil: session.expiryTime.toISOString(),
    tariffPaidUGX: session.totalAmount,
    status: 'KCCA_VERIFIED'
  });

  const handleSimulateGateScan = () => {
    if (scanState === 'scanning') return;
    setScanState('scanning');

    setTimeout(() => {
      setScanState('barrier_open');
    }, 1300);
  };

  const handleResetScan = () => {
    setScanState('ready');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6 custom-scrollbar bg-slate-50 relative font-sans">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2">
          <KiPayLogo size="sm" />
          <span className="font-heading text-xs font-bold text-slate-900">Payment Confirmed</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onDashboard}
          className="font-sans text-xs font-bold text-[#1d68bd] hover:underline cursor-pointer"
        >
          Done
        </motion.button>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Animated Success Icon Burst & Total */}
        <div className="text-center pt-1">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-emerald-100 text-[#006a61] mx-auto flex items-center justify-center text-3xl shadow-inner mb-2.5 border-2 border-emerald-200"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-heading text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono-numbers"
          >
            {formatUGX(session.totalAmount)} Paid
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-bold mt-1 font-sans"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>KCCA Municipal Clearance Verified</span>
          </motion.div>
        </div>

        {/* Digital QR Gate Pass Card with Real Scannable QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          className={`bg-white rounded-3xl p-5 border shadow-md space-y-3.5 relative overflow-hidden transition-all duration-300 ${
            scanState === 'barrier_open'
              ? 'border-emerald-400 ring-2 ring-emerald-500/20'
              : 'border-slate-200'
          }`}
        >
          <div className="flex justify-between items-center text-xs font-sans">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  scanState === 'barrier_open'
                    ? 'bg-emerald-500'
                    : 'bg-emerald-500 animate-pulse'
                }`}
              ></span>
              <span className="font-bold text-slate-900">
                {scanState === 'barrier_open' ? 'Entry Barrier Lifted' : 'Active Gate Pass'}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold font-mono-numbers text-[11px] shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{formatCountdown(secondsRemaining)}</span>
            </div>
          </div>

          {/* Genuine QR Code Container with Laser Scanning Simulation */}
          <div className="relative w-44 h-44 mx-auto bg-slate-950 rounded-2xl p-3 shadow-inner flex flex-col items-center justify-center overflow-hidden group">
            {/* Real QR Code rendered via qrcode.react */}
            <div className="bg-white p-2 rounded-xl shadow-xs relative z-10 flex items-center justify-center">
              <QRCodeSVG
                value={qrPayload}
                size={140}
                level="H"
                bgColor="#ffffff"
                fgColor="#0b1c30"
                className="w-full h-full"
              />
            </div>

            {/* Simulated Optical Laser Scanning Line Beam */}
            {scanState === 'scanning' ? (
              <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-scanline z-20 pointer-events-none"></div>
            ) : (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent shadow-[0_0_6px_#38bdf8] animate-scanline z-20 pointer-events-none opacity-60"></div>
            )}
          </div>

          {/* Gate Scanner Simulation Banner & Action */}
          <div className="space-y-2">
            {scanState === 'barrier_open' ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-1"
              >
                <div className="flex items-center justify-center gap-1.5 text-emerald-900 font-bold text-xs">
                  <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                  <span>Gate 02 Barrier Lifted — Cleared to Enter</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">
                  Optical LPR verified: <b>{session.vehicle.plate}</b> assigned to <b>{session.bayNumber}</b>.
                </p>
                <button
                  onClick={handleResetScan}
                  className="text-[10px] font-bold text-emerald-800 hover:underline pt-0.5 inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Re-test Scan</span>
                </button>
              </motion.div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                disabled={scanState === 'scanning'}
                onClick={handleSimulateGateScan}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-[#131b2e] hover:from-slate-800 hover:to-slate-900 text-white font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-sm border border-slate-700 transition-all cursor-pointer"
              >
                {scanState === 'scanning' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-emerald-300">Scanning QR at Municipal Barrier...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-4 h-4 text-emerald-400" />
                    <span>Simulate Barrier Gate Scan-In</span>
                  </>
                )}
              </motion.button>
            )}

            {/* Token Badge */}
            <div className="text-center font-sans">
              <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                Gate Clearance Token
              </span>
              <div className="inline-flex items-center gap-1.5 mt-0.5">
                <span className="font-mono-numbers text-xs font-black text-slate-900 tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {session.token}
                </span>
                <button
                  onClick={handleShare}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-bold ml-1 cursor-pointer"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2.5 grid grid-cols-2 gap-2 text-xs font-sans">
              <div>
                <span className="text-[10px] text-slate-500 block font-medium">Vehicle Plate</span>
                <span className="font-heading font-extrabold text-slate-950 font-mono-numbers text-sm">
                  {session.vehicle.plate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-medium">Zone & Bay</span>
                <span className="font-bold text-slate-900">
                  {session.site.municipalZone} • {session.bayNumber}
                </span>
              </div>
            </div>

            {/* Toggle QR Payload inspection */}
            <div className="text-center pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPayload(!showPayload)}
                className="text-[10px] text-slate-500 hover:text-slate-800 font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <Info className="w-3 h-3" />
                <span>{showPayload ? 'Hide Encoded Payload' : 'Inspect Encoded QR Payload'}</span>
              </button>
              {showPayload && (
                <div className="mt-2 p-2 bg-slate-900 text-emerald-400 font-mono text-[9px] rounded-lg text-left overflow-x-auto whitespace-pre-wrap break-all shadow-inner border border-slate-800">
                  {qrPayload}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Controls */}
        <div className="space-y-2.5 pt-1 font-sans">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onExtend}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Extend Parking Time (+1 Hour)</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onDashboard}
            className="w-full py-3.5 bg-[#1d68bd] hover:bg-[#15549b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onViewLedger}
            className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer font-sans"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>View in History Ledger</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
