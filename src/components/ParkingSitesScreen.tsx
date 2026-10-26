import React, { useState } from 'react';
import { KiPayLogo, formatUGX } from './KiPayLogo';
import { ParkingSite } from '../types';
import { INITIAL_SITES } from '../data/mockData';
import { ParkingMapVisualizer } from './ParkingMapVisualizer';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Check,
  Search,
  Map as MapIcon,
  List
} from 'lucide-react';

interface ParkingSitesScreenProps {
  selectedSite: ParkingSite;
  onSelectSite: (site: ParkingSite) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const ParkingSitesScreen: React.FC<ParkingSitesScreenProps> = ({
  selectedSite,
  onSelectSite,
  onContinue,
  onBack
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeZoneFilter, setActiveZoneFilter] = useState('All');
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const zoneFilters = ['All', 'Central', 'CBD', 'Nakasero'];

  const filteredSites = INITIAL_SITES.filter((site) => {
    const matchesQuery =
      site.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      site.zone.toLowerCase().includes(filterQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(filterQuery.toLowerCase());

    if (activeZoneFilter === 'All') return matchesQuery;
    if (activeZoneFilter === 'Central') return matchesQuery && (site.name.includes('Jinja') || site.name.includes('Parliamentary'));
    if (activeZoneFilter === 'CBD') return matchesQuery && site.name.includes('Pioneer');
    if (activeZoneFilter === 'Nakasero') return matchesQuery && site.name.includes('Nakasero');
    return matchesQuery;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24 custom-scrollbar bg-[#f8f9ff] relative font-sans">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
          <div className="flex items-center gap-2">
            <KiPayLogo size="sm" />
            <h2 className="font-heading text-sm font-bold text-slate-900">Step 1: Site Selection</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowMiniMap(!showMiniMap)}
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
              showMiniMap
                ? 'bg-blue-50 text-[#1d68bd] border-blue-200'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title="Toggle Mini Map Visualizer"
          >
            <MapIcon className="w-3.5 h-3.5" />
          </motion.button>

          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-sans">
            Step 1 of 4
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Step Progress & Location Header */}
        <div className="flex items-center justify-between font-sans">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#1d68bd]" />
            <span>Kampala Central Municipal District</span>
          </div>
          <span className="text-[11px] text-slate-500 font-bold font-mono-numbers">
            {filteredSites.length} Active Lots
          </span>
        </div>

        {/* Mini Map Visualizer Component */}
        {showMiniMap && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ParkingMapVisualizer
              sites={filteredSites}
              selectedSite={selectedSite}
              onSelectSite={onSelectSite}
              isExpanded={isMapExpanded}
              onToggleExpand={() => setIsMapExpanded(!isMapExpanded)}
            />
          </motion.div>
        )}

        {/* Search Input */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 font-sans focus-within:ring-2 focus-within:ring-blue-600/30 focus-within:border-blue-600 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search lot name, street or zone..."
            className="w-full text-xs font-medium focus:outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="text-xs text-slate-400 hover:text-slate-700 px-1 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Zone Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-sans pb-0.5">
          {zoneFilters.map((zf) => (
            <motion.button
              whileTap={{ scale: 0.94 }}
              key={zf}
              onClick={() => setActiveZoneFilter(zf)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeZoneFilter === zf
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {zf}
            </motion.button>
          ))}
        </div>

        {/* Sites List */}
        <div className="space-y-2.5">
          {filteredSites.map((site) => {
            const isSelected = selectedSite.id === site.id;
            return (
              <motion.div
                whileTap={{ scale: 0.98 }}
                key={site.id}
                onClick={() => onSelectSite(site)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative shadow-2xs ${
                  isSelected
                    ? 'bg-blue-50/70 border-[#1d68bd] shadow-blue-500/10'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading text-xs font-extrabold text-slate-900">
                        {site.name}
                      </h3>
                      <span
                        className={`font-sans text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          site.status === 'open'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        {site.status === 'open' ? 'Open' : 'Limited'}
                      </span>
                    </div>

                    <p className="font-sans text-[11px] text-slate-600 mt-0.5 font-medium">
                      {site.zone} • <span className="font-bold text-emerald-700">{site.availableBays} bays free</span> of {site.totalBays}
                    </p>

                    <p className="font-sans text-[10px] text-slate-500 mt-0.5 line-clamp-1 font-normal">
                      {site.address}
                    </p>

                    <div className="mt-2 flex items-center gap-2 font-sans">
                      <span className="font-heading text-xs font-extrabold text-[#1d68bd] font-mono-numbers">
                        {formatUGX(site.ratePerHour)} / hr
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">· {site.distance}</span>
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
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg font-sans">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2 px-1">
          <span>Selected: <b className="text-slate-900 font-bold">{selectedSite.name}</b></span>
          <span className="font-heading font-extrabold text-[#1d68bd] font-mono-numbers">{formatUGX(selectedSite.ratePerHour)}/hr</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-3.5 bg-[#1d68bd] hover:bg-[#15549b] text-white font-sans font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Continue to Vehicle Entry</span>
          <span>→</span>
        </motion.button>
      </div>
    </div>
  );
};
