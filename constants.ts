import { Room } from './types';

export const MOCK_ROOMS: Room[] = [
  {
    id: 1,
    name: "Spoločná nocľaháreň",
    capacity: 12,
    beds: 6,
    price: 35,
    image: "/images/rooms/6-12.jpg",
    amenities: ["wifi", "signal", "bed"]
  },
  {
    id: 2,
    name: "Súkromná izba pre 2",
    capacity: 2,
    beds: 1,
    price: 65,
    image: "/images/rooms/room2.png",
    amenities: ["wifi", "signal", "stairs", "tv"]
  },
  {
    id: 3,
    name: "Rodinná izba",
    capacity: 4,
    beds: 2,
    price: 130,
    image: "/images/rooms/room3.png",
    amenities: ["wifi", "bed", "tv"]
  }
];

export const PARTNERS = [
  { name: "Bergans", logo: "https://placehold.co/100x40/005f73/ffffff?text=Bergans" },
  { name: "Devold", logo: "https://placehold.co/100x40/ffd60a/000000?text=DEVOLD" },
  { name: "ZSE", logo: "https://placehold.co/100x40/ffffff/000000?text=ZSE" },
  { name: "ALFA", logo: "https://placehold.co/100x40/ffffff/000000?text=ALFA" },
];