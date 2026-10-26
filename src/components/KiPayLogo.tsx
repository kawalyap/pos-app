import React, { useState } from 'react';

interface KiPayLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const OFFICIAL_KIPAY_LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB9wiChBK8sLcoqKSjlKZv6rsQMMzULMW26ac7R15LIjY-_NRu6XaF81QSNy0hkm1cQujLuGCGYYUV-6HJDI8A7hXHusJNE8iGChYWDeoY_NxG4TUR1gkX3aILwkGl3PxwfASaLU0NTrC2l4XKVatn0ScWaEhFi5WoF4auaFDzGwKJmkHhLDdG9D_ygqzZrwdpgU4naX6fyNj-r8OxEi3k1-0YNVUCJiWv2n-jDEtxrkgoULLV6NNmGADW3oMa_yCgl';

export const KiPayLogo: React.FC<KiPayLogoProps> = ({
  className = '',
  size = 'md',
  showText = false
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative ${sizeMap[size]} shrink-0 flex items-center justify-center rounded-2xl overflow-hidden bg-white shadow-xs border border-blue-100/80 p-1`}
      >
        {!imageError ? (
          <img
            src={OFFICIAL_KIPAY_LOGO_URL}
            alt="KiPay Official Monogram"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          /* High-Fidelity SVG Fallback matching official KiPay blue/amber emblem */
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="64" height="64" rx="14" fill="#ffffff" />
            <path d="M16 12H28V52H16V12Z" fill="#1D68BD" />
            <path d="M48 14L32 30L48 46L48 52L26 32L48 12V14Z" fill="#1D68BD" />
            <path d="M48 16L34 30L48 44V16Z" fill="#F59E0B" />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-extrabold text-slate-900 tracking-tight leading-none text-base">
            KiPay
          </span>
          <span className="font-sans text-[10px] text-slate-500 font-semibold tracking-tight">
            Transit & Urban Payments
          </span>
        </div>
      )}
    </div>
  );
};

export const formatUGX = (amount: number): string => {
  return `UGX ${amount.toLocaleString('en-US')}`;
};
