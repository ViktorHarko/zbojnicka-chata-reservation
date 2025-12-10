export interface Room {
  id: number;
  name: string;
  capacity: number; // max people
  beds: number;
  price: number;
  image: string;
  amenities: string[];
}

export interface BookingState {
  step: number;
  dateFrom: Date;
  dateTo: Date;
  people: number;
  beds: number;
  selectedRoom: Room | null;
  guest: {
    name: string;
    surname: string;
    phone: string;
    email: string;
  };
}

export enum BookingStep {
  PRE_AUTH = 0,
  SEARCH = 1,
  DETAILS = 2,
  CONTACT = 3,
  PAYMENT = 4,
  SUCCESS = 5,
}