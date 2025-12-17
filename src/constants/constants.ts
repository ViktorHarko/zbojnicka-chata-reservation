import { Room } from '../types';
import room1Image from '../assets/images/rooms/6-12.jpg';
import room2Image from '../assets/images/rooms/room2.png';
import room3Image from '../assets/images/rooms/room3.webp';

export const MOCK_ROOMS: Room[] = [
  {
    id: 1,
    name: "Spoločná nocľaháreň",
    capacity: 12,
    beds: 6,
    price: 35,
    image: room1Image,
    amenities: ["wifi", "signal", "bed"]
  },
  {
    id: 2,
    name: "Súkromná izba pre 2",
    capacity: 2,
    beds: 1,
    price: 65,
    image: room2Image,
    amenities: ["wifi", "signal", "stairs", "tv"]
  },
  {
    id: 3,
    name: "Rodinná izba",
    capacity: 4,
    beds: 2,
    price: 130,
    image: room3Image,
    amenities: ["wifi", "bed", "tv"]
  }
];

export const PARTNERS = [
  { name: "Bergans", logo: "https://placehold.co/100x40/005f73/ffffff?text=Bergans" },
  { name: "Devold", logo: "https://placehold.co/100x40/ffd60a/000000?text=DEVOLD" },
  { name: "ZSE", logo: "https://placehold.co/100x40/ffffff/000000?text=ZSE" },
  { name: "ALFA", logo: "https://placehold.co/100x40/ffffff/000000?text=ALFA" },
];
