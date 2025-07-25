import { Country } from "./types"

export const sampleCountries: Country[] = [
  {
    id: "1",
    name: "United States",
    code: "US",
    flag: "US",
    region: "North America",
    visited: true,
    visitDate: "2023-06-15",
    notes: "Amazing road trip across the country",
    rating: 5,
    cities: ["New York", "Los Angeles", "San Francisco", "Chicago"]
  },
  {
    id: "2",
    name: "Japan",
    code: "JP",
    flag: "JP",
    region: "Asia",
    visited: true,
    visitDate: "2023-09-20",
    notes: "Incredible culture and food",
    rating: 5,
    cities: ["Tokyo", "Kyoto", "Osaka"]
  },
  {
    id: "3",
    name: "France",
    code: "FR",
    flag: "FR",
    region: "Europe",
    visited: true,
    visitDate: "2022-07-10",
    notes: "Beautiful architecture and wine",
    rating: 4,
    cities: ["Paris", "Lyon", "Nice"]
  },
  {
    id: "4",
    name: "Australia",
    code: "AU",
    flag: "AU",
    region: "Oceania",
    visited: false,
    cities: []
  },
  {
    id: "5",
    name: "Brazil",
    code: "BR",
    flag: "BR",
    region: "South America",
    visited: false,
    cities: []
  },
  {
    id: "6",
    name: "South Africa",
    code: "ZA",
    flag: "ZA",
    region: "Africa",
    visited: false,
    cities: []
  },
  {
    id: "7",
    name: "Canada",
    code: "CA",
    flag: "CA",
    region: "North America",
    visited: true,
    visitDate: "2023-03-05",
    notes: "Beautiful nature and friendly people",
    rating: 4,
    cities: ["Toronto", "Vancouver", "Montreal"]
  },
  {
    id: "8",
    name: "Italy",
    code: "IT",
    flag: "IT",
    region: "Europe",
    visited: true,
    visitDate: "2022-05-12",
    notes: "Amazing food and history",
    rating: 5,
    cities: ["Rome", "Florence", "Venice", "Milan"]
  }
]

export const regions = [
  "Africa",
  "Asia", 
  "Europe",
  "North America",
  "South America",
  "Oceania"
] 