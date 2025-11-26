export enum ReserveType {
  NATURAL = 'طبيعية',
  ROYAL = 'ملكية',
}

export interface Activity {
  name: string;
  icon: string;
}

export interface Statistics {
  monthlyVisitors: number;
  yearlyVisitors: number;
  rating: number;
  peakSeason: string;
}

export interface Reserve {
  id: string;
  name: string;
  type: ReserveType;
  region: string;
  area: string;
  established: string;
  coordinates: [number, number];
  description: string;
  shortDescription: string;
  climate: string;
  wildlife: {
    animals: string[];
    plants: string[];
    birds: string[];
  };
  activities: string[];
  contact: {
    phone: string;
    email: string;
    social: {
      twitter?: string;
      instagram?: string;
    };
  };
  stats: Statistics;
  imageUrl: string;
  gallery: string[];
}

export type ViewState = 'HERO' | 'MAP' | 'DETAIL' | 'COMPARE';
