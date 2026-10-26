import React, { useState } from 'react';
import { KiPayLogo } from './KiPayLogo';
import { ArrowRight, Fingerprint, Eye, EyeOff, ShieldCheck, Car } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onQuickParking: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onQuickParking }) => {
  const [phone, setPhone] = useState('+256 700 892 110');
  const [pin, setPin] = useState('1234');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 450);
  };

  const handleBiometric = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 400);
  };

  return (
    <div className="flex flex-col justify-between h-full px-5 py-6 bg-gradient-to-b from-[#f8f9ff] via-[#eff4ff] to-[#e5eeff] relative overflow-y-auto no-scrollbar font-sans">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mt-3">
        <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-blue-900/10 flex items-center justify-center p-3 mb-3 border border-blue-100 ring-4 ring-blue-50/50">
          <KiPayLogo size="lg" />
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
          KiPay
        </h1>
        <p className="font-sans text-xs text-slate-500 mt-1 font-medium max-w-[240px]">
          Smart Urban Payments & Transit Hub
        </p>
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100/70 border border-blue-200/50 text-[11px] font-semibold text-blue-900">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1d68bd]" />
          <span>KCCA Municipal Certified</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-3xl p-5 shadow-lg shadow-slate-200/60 border border-slate-200/80 my-4 space-y-4">
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                Phone or KiPay ID
              </label>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 font-sans">
                Uganda (+256)
              </span>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+256 700 000 000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-mono-numbers"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                Security PIN
              </label>
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 font-sans cursor-pointer"
              >
                {showPin ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPin ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              maxLength={6}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-mono-numbers"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#1d68bd] hover:bg-[#15549b] active:scale-[0.98] text-white font-sans font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Log In to KiPay</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 font-sans">
          <button
            type="button"
            onClick={onQuickParking}
            className="text-[#1d68bd] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Quick Parking Access</span>
          </button>
          <button
            type="button"
            onClick={() => setShowForgotNotice(true)}
            className="hover:underline text-slate-400 font-medium cursor-pointer"
          >
            Forgot PIN?
          </button>
        </div>

        {showForgotNotice && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 flex justify-between items-center font-sans">
            <span>Demo PIN is <b>1234</b>. Use Instant Biometric or Log In directly.</span>
            <button
              onClick={() => setShowForgotNotice(false)}
              className="text-blue-700 font-bold ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Biometric & Demo Footer */}
      <div className="text-center pb-2 font-sans">
        <button
          type="button"
          onClick={handleBiometric}
          disabled={isLoading}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2 mx-auto py-2 px-3 rounded-full hover:bg-white/60 transition-colors cursor-pointer"
        >
          <Fingerprint className="w-5 h-5 text-[#006a61]" />
          <span>Instant Biometric Sign In (Face ID)</span>
        </button>
        <p className="text-[10px] text-slate-400 mt-1">
          Connected to KCCA Municipal & Bank Gateway
        </p>
      </div>
    </div>
  );
};
