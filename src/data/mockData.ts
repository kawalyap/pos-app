import { ParkingSite, Vehicle, Transaction } from '../types';

export const INITIAL_SITES: ParkingSite[] = [
  {
    id: 'kca-01',
    name: 'City Centre Lot A (Jinja Rd)',
    zone: 'Zone #KCA-01',
    municipalZone: 'City Centre Zone A',
    ratePerHour: 1500,
    availableBays: 42,
    totalBays: 120,
    distance: '120m away',
    status: 'open',
    address: 'Plot 14 Jinja Road, Central Division, Kampala'
  },
  {
    id: 'kca-04',
    name: 'Pioneer Mall Underground',
    zone: 'Zone #KCA-04',
    municipalZone: 'Central Business District Zone B',
    ratePerHour: 2000,
    availableBays: 12,
    totalBays: 85,
    distance: '450m away',
    status: 'open',
    address: 'Burton Street, Kampala CBD'
  },
  {
    id: 'kca-02',
    name: 'Parliamentary Ave Street Bays',
    zone: 'Zone #KCA-02',
    municipalZone: 'Civic Centre Zone A',
    ratePerHour: 1000,
    availableBays: 4,
    totalBays: 50,
    distance: '650m away',
    status: 'limited',
    address: 'Parliamentary Avenue, Central Kampala'
  },
  {
    id: 'kca-08',
    name: 'Nakasero Hill Executive Lot',
    zone: 'Zone #KCA-08',
    municipalZone: 'Nakasero Zone 1',
    ratePerHour: 2500,
    availableBays: 18,
    totalBays: 60,
    distance: '1.2 km away',
    status: 'open',
    address: 'Kyadondo Road, Nakasero'
  },
  {
    id: 'kca-11',
    name: 'Garden City Commercial Deck',
    zone: 'Zone #KCA-11',
    municipalZone: 'Yusuf Lule Corridor',
    ratePerHour: 2000,
    availableBays: 54,
    totalBays: 200,
    distance: '1.4 km away',
    status: 'open',
    address: 'Yusuf Lule Rd, Kampala'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    plate: 'UBF 214X',
    model: 'Toyota Harrier',
    color: 'Pearl White',
    isDefault: true
  },
  {
    plate: 'UBL 889M',
    model: 'Subaru Outback',
    color: 'Silver Metallic'
  },
  {
    plate: 'UAZ 330P',
    model: 'Mercedes-Benz C200',
    color: 'Obsidian Black'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-101',
    title: 'City Centre Parking (A2)',
    subtitle: 'Today, 08:30 AM · UBF 214X · Bay 42',
    category: 'parking',
    amount: 3200,
    type: 'debit',
    timestamp: 'Today, 08:30 AM',
    token: 'KP-7719-UBF214X',
    status: 'completed',
    details: {
      Zone: 'City Centre Zone A',
      Vehicle: 'UBF 214X (Toyota Harrier)',
      Duration: '2 Hours (Until 10:30 AM)',
      Enforcement: 'KCCA Verified Clearance'
    }
  },
  {
    id: 'tx-102',
    title: 'UMEME Yaka Prepaid Power',
    subtitle: 'Yesterday, 04:12 PM · Meter 3719002148',
    category: 'utility',
    amount: 50000,
    type: 'debit',
    timestamp: 'Yesterday, 04:12 PM',
    status: 'completed',
    details: {
      Token: '4819-2091-8842-1049-7712',
      Units: '56.8 kWh Units Generated',
      Account: 'Sarah Namukasa (Home Meter)'
    }
  },
  {
    id: 'tx-103',
    title: 'Top Up via MTN MoMo',
    subtitle: 'Yesterday, 09:15 AM · +256 772 401 341',
    category: 'deposit',
    amount: 100000,
    type: 'credit',
    timestamp: 'Yesterday, 09:15 AM',
    status: 'completed',
    details: {
      Provider: 'MTN Mobile Money Uganda',
      Reference: 'MM-994102941',
      Status: 'Credited to KiPay Wallet'
    }
  },
  {
    id: 'tx-104',
    title: 'NWSC Water Utility',
    subtitle: '22 Oct, 11:45 AM · Account #NW-88912',
    category: 'utility',
    amount: 18400,
    type: 'debit',
    timestamp: '22 Oct, 11:45 AM',
    status: 'completed',
    details: {
      Account: 'NW-88912 (Kampala Central)',
      Volume: '5.2 m³ Consumed'
    }
  },
  {
    id: 'tx-105',
    title: 'TotalEnergies Oasis Fuel',
    subtitle: '19 Oct, 02:20 PM · Till #66710',
    category: 'merchant',
    amount: 65000,
    type: 'debit',
    timestamp: '19 Oct, 02:20 PM',
    status: 'completed',
    details: {
      Merchant: 'TotalEnergies Oasis Service Station',
      Product: 'Excellium Petrol & Wash'
    }
  }
];

export const MERCHANTS_LIST = [
  {
    id: 'myparking',
    name: 'MyParking Uganda',
    category: 'Municipal & Transit',
    description: 'Street parking, Zone A/B & Municipal lots',
    icon: 'P',
    iconBg: 'bg-amber-500',
    iconText: 'text-slate-950',
    rateNote: 'Tariff from UGX 1,000/hr',
    verified: true,
    isParking: true
  },
  {
    id: 'total',
    name: 'TotalEnergies Station',
    category: 'Fuel & Service',
    description: 'Fuel, lubricants & Express Car Wash',
    icon: '⛽',
    iconBg: 'bg-red-500/10',
    iconText: 'text-red-500',
    rateNote: 'Till #66710',
    verified: true,
    isParking: false
  },
  {
    id: 'carrefour',
    name: 'Carrefour Supermarket',
    category: 'Retail & Groceries',
    description: 'Metroplex, Oasis & Lugogo branches',
    icon: '🛒',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-500',
    rateNote: 'Till #991028',
    verified: true,
    isParking: false
  },
  {
    id: 'javas',
    name: 'Café Javas Kampala',
    category: 'Food & Dining',
    description: 'Order table settlement & takeout',
    icon: '☕',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-500',
    rateNote: 'Till #44219',
    verified: true,
    isParking: false
  },
  {
    id: 'shell',
    name: 'Vivo Energy / Shell',
    category: 'Fuel & Mart',
    description: 'Shell V-Power & Shell Select Stores',
    icon: '⛽',
    iconBg: 'bg-yellow-500/10',
    iconText: 'text-yellow-600',
    rateNote: 'Till #11842',
    verified: true,
    isParking: false
  }
];
