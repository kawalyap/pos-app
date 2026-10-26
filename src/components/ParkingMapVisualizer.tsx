import React, { useState } from 'react';
import { ParkingSite } from '../types';
import { formatUGX } from './KiPayLogo';
import { motion, AnimatePresence } from 'motion/react';
import {
  Navigation2,
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface ParkingMapVisualizerProps {
  sites: ParkingSite[];
  selectedSite: ParkingSite;
  onSelectSite: (site: ParkingSite) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

// Map coordinates mapped to SVG viewport 360 x 240
const SITE_COORDINATES: Record<string, { x: number; y: number; labelPos: 'top' | 'bottom' }> = {
  'kca-01': { x: 220, y: 110, labelPos: 'top' }, // City Centre Lot A (Jinja Rd)
  'kca-02': { x: 180, y: 175, labelPos: 'bottom' }, // Parliamentary Ave
  'kca-04': { x: 105, y: 145, labelPos: 'bottom' }, // Pioneer Mall CBD
  'kca-08': { x: 130, y: 65, labelPos: 'top' }, // Nakasero Hill
  'kca-11': { x: 285, y: 85, labelPos: 'top' } // Garden City Deck
};

export const ParkingMapVisualizer: React.FC<ParkingMapVisualizerProps> = ({
  sites,
  selectedSite,
  onSelectSite,
  isExpanded = false,
  onToggleExpand
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showZones, setShowZones] = useState(true);

  // User simulated GPS coordinates in Kampala Central
  const userLoc = { x: 170, y: 125 };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 bg-[#eef3fb] ${
        isExpanded ? 'h-72 sm:h-80' : 'h-48'
      }`}
    >
      {/* SVG Canvas Map Visualizer */}
      <svg
        viewBox="0 0 360 240"
        className="w-full h-full select-none"
        style={{
          transform: `scale(${zoomLevel})`,
          transition: 'transform 0.25s ease-out'
        }}
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="urbanGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d5e1f2" strokeWidth="0.5" />
          </pattern>

          {/* Radar ripple for user GPS */}
          <radialGradient id="userGpsPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1d68bd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1d68bd" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Canvas Backdrop */}
        <rect width="360" height="240" fill="#f0f5fd" />
        <rect width="360" height="240" fill="url(#urbanGrid)" />

        {/* Municipal Zones (Translucent simple shapes) */}
        {showZones && (
          <g className="transition-opacity duration-300">
            {/* Zone A - Central & Jinja Road */}
            <polygon
              points="150,80 260,70 340,130 240,170 160,130"
              fill="#1d68bd"
              fillOpacity="0.08"
              stroke="#1d68bd"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
            {/* Zone B - CBD & Parliamentary */}
            <polygon
              points="80,110 160,130 150,220 70,200"
              fill="#006a61"
              fillOpacity="0.08"
              stroke="#006a61"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
            {/* Zone C - Nakasero North */}
            <polygon
              points="90,30 200,20 180,90 90,80"
              fill="#f59e0b"
              fillOpacity="0.08"
              stroke="#f59e0b"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
          </g>
        )}

        {/* City Arterials & Roads (Kampala Grid) */}
        <g stroke="#ffffff" strokeLinecap="round">
          {/* Jinja Road Arterial */}
          <path d="M 30 190 Q 150 140 330 90" strokeWidth="12" fill="none" stroke="#dbe7f7" />
          <path d="M 30 190 Q 150 140 330 90" strokeWidth="8" fill="none" stroke="#ffffff" />
          <path
            d="M 30 190 Q 150 140 330 90"
            strokeWidth="1"
            fill="none"
            stroke="#cbd9ec"
            strokeDasharray="4 4"
          />

          {/* Parliamentary Avenue & Kimathi Ave */}
          <path d="M 120 40 L 210 220" strokeWidth="7" fill="none" stroke="#ffffff" />
          <path d="M 120 40 L 210 220" strokeWidth="1" fill="none" stroke="#cbd9ec" />

          {/* Burton Street / CBD cross street */}
          <path d="M 60 90 L 240 210" strokeWidth="6" fill="none" stroke="#ffffff" />

          {/* Yusuf Lule Connector */}
          <path d="M 220 30 Q 270 90 320 180" strokeWidth="7" fill="none" stroke="#ffffff" />

          {/* Roundabouts (Jubilee / Clock Tower) */}
          <circle cx="160" cy="135" r="9" fill="#ffffff" stroke="#cbd9ec" strokeWidth="1.5" />
          <circle cx="265" cy="105" r="7" fill="#ffffff" stroke="#cbd9ec" strokeWidth="1.5" />
        </g>

        {/* Road Name Typography */}
        <text
          x="270"
          y="85"
          fill="#8397b2"
          fontSize="7"
          fontWeight="700"
          fontFamily="Inter"
          transform="rotate(-15, 270, 85)"
        >
          JINJA ROAD
        </text>
        <text
          x="145"
          y="180"
          fill="#8397b2"
          fontSize="6.5"
          fontWeight="700"
          fontFamily="Inter"
          transform="rotate(62, 145, 180)"
        >
          PARLIAMENTARY AVE
        </text>
        <text x="135" y="48" fill="#8397b2" fontSize="6.5" fontWeight="700" fontFamily="Inter">
          NAKASERO HILL
        </text>

        {/* User GPS Location Marker */}
        <g transform={`translate(${userLoc.x}, ${userLoc.y})`}>
          <circle cx="0" cy="0" r="14" fill="url(#userGpsPulse)" className="animate-ping" />
          <circle cx="0" cy="0" r="5" fill="#1d68bd" stroke="#ffffff" strokeWidth="2" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Parking Lot Interactive Markers */}
        {sites.map((site) => {
          const coords = SITE_COORDINATES[site.id] || { x: 180, y: 120, labelPos: 'top' };
          const isSelected = selectedSite.id === site.id;
          const isLimited = site.status === 'limited';

          return (
            <g
              key={site.id}
              onClick={() => onSelectSite(site)}
              className="cursor-pointer transition-all duration-200 group"
              transform={`translate(${coords.x}, ${coords.y})`}
            >
              {/* Selected Highlight Halo */}
              {isSelected && (
                <circle
                  cx="0"
                  cy="0"
                  r="16"
                  fill="#1d68bd"
                  fillOpacity="0.18"
                  className="animate-pulse"
                />
              )}

              {/* Pin Base Circle */}
              <circle
                cx="0"
                cy="0"
                r={isSelected ? '10' : '8'}
                fill={isSelected ? '#1d68bd' : isLimited ? '#d97706' : '#059669'}
                stroke="#ffffff"
                strokeWidth={isSelected ? '2.5' : '1.5'}
                className="filter drop-shadow-sm group-hover:scale-110 transition-transform"
              />

              {/* Pin Center Icon "P" */}
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#ffffff"
                fontSize={isSelected ? '8' : '7'}
                fontWeight="900"
                fontFamily="Plus Jakarta Sans"
              >
                P
              </text>

              {/* Bay Counter Badge Pill */}
              <g transform={coords.labelPos === 'top' ? 'translate(0, -14)' : 'translate(0, 16)'}>
                <rect
                  x="-16"
                  y="-7"
                  width="32"
                  height="12"
                  rx="6"
                  fill={isSelected ? '#0b1c30' : '#ffffff'}
                  stroke={isSelected ? '#1d68bd' : '#cbd5e1'}
                  strokeWidth="1"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.08))"
                />
                <text
                  x="0"
                  y="1.5"
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : isLimited ? '#b45309' : '#047857'}
                  fontSize="6.5"
                  fontWeight="800"
                  fontFamily="Inter"
                >
                  {site.availableBays} bays
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Floating Map Controls & Badges */}
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 pointer-events-auto">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/90 text-slate-800 text-[10px] font-bold shadow-2xs font-sans">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live Bays</span>
        </div>

        <button
          onClick={() => setShowZones(!showZones)}
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer border ${
            showZones
              ? 'bg-blue-50 text-[#1d68bd] border-blue-200'
              : 'bg-white/90 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Zones
        </button>
      </div>

      {/* Map Action Buttons (Top Right) */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10 pointer-events-auto font-sans">
        <button
          onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.25 : 1))}
          className="w-6 h-6 rounded-lg bg-white/90 backdrop-blur-xs border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white transition-colors text-xs font-bold shadow-2xs cursor-pointer"
          title="Zoom Map"
        >
          {zoomLevel > 1 ? '-' : '+'}
        </button>

        {onToggleExpand && (
          <button
            onClick={onToggleExpand}
            className="w-6 h-6 rounded-lg bg-white/90 backdrop-blur-xs border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white transition-colors text-xs shadow-2xs cursor-pointer"
            title={isExpanded ? 'Collapse Map' : 'Expand Map'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Active Pin Callout Banner (Bottom Floating) */}
      <div className="absolute bottom-2 inset-x-2 z-10 pointer-events-auto">
        <div className="p-2 px-3 rounded-xl bg-white/95 backdrop-blur-md border border-blue-200 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#1d68bd] text-white flex items-center justify-center text-[10px] font-black shrink-0 font-heading">
              P
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-[11px] font-bold text-slate-900 truncate">
                  {selectedSite.name}
                </span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded font-sans">
                  {selectedSite.availableBays} Free
                </span>
              </div>
              <span className="font-sans text-[10px] text-slate-500 font-medium">
                {selectedSite.zone} • {selectedSite.distance}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 ml-2">
            <span className="font-heading text-xs font-black text-[#1d68bd] font-mono-numbers block">
              {formatUGX(selectedSite.ratePerHour)}/hr
            </span>
            <span className="text-[9px] text-slate-400 font-sans font-medium">Tap pin to switch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
