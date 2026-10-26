import React, { useState } from 'react';
import { KiPayLogo } from './KiPayLogo';
import { ParkingSite, Vehicle } from '../types';
import { ArrowLeft, Car, Plus, AlertTriangle, Check, Shield } from 'lucide-react';

interface ParkingVehicleScreenProps {
  selectedSite: ParkingSite;
  selectedVehicle: Vehicle;
  savedVehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onAddVehicle: (newVehicle: Vehicle) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ParkingVehicleScreen: React.FC<ParkingVehicleScreenProps> = ({
  selectedSite,
  selectedVehicle,
  savedVehicles,
  onSelectVehicle,
  onAddVehicle,
  onContinue,
  onBack
}) => {
  const [newPlate, setNewPlate] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newColor, setNewColor] = useState('White');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddNewPlate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate.trim()) return;

    const formattedPlate = newPlate.trim().toUpperCase();
    const created: Vehicle = {
      plate: formattedPlate,
      model: newModel.trim() || 'Custom Vehicle',
      color: newColor
    };
    onAddVehicle(created);
    onSelectVehicle(created);
    setNewPlate('');
    setNewModel('');
    setShowAddForm(false);
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
            <h2 className="font-heading text-sm font-bold text-slate-900">Step 2: Vehicle Entry</h2>
          </div>
        </div>

        <span className="font-sans text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
          Step 2 of 4
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Selected Lot Chip */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1d68bd] font-bold flex items-center justify-center text-xs">
              P
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase font-bold text-slate-400">Target Lot</p>
              <h3 className="font-heading text-xs font-bold text-slate-900">{selectedSite.name}</h3>
            </div>
          </div>
          <button
            onClick={onBack}
            className="font-sans text-[11px] font-bold text-[#1d68bd] hover:underline cursor-pointer"
          >
            Change
          </button>
        </div>

        {/* Saved Vehicles Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Select Vehicle
            </label>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="font-sans text-xs font-bold text-[#1d68bd] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel' : 'Add New'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {savedVehicles.map((vehicle) => {
              const isSelected = selectedVehicle.plate === vehicle.plate;
              return (
                <div
                  key={vehicle.plate}
                  onClick={() => onSelectVehicle(vehicle)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-2xs flex items-center justify-between active:scale-[0.99] ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#1d68bd] shadow-blue-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs border border-amber-500 shadow-2xs font-mono-numbers tracking-wider">
                      UG
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading text-sm font-extrabold text-slate-900 tracking-wider font-mono-numbers">
                          {vehicle.plate}
                        </h4>
                        {vehicle.isDefault && (
                          <span className="font-sans text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-[11px] text-slate-500 mt-0.5">
                        {vehicle.model} • {vehicle.color}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#1d68bd] text-white shadow-xs'
                        : 'border-2 border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add New Vehicle Form Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddNewPlate}
            className="p-4 bg-white rounded-2xl border-2 border-blue-500 shadow-md space-y-3 animate-in fade-in duration-200 font-sans"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-heading text-xs font-bold text-slate-900">Add New Vehicle Plate</h4>
              <span className="font-sans text-[10px] text-slate-400 font-medium">KCCA Auto-Check</span>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Plate Number (e.g. UBF 214X, UAX 890Y)
              </label>
              <input
                type="text"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value.toUpperCase())}
                placeholder="UBF 214X"
                maxLength={9}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-black tracking-widest text-slate-900 focus:outline-none focus:border-blue-600 font-mono-numbers"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Model
                </label>
                <input
                  type="text"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="e.g. Toyota RAV4"
                  className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="e.g. Silver"
                  className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#1d68bd] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#15549b] transition-colors cursor-pointer"
            >
              Save & Use This Vehicle
            </button>
          </form>
        )}

        {/* Official KCCA Notice */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2.5 font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Ensure your vehicle plate matches municipal enforcement cameras on site. License plates are linked in real-time to KCCA parking wardens.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg font-sans">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
          <span>Vehicle: <b className="text-slate-800 font-mono-numbers">{selectedVehicle.plate}</b></span>
          <span className="text-[11px] text-slate-400 font-medium">{selectedVehicle.model}</span>
        </div>
        <button
          onClick={onContinue}
          className="w-full py-3.5 bg-[#1d68bd] hover:bg-[#15549b] text-white font-sans font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
        >
          <span>Continue to Review & Tariff</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
