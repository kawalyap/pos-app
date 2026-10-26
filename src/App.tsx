/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenView, ParkingSite, Vehicle, Transaction, ParkingSession } from './types';
import {
  INITIAL_SITES,
  INITIAL_VEHICLES,
  INITIAL_TRANSACTIONS
} from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { HomeDashboardScreen } from './components/HomeDashboardScreen';
import { PayMerchantsScreen } from './components/PayMerchantsScreen';
import { ParkingSitesScreen } from './components/ParkingSitesScreen';
import { ParkingVehicleScreen } from './components/ParkingVehicleScreen';
import { ParkingReviewScreen } from './components/ParkingReviewScreen';
import { ParkingConfirmModal } from './components/ParkingConfirmModal';
import { ParkingSuccessScreen } from './components/ParkingSuccessScreen';
import { DepositScreen } from './components/DepositScreen';
import { TransferScreen } from './components/TransferScreen';
import { UtilitiesScreen } from './components/UtilitiesScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FlowController } from './components/FlowController';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { ParkingExpiryAlert } from './components/ParkingExpiryAlert';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Clock,
  User,
  Wifi,
  SlidersHorizontal,
  Car,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState<ScreenView>('login');
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(true);
  const [showMobileController, setShowMobileController] = useState<boolean>(false);

  // App Data State
  const [walletBalance, setWalletBalance] = useState<number>(482500);
  const [sites, setSites] = useState<ParkingSite[]>(INITIAL_SITES);
  const [selectedSite, setSelectedSite] = useState<ParkingSite>(INITIAL_SITES[0]);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(INITIAL_VEHICLES[0]);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTxDetail, setSelectedTxDetail] = useState<Transaction | null>(null);

  // Active Parking Session state
  const [activeSession, setActiveSession] = useState<ParkingSession | null>(null);

  // Real-time status bar clock
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const minFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setCurrentTimeStr(`${hours}:${minFormatted}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 20000);
    return () => clearInterval(interval);
  }, []);

  const calculateTotal = (site: ParkingSite, hours: number) => {
    const base = site.ratePerHour * hours;
    const fee = 200; // KCCA fee
    return base + fee;
  };

  const handleAuthorizeParking = () => {
    const total = calculateTotal(selectedSite, durationHours);
    const now = new Date();
    const expiry = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

    const newSession: ParkingSession = {
      site: selectedSite,
      vehicle: selectedVehicle,
      durationHours: durationHours,
      startTime: now,
      expiryTime: expiry,
      totalAmount: total,
      token: `KP-7719-${selectedVehicle.plate.replace(/\s+/g, '')}`,
      bayNumber: 'Bay 42',
      status: 'active'
    };

    setActiveSession(newSession);

    // Deduct from wallet balance
    setWalletBalance((prev) => Math.max(0, prev - total));

    // Add to transaction ledger
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `${selectedSite.name}`,
      subtitle: `Today, ${currentTimeStr} · ${selectedVehicle.plate} · ${durationHours}h`,
      category: 'parking',
      amount: total,
      type: 'debit',
      timestamp: `Today, ${currentTimeStr}`,
      token: newSession.token,
      status: 'completed',
      details: {
        Zone: selectedSite.municipalZone,
        Vehicle: `${selectedVehicle.plate} (${selectedVehicle.model})`,
        Duration: `${durationHours} Hours`,
        Enforcement: 'KCCA Verified Clearance'
      }
    };

    setTransactions((prev) => [newTx, ...prev]);
    setCurrentView('parking-success');
  };

  const handleExtendParking = () => {
    if (!activeSession) return;
    const extensionFee = activeSession.site.ratePerHour;
    // When extended, add 1 hour from current expiry or now
    const baseTime = activeSession.expiryTime.getTime() > Date.now() ? activeSession.expiryTime.getTime() : Date.now();
    const newExpiry = new Date(baseTime + 60 * 60 * 1000);

    setActiveSession({
      ...activeSession,
      durationHours: activeSession.durationHours + 1,
      expiryTime: newExpiry,
      totalAmount: activeSession.totalAmount + extensionFee
    });

    setWalletBalance((prev) => Math.max(0, prev - extensionFee));

    const extendTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Extend Parking (${activeSession.vehicle.plate})`,
      subtitle: `Today, ${currentTimeStr} · +1 Hour Extension`,
      category: 'parking',
      amount: extensionFee,
      type: 'debit',
      timestamp: `Today, ${currentTimeStr}`,
      token: activeSession.token,
      status: 'completed',
      details: {
        Lot: activeSession.site.name,
        Extension: '+1 Hour Added',
        NewExpiry: newExpiry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };
    setTransactions((prev) => [extendTx, ...prev]);
  };

  // Trigger 15-Minute Expiry Alert Simulation
  const handleTrigger15mAlert = () => {
    const now = new Date();
    const exp14m45s = new Date(now.getTime() + (14 * 60 + 45) * 1000);

    if (activeSession) {
      setActiveSession({
        ...activeSession,
        expiryTime: exp14m45s
      });
    } else {
      // Create session with 14m 45s left
      const newSession: ParkingSession = {
        site: selectedSite,
        vehicle: selectedVehicle,
        durationHours: 1,
        startTime: new Date(now.getTime() - 45 * 60 * 1000),
        expiryTime: exp14m45s,
        totalAmount: 3200,
        token: `KP-7719-${selectedVehicle.plate.replace(/\s+/g, '')}`,
        bayNumber: 'Bay 42',
        status: 'active'
      };
      setActiveSession(newSession);
    }
  };

  const handleDepositSuccess = (amount: number, source: string) => {
    setWalletBalance((prev) => prev + amount);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Deposit via ${source.split(' ')[0]}`,
      subtitle: `Today, ${currentTimeStr} · ${source}`,
      category: 'deposit',
      amount: amount,
      type: 'credit',
      timestamp: `Today, ${currentTimeStr}`,
      status: 'completed',
      details: {
        Source: source,
        Status: 'Credited to KiPay Wallet'
      }
    };
    setTransactions((prev) => [newTx, ...prev]);
    setCurrentView('dashboard');
  };

  const handleTransferSuccess = (recipient: string, amount: number, note: string) => {
    setWalletBalance((prev) => Math.max(0, prev - amount));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `Transfer to ${recipient}`,
      subtitle: `Today, ${currentTimeStr} · ${note || 'P2P Transfer'}`,
      category: 'transfer',
      amount: amount,
      type: 'debit',
      timestamp: `Today, ${currentTimeStr}`,
      status: 'completed',
      details: {
        Recipient: recipient,
        Note: note || 'Peer-to-peer transfer'
      }
    };
    setTransactions((prev) => [newTx, ...prev]);
    setCurrentView('dashboard');
  };

  const handlePayUtilitySuccess = (title: string, amount: number, details: Record<string, string>) => {
    setWalletBalance((prev) => Math.max(0, prev - amount));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: title,
      subtitle: `Today, ${currentTimeStr} · ${details.Token ? 'Power Token' : 'Water Bill'}`,
      category: 'utility',
      amount: amount,
      type: 'debit',
      timestamp: `Today, ${currentTimeStr}`,
      status: 'completed',
      details: details
    };
    setTransactions((prev) => [newTx, ...prev]);
    setCurrentView('dashboard');
  };

  const handlePayMerchant = (merchantName: string, amount: number) => {
    setWalletBalance((prev) => Math.max(0, prev - amount));
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: merchantName,
      subtitle: `Today, ${currentTimeStr} · Direct Settlement`,
      category: 'merchant',
      amount: amount,
      type: 'debit',
      timestamp: `Today, ${currentTimeStr}`,
      status: 'completed',
      details: {
        Merchant: merchantName,
        Settlement: 'Direct Instant POS'
      }
    };
    setTransactions((prev) => [newTx, ...prev]);
    setCurrentView('dashboard');
  };

  const handleResetData = () => {
    setWalletBalance(482500);
    setSites(INITIAL_SITES);
    setSelectedSite(INITIAL_SITES[0]);
    setVehicles(INITIAL_VEHICLES);
    setSelectedVehicle(INITIAL_VEHICLES[0]);
    setDurationHours(2);
    setTransactions(INITIAL_TRANSACTIONS);
    setActiveSession(null);
    setCurrentView('login');
  };

  const showBottomTabs =
    currentView === 'dashboard' || currentView === 'history' || currentView === 'profile';

  // Check if session has <= 15 minutes left
  const isSessionExpiringSoon =
    !!activeSession &&
    (activeSession.expiryTime.getTime() - Date.now()) > 0 &&
    (activeSession.expiryTime.getTime() - Date.now()) <= 900000;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-5 lg:p-8 font-sans selection:bg-[#1d68bd] selection:text-white">
      {/* Mobile Top Floating Quick-Switcher bar */}
      <div className="w-full max-w-5xl flex items-center justify-between pb-3 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="font-heading text-xs font-bold text-white tracking-tight">KiPay Flow</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowMobileController(!showMobileController)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400 flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showMobileController ? 'Close Flow Controller' : 'Flow Controller'}</span>
        </motion.button>
      </div>

      {/* Main Dual-Panel Container */}
      <div
        className={`w-full max-w-5xl flex flex-col lg:flex-row gap-6 sm:gap-8 items-center lg:items-start justify-center ${
          !isDeviceFrame ? 'max-w-4xl' : ''
        }`}
      >
        {/* Mobile Device Frame OR Full-Viewport Canvas */}
        <div
          className={`relative w-full transition-all duration-300 ${
            isDeviceFrame
              ? 'max-w-[392px] h-[830px] bg-slate-900 rounded-[52px] p-3 shadow-2xl ring-1 ring-slate-700/80 shadow-blue-950/60 flex flex-col justify-between shrink-0 border border-slate-800'
              : 'max-w-2xl h-[800px] bg-slate-900 rounded-3xl p-2.5 shadow-2xl ring-1 ring-slate-800'
          }`}
        >
          {/* Animated Interactive Dynamic Island Notch */}
          {isDeviceFrame && (
            <motion.div
              layout
              onClick={() => {
                if (activeSession) setCurrentView('parking-success');
              }}
              className={`absolute top-3.5 left-1/2 -translate-x-1/2 z-50 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isSessionExpiringSoon
                  ? 'h-6 px-3 gap-2 min-w-[140px] bg-amber-950 border border-amber-500/80 shadow-amber-900/40'
                  : activeSession
                  ? 'h-6 px-3 gap-2 min-w-[130px] bg-black border border-blue-900/60'
                  : 'w-28 h-5 gap-2 bg-black'
              }`}
            >
              {activeSession ? (
                <>
                  {isSessionExpiringSoon ? (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                      <span className="text-[10px] font-bold text-amber-300 font-mono-numbers">
                        15m Warning
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    </>
                  ) : (
                    <>
                      <Car className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-white font-mono-numbers">
                        {selectedVehicle.plate}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-950/80"></div>
                </>
              )}
            </motion.div>
          )}

          {/* Phone Screen Viewport */}
          <div
            id="phone-screen"
            className={`relative w-full h-full bg-[#f8f9ff] text-slate-900 overflow-hidden flex flex-col shadow-inner select-none ${
              isDeviceFrame ? 'rounded-[42px]' : 'rounded-2xl'
            }`}
          >
            {/* Native Status Bar */}
            <div className="h-10 pt-2.5 px-6 flex items-center justify-between text-xs font-semibold text-slate-700 shrink-0 z-40 select-none">
              <span className="font-mono-numbers font-bold text-[12px]">{currentTimeStr}</span>
              <div className="flex items-center gap-1.5 opacity-90 text-[11px] font-sans">
                <span className="font-bold">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <div className="w-4 h-2 rounded-2xs border border-slate-700 p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-800 rounded-3xs"></div>
                </div>
              </div>
            </div>

            {/* 15-Minute Expiry Alert Notification Banner Component */}
            <ParkingExpiryAlert
              session={activeSession}
              onExtend={handleExtendParking}
              onViewPass={() => setCurrentView('parking-success')}
            />

            {/* Dynamic Screen View with Motion Transitions */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col overflow-hidden"
                >
                  {/* SCREEN 1: LOGIN */}
                  {currentView === 'login' && (
                    <LoginScreen
                      onLogin={() => setCurrentView('dashboard')}
                      onQuickParking={() => setCurrentView('parking-sites')}
                    />
                  )}

                  {/* SCREEN 2: HOME DASHBOARD */}
                  {currentView === 'dashboard' && (
                    <HomeDashboardScreen
                      balance={walletBalance}
                      activeSession={activeSession}
                      recentTransactions={transactions}
                      onNavigate={(v) => setCurrentView(v)}
                      onViewTransaction={(tx) => setSelectedTxDetail(tx)}
                    />
                  )}

                  {/* SCREEN 3: PAY — MERCHANT SELECTION */}
                  {currentView === 'merchants' && (
                    <PayMerchantsScreen
                      onBack={() => setCurrentView('dashboard')}
                      onSelectParking={() => setCurrentView('parking-sites')}
                      onPayMerchant={handlePayMerchant}
                    />
                  )}

                  {/* SCREEN 4: MYPARKING STEP 1 - SITE SELECTION */}
                  {currentView === 'parking-sites' && (
                    <ParkingSitesScreen
                      selectedSite={selectedSite}
                      onSelectSite={(site) => setSelectedSite(site)}
                      onContinue={() => setCurrentView('parking-vehicle')}
                      onBack={() => setCurrentView('dashboard')}
                    />
                  )}

                  {/* SCREEN 5: MYPARKING STEP 2 - VEHICLE ENTRY */}
                  {currentView === 'parking-vehicle' && (
                    <ParkingVehicleScreen
                      selectedSite={selectedSite}
                      selectedVehicle={selectedVehicle}
                      savedVehicles={vehicles}
                      onSelectVehicle={(v) => setSelectedVehicle(v)}
                      onAddVehicle={(newV) => setVehicles((prev) => [newV, ...prev])}
                      onContinue={() => setCurrentView('parking-review')}
                      onBack={() => setCurrentView('parking-sites')}
                    />
                  )}

                  {/* SCREEN 6: MYPARKING STEP 3 - REVIEW & TARIFF */}
                  {currentView === 'parking-review' && (
                    <ParkingReviewScreen
                      site={selectedSite}
                      vehicle={selectedVehicle}
                      durationHours={durationHours}
                      walletBalance={walletBalance}
                      onChangeDuration={(hrs) => setDurationHours(hrs)}
                      onConfirm={() => setCurrentView('parking-confirm')}
                      onBack={() => setCurrentView('parking-vehicle')}
                    />
                  )}

                  {/* SCREEN 7: STEP 4A - PIN CONFIRMATION BOTTOM SHEET MODAL */}
                  {currentView === 'parking-confirm' && (
                    <>
                      <div className="opacity-30 pointer-events-none select-none h-full overflow-hidden blur-[1px]">
                        <ParkingReviewScreen
                          site={selectedSite}
                          vehicle={selectedVehicle}
                          durationHours={durationHours}
                          walletBalance={walletBalance}
                          onChangeDuration={() => {}}
                          onConfirm={() => {}}
                          onBack={() => {}}
                        />
                      </div>

                      <ParkingConfirmModal
                        site={selectedSite}
                        vehicle={selectedVehicle}
                        durationHours={durationHours}
                        totalAmount={calculateTotal(selectedSite, durationHours)}
                        walletBalance={walletBalance}
                        onAuthorize={handleAuthorizeParking}
                        onCancel={() => setCurrentView('parking-review')}
                      />
                    </>
                  )}

                  {/* SCREEN 8: STEP 4B - GATE PASS & RECEIPT */}
                  {currentView === 'parking-success' && activeSession && (
                    <ParkingSuccessScreen
                      session={activeSession}
                      onExtend={handleExtendParking}
                      onDashboard={() => setCurrentView('dashboard')}
                      onViewLedger={() => setCurrentView('history')}
                    />
                  )}

                  {/* SCREEN 9: DEPOSIT FUNDS */}
                  {currentView === 'deposit' && (
                    <DepositScreen
                      onBack={() => setCurrentView('dashboard')}
                      onSuccess={handleDepositSuccess}
                    />
                  )}

                  {/* SCREEN 10: TRANSFER MONEY */}
                  {currentView === 'transfer' && (
                    <TransferScreen
                      balance={walletBalance}
                      onBack={() => setCurrentView('dashboard')}
                      onTransfer={handleTransferSuccess}
                    />
                  )}

                  {/* SCREEN 11: UTILITIES BILL PAY */}
                  {currentView === 'utilities' && (
                    <UtilitiesScreen
                      onBack={() => setCurrentView('dashboard')}
                      onPayUtility={handlePayUtilitySuccess}
                    />
                  )}

                  {/* SCREEN 12: TRANSACTION HISTORY */}
                  {currentView === 'history' && (
                    <HistoryScreen
                      transactions={transactions}
                      onBack={() => setCurrentView('dashboard')}
                      onViewDetails={(tx) => setSelectedTxDetail(tx)}
                    />
                  )}

                  {/* SCREEN 13: PROFILE & SECURITY */}
                  {currentView === 'profile' && (
                    <ProfileScreen
                      vehicles={vehicles}
                      onBack={() => setCurrentView('dashboard')}
                      onLogout={() => setCurrentView('login')}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Persistent Bottom Tab Bar */}
            {showBottomTabs && (
              <div className="h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 flex items-center justify-around shrink-0 z-40">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    currentView === 'dashboard' ? 'text-[#1d68bd]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-sans text-[10px] font-bold">Home</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setCurrentView('history')}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    currentView === 'history' ? 'text-[#1d68bd]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-sans text-[10px] font-bold">Activity</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setCurrentView('profile')}
                  className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                    currentView === 'profile' ? 'text-[#1d68bd]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-sans text-[10px] font-bold">Profile</span>
                </motion.button>
              </div>
            )}

            {/* Phone Home Indicator Bar */}
            {isDeviceFrame && (
              <div className="w-full flex justify-center py-1 bg-white/60 pointer-events-none">
                <div className="w-32 h-1 rounded-full bg-slate-300"></div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Companion Flow Controller */}
        <div
          className={`w-full lg:w-96 flex flex-col gap-4 ${
            showMobileController ? 'block' : 'hidden lg:flex'
          }`}
        >
          <FlowController
            currentView={currentView}
            isDeviceFrame={isDeviceFrame}
            walletBalance={walletBalance}
            selectedVehiclePlate={selectedVehicle.plate}
            hasActivePass={!!activeSession}
            onNavigate={(view) => {
              setCurrentView(view);
              setShowMobileController(false);
            }}
            onToggleFrame={() => setIsDeviceFrame(!isDeviceFrame)}
            onResetData={handleResetData}
            onTrigger15mAlert={handleTrigger15mAlert}
          />
        </div>
      </div>

      {/* Transaction Detail Receipt Modal */}
      <TransactionDetailModal
        transaction={selectedTxDetail}
        onClose={() => setSelectedTxDetail(null)}
      />
    </div>
  );
}
