export type ScreenView =
  | 'login'
  | 'dashboard'
  | 'merchants'
  | 'parking-sites'
  | 'parking-vehicle'
  | 'parking-review'
  | 'parking-confirm'
  | 'parking-success'
  | 'deposit'
  | 'transfer'
  | 'utilities'
  | 'history'
  | 'profile';

export interface ParkingSite {
  id: string;
  name: string;
  zone: string;
  municipalZone: string;
  ratePerHour: number;
  availableBays: number;
  totalBays: number;
  distance: string;
  status: 'open' | 'limited' | 'full';
  address: string;
}

export interface Vehicle {
  plate: string;
  model: string;
  color: string;
  isDefault?: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  category: 'parking' | 'utility' | 'deposit' | 'transfer' | 'merchant';
  amount: number;
  type: 'debit' | 'credit';
  timestamp: string;
  token?: string;
  status: 'completed' | 'processing' | 'failed';
  details?: Record<string, string>;
}

export interface ParkingSession {
  site: ParkingSite;
  vehicle: Vehicle;
  durationHours: number;
  startTime: Date;
  expiryTime: Date;
  totalAmount: number;
  token: string;
  bayNumber: string;
  status: 'active' | 'expired';
}
