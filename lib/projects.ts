export interface Project {
  id: string;
  name: string;
  location: string;
  status: "ongoing" | "closed";
  type: string;
  image: string;
  description: string;
  area?: string;
  units?: string;
  floors?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "Ainora Residences",
    location: "Road 11, Dhanmondi, Dhaka",
    status: "ongoing",
    type: "Luxury Residential Condominium",
    image: "/project-1.webp",
    description:
      "A serene enclave of refined condominiums wrapped in warm stone, glass and landscaped courtyards.",
    units: "84 Units",
    floors: "18 Floors",
  },
  {
    id: "02",
    name: "Amara Grand Pavilion",
    location: "Gulshan Avenue, Gulshan-2, Dhaka",
    status: "ongoing",
    type: "Ultra-Luxury High-Rise Tower",
    image: "/project-2.webp",
    description:
      "A dramatic skyline statement with floor-to-ceiling glass, sky-gardens and panoramic sky lounges.",
    units: "120 Units",
    floors: "26 Floors",
  },
  {
    id: "03",
    name: "Aurora Signature",
    location: "Sector 3, Uttara, Dhaka",
    status: "closed",
    type: "Bespoke Waterfront Villas",
    image: "/about-building.webp",
    description:
      "Hand-crafted waterfront villas where private gardens meet quiet water views and timeless detailing.",
    units: "36 Villas",
    floors: "5 Floors",
  },
  {
    id: "04",
    name: "Zenith Sky Atrium",
    location: "Banani C/A, Dhaka",
    status: "ongoing",
    type: "LEED Platinum Commercial Tower",
    image: "/slide-3.webp",
    description:
      "A forward-thinking commercial landmark engineered for LEED platinum efficiency and sky-lit atriums.",
    units: "96 Offices",
    floors: "32 Floors",
  },
  {
    id: "05",
    name: "Serene Panorama",
    location: "Bashundhara R/A, Dhaka",
    status: "closed",
    type: "Exclusive Duplex Mansions",
    image: "/slide-2.webp",
    description:
      "Spacious duplex mansions designed for multi-generational living with expansive open-plan interiors.",
    units: "48 Units",
    floors: "8 Floors",
  },
  {
    id: "06",
    name: "Noor Tower",
    location: "Dhanmondi Lake View, Dhaka",
    status: "ongoing",
    type: "Smart Residential Tower",
    image: "/building-1.webp",
    description:
      "A resident-focused smart tower blending intelligent home automation with lake-facing elegance.",
    units: "72 Units",
    floors: "20 Floors",
  },
  {
    id: "07",
    name: "Crescent View",
    location: "Mohakhali DOHS, Dhaka",
    status: "closed",
    type: "Homestead & Family Residences",
    image: "/building-2.webp",
    description:
      "Sunlit family residences arranged around a crescent courtyard that encourages community living.",
    units: "60 Units",
    floors: "12 Floors",
  },
  {
    id: "08",
    name: "Emerald Heights",
    location: "Mirpur DOHS, Dhaka",
    status: "ongoing",
    type: "Garden Residence Cluster",
    image: "/building-3.webp",
    description:
      "Clusters of garden residences connected by green promenades and a resort-style amenity deck.",
    units: "90 Units",
    floors: "15 Floors",
  },
  {
    id: "09",
    name: "Sapphire Avenue",
    location: "Baridhara Diplomatic Zone, Dhaka",
    status: "closed",
    type: "Signature Corporate Residences",
    image: "/slide-1.webp",
    description:
      "Signature residences crafted for diplomats and executives in the heart of Baridhara's tree-lined avenues.",
    units: "54 Units",
    floors: "14 Floors",
  },
];