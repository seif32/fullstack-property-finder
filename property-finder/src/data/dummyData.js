// Dummy property data
export const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description:
      "Stunning 4-bedroom villa with private pool and garden, perfect for families looking for luxury and comfort.",
    price: 1200000,
    location: "Zamalek",
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    propertyType: "Villa",
    listingType: "Sale",
    ownerId: 1,
    ownerName: "Ahmed Hassan",
    images: [
      {
        id: 1,
        imageUrl: "/modern-luxury-villa-pool.png",
        description: "Front view",
        isPrimary: true,
      },
      {
        id: 2,
        imageUrl: "/placeholder.svg?key=3pybo",
        description: "Living room",
        isPrimary: false,
      },
      {
        id: 3,
        imageUrl: "/modern-kitchen-island.png",
        description: "Kitchen",
        isPrimary: false,
      },
    ],
    reviews: [
      {
        id: 1,
        userId: 2,
        userName: "Sara Ahmed",
        rating: 5,
        comment: "Beautiful property, exactly as described!",
        createdAt: "2024-04-15T10:30:00",
      },
      {
        id: 2,
        userId: 3,
        userName: "Mohamed Ali",
        rating: 4,
        comment: "Great location and amenities.",
        createdAt: "2024-04-20T14:45:00",
      },
    ],
  },
  {
    id: 2,
    title: "Cozy Downtown Apartment",
    description:
      "Charming 2-bedroom apartment in the heart of downtown, walking distance to shops and restaurants.",
    price: 450000,
    location: "Downtown",
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    propertyType: "Apartment",
    listingType: "Sale",
    ownerId: 2,
    ownerName: "Laila Mahmoud",
    images: [
      {
        id: 4,
        imageUrl: "/placeholder.svg?key=ckaol",
        description: "Exterior",
        isPrimary: true,
      },
      {
        id: 5,
        imageUrl: "/placeholder.svg?key=np81o",
        description: "Living room",
        isPrimary: false,
      },
      {
        id: 6,
        imageUrl: "/placeholder.svg?key=jwcps",
        description: "Kitchen",
        isPrimary: false,
      },
    ],
    reviews: [
      {
        id: 3,
        userId: 4,
        userName: "Nour Ibrahim",
        rating: 4,
        comment: "Great location!",
        createdAt: "2024-04-10T09:15:00",
      },
    ],
  },
  {
    id: 3,
    title: "Spacious Family Home",
    description:
      "Beautiful 5-bedroom house with garden and garage, ideal for large families.",
    price: 850000,
    location: "Maadi",
    bedrooms: 5,
    bathrooms: 3,
    area: 400,
    propertyType: "House",
    listingType: "Sale",
    ownerId: 3,
    ownerName: "Omar Farouk",
    images: [
      {
        id: 7,
        imageUrl: "/placeholder.svg?key=3hm2j",
        description: "Front view",
        isPrimary: true,
      },
      {
        id: 8,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=spacious living room with large windows",
        description: "Living room",
        isPrimary: false,
      },
      {
        id: 9,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=modern family kitchen",
        description: "Kitchen",
        isPrimary: false,
      },
    ],
    reviews: [],
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    description:
      "Stunning penthouse with panoramic city views, private terrace, and high-end finishes.",
    price: 1800000,
    location: "New Cairo",
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    propertyType: "Penthouse",
    listingType: "Sale",
    ownerId: 4,
    ownerName: "Hana Youssef",
    images: [
      {
        id: 10,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=luxury penthouse with city view",
        description: "Main view",
        isPrimary: true,
      },
      {
        id: 11,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=penthouse terrace with lounge",
        description: "Terrace",
        isPrimary: false,
      },
      {
        id: 12,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=luxury master bedroom",
        description: "Master bedroom",
        isPrimary: false,
      },
    ],
    reviews: [
      {
        id: 4,
        userId: 5,
        userName: "Karim Mostafa",
        rating: 5,
        comment: "Absolutely stunning property!",
        createdAt: "2024-04-25T16:20:00",
      },
    ],
  },
  {
    id: 5,
    title: "Modern Studio Apartment",
    description:
      "Stylish studio apartment, perfect for young professionals or students.",
    price: 8000,
    location: "6th October",
    bedrooms: 0,
    bathrooms: 1,
    area: 60,
    propertyType: "Studio",
    listingType: "Rent",
    ownerId: 5,
    ownerName: "Amira Salah",
    images: [
      {
        id: 13,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=modern studio apartment",
        description: "Main view",
        isPrimary: true,
      },
      {
        id: 14,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=compact kitchen in studio",
        description: "Kitchen",
        isPrimary: false,
      },
      {
        id: 15,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=studio apartment bathroom",
        description: "Bathroom",
        isPrimary: false,
      },
    ],
    reviews: [
      {
        id: 5,
        userId: 6,
        userName: "Youssef Ahmed",
        rating: 4,
        comment: "Great value for money!",
        createdAt: "2024-04-18T11:30:00",
      },
    ],
  },
  {
    id: 6,
    title: "Beachfront Villa",
    description:
      "Luxurious 6-bedroom villa with private beach access and stunning sea views.",
    price: 3500000,
    location: "North Coast",
    bedrooms: 6,
    bathrooms: 5,
    area: 550,
    propertyType: "Villa",
    listingType: "Sale",
    ownerId: 6,
    ownerName: "Tarek Zaki",
    images: [
      {
        id: 16,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=beachfront villa with pool",
        description: "Exterior",
        isPrimary: true,
      },
      {
        id: 17,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=luxury villa living room with sea view",
        description: "Living room",
        isPrimary: false,
      },
      {
        id: 18,
        imageUrl:
          "/placeholder.svg?height=600&width=800&query=villa master bedroom with balcony",
        description: "Master bedroom",
        isPrimary: false,
      },
    ],
    reviews: [],
  },
];

// Dummy locations data
export const locations = [
  {
    id: 1,
    name: "Cairo",
    type: "City",
    subLocations: [
      { id: 2, name: "Zamalek", type: "Neighborhood", parentLocationId: 1 },
      { id: 3, name: "Maadi", type: "Neighborhood", parentLocationId: 1 },
      { id: 4, name: "Downtown", type: "Neighborhood", parentLocationId: 1 },
      { id: 5, name: "New Cairo", type: "District", parentLocationId: 1 },
    ],
  },
  {
    id: 6,
    name: "Giza",
    type: "City",
    subLocations: [
      { id: 7, name: "6th October", type: "District", parentLocationId: 6 },
      { id: 8, name: "Sheikh Zayed", type: "District", parentLocationId: 6 },
    ],
  },
  {
    id: 9,
    name: "Alexandria",
    type: "City",
    subLocations: [
      { id: 10, name: "Montazah", type: "District", parentLocationId: 9 },
      { id: 11, name: "Gleem", type: "Neighborhood", parentLocationId: 9 },
    ],
  },
  { id: 12, name: "North Coast", type: "Region", subLocations: [] },
];

// Dummy user data
export const currentUser = {
  id: 2,
  email: "user@example.com",
  firstName: "Sara",
  lastName: "Ahmed",
  phoneNumber: "1234567890",
  role: "USER",
  bookmarks: [1, 4], // IDs of bookmarked properties
};

// Property types
export const propertyTypes = [
  "Apartment",
  "Villa",
  "House",
  "Penthouse",
  "Studio",
  "Duplex",
  "Chalet",
];

// Listing types
export const listingTypes = ["Sale", "Rent"];
