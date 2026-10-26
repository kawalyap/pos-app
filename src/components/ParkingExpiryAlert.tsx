import React, { useState, useEffect } from 'react';
import { ParkingSession } from '../types';
import { formatUGX } from './KiPayLogo';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  Clock,
  PlusCircle,
  X,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface ParkingExpiryAlertProps {
  session: ParkingSession | null;
  onExtend: () => void;
  onViewPass: () => void;
}

export const ParkingExpiryAlert: React.FC<ParkingExpiryAlertProps> = ({
  session,
  onExtend,
  onViewPass
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (!session) return 999999;
    return Math.max(0, Math.floor((session.expiryTime.getTime() - Date.now()) / 1000));
  });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!session) return;
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((session.expiryTime.getTime() - Date.now()) / 1000));
      setSecondsLeft(remaining);
      // If extended beyond 15m, un-dismiss for next time
      if (remaining > 900) {
        setIsDismissed(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [session, session?.expiryTime]);

  if (!session) return null;

  // Trigger alert when remaining time <= 15 minutes (900 seconds) and > 0
  const isExpiringSoon = secondsLeft > 0 && secondsLeft <= 900;

  if (!isExpiringSoon || isDismissed) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -60, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="absolute top-11 inset-x-2 z-50 pointer-events-auto"
      >
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white rounded-2xl p-3 shadow-xl border border-amber-500/50 relative overflow-hidden ring-2 ring-amber-500/30">
          {/* Subtle amber pulse bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 animate-pulse"></div>

          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-start gap-2.5 flex-1">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
              </div>

              <div className="flex-1 font-sans">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-heading text-xs font-black text-amber-300">
                    Parking Expiring Soon
                  </span>
                  <span className="bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] font-bold px-1.5 rounded font-mono-numbers">
                    {timeFormatted} left
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mt-0.5">
                  <b>{session.vehicle.plate}</b> at {session.site.name}.
                </p>

                <p className="text-[10px] text-amber-300/80 mt-0.5 flex items-center gap-1 font-medium">
                  <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>KCCA wardens active. Avoid UGX 20,000 overstay fine.</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              title="Dismiss Alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Actions Row */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onExtend}
              className="flex-1 py-1.5 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-sans"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Extend Time (+1 Hr · {formatUGX(session.site.ratePerHour)})</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onViewPass}
              className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors cursor-pointer shrink-0 font-sans"
            >
              <span>View Pass</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
