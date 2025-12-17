import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Booking {
  id: string;
  dateFrom: Date;
  dateTo: Date;
  selectedRoom: {
    id: number;
    name: string;
    price: number;
    capacity: number;
    description: string;
  } | null;
  guestInfo?: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  step: number;
}

export const useBookings = () => {
  const [bookings, setBookings] = useLocalStorage<Booking[]>('bookings', []);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString()
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, ...updates } : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const getBooking = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return {
    bookings,
    addBooking,
    updateBooking,
    deleteBooking,
    getBooking
  };
};