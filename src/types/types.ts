export interface Room {
  id: number;
  name: string;
  capacity: number; // max people
  beds: number;
  price: number;
  image: string;
  amenities: string[];
  description?: string;
}

export interface Guest {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export interface BookingState {
  step: number;
  dateFrom: Date;
  dateTo: Date;
  people: number;
  beds: number;
  selectedRoom: Room | null;
  guest: Guest;
}

export enum BookingStep {
  PRE_AUTH = 0,
  SEARCH = 1,
  DETAILS = 2,
  CONTACT = 3,
  PAYMENT = 4,
  SUCCESS = 5,
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export type Locale = 'sk' | 'en';