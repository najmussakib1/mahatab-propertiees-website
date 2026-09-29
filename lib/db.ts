import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { hashPassword } from "@/lib/password";

export interface ProjectRow {
  id: number;
  name: string;
  location: string;
  status: "ongoing" | "closed";
  type: string;
  image: string;
  description: string;
  area: string;
  units: string;
  floors: string;
  facing: string;
  parking: string;
  handover: string;
  brochure: string;
  gallery: string;
  features: string;
  map_lat: string;
  map_lng: string;
  sort_order: number;
}

export interface ClientRow {
  id: number;
  name: string;
  logo: string;
}

export interface TestimonialRow {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
  sort_order: number;
}

export interface MessageRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: number;
  created_at: string;
}

export interface NewsEventRow {
  id: number;
  title: string;
  category: "news" | "event";
  date: string;
  excerpt: string;
  body: string;
  image: string;
  sort_order: number;
}

export interface LandownerReviewRow {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
  sort_order: number;
}

export type GalleryCategory =
  | "handover"
  | "mou"
  | "service-work"
  | "rehab-fair"
  | "picnic";

export const GALLERY_CATEGORIES: { value: GalleryCategory; label: string }[] = [
  { value: "handover", label: "Handover" },
  { value: "mou", label: "MOU Signing" },
  { value: "service-work", label: "Service Work" },
  { value: "rehab-fair", label: "REHAB Fair" },
  { value: "picnic", label: "Picnic" },
];

export interface GalleryImageRow {
  id: number;
  title: string;
  category: GalleryCategory;
  image: string;
  sort_order: number;
}

export interface AdminRow {
  id: number;
  username: string;
  password_hash: string;
}

export interface SettingRow {
  key: string;
  value: string;
}

/* ------------------------------------------------------------------ DB --- */

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "mpl.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  initSchema(db);
  ensureColumns(db);
  seedIfEmpty(db);
  seedDetailDefaults(db);
  migrateMediaToWebp(db);
  return db;
}

function initSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'ongoing',
      type TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      area TEXT NOT NULL DEFAULT '',
      units TEXT NOT NULL DEFAULT '',
      floors TEXT NOT NULL DEFAULT '',
      facing TEXT NOT NULL DEFAULT '',
      parking TEXT NOT NULL DEFAULT '',
      handover TEXT NOT NULL DEFAULT '',
      brochure TEXT NOT NULL DEFAULT '',
      gallery TEXT NOT NULL DEFAULT '',
      features TEXT NOT NULL DEFAULT '',
      map_lat TEXT NOT NULL DEFAULT '',
      map_lng TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      comment TEXT NOT NULL DEFAULT '',
      avatar TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      subject TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      is_read INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS news_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'news',
      date TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS landowner_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      comment TEXT NOT NULL DEFAULT '',
      avatar TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'handover',
      image TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    );
  `);
}

/** Add detail columns to existing databases created before they existed. */
function ensureColumns(database: Database.Database) {
  const cols = new Set(
    (database.prepare("PRAGMA table_info(projects)").all() as { name: string }[]).map((c) => c.name)
  );
  const add = (name: string, def: string) => {
    if (!cols.has(name)) database.exec(`ALTER TABLE projects ADD COLUMN ${name} ${def}`);
  };
  add("facing", "TEXT NOT NULL DEFAULT ''");
  add("parking", "TEXT NOT NULL DEFAULT ''");
  add("handover", "TEXT NOT NULL DEFAULT ''");
  add("brochure", "TEXT NOT NULL DEFAULT ''");
  add("gallery", "TEXT NOT NULL DEFAULT ''");
  add("features", "TEXT NOT NULL DEFAULT ''");
  add("map_lat", "TEXT NOT NULL DEFAULT ''");
  add("map_lng", "TEXT NOT NULL DEFAULT ''");
}

/**
 * One-time (idempotent) media migration: point stored image paths at their
 * pre-generated WebP twins in /public when one exists, so the browser downloads
 * the smaller, faster format directly (only touching values that changed).
 * Runs on every server start but is a no-op once everything is WebP.
 */
function migrateMediaToWebp(database: Database.Database) {
  const publicDir = path.join(process.cwd(), "public");
  const fileExists = (webpPath: string) =>
    fs.existsSync(path.join(publicDir, webpPath.replace(/^\//, "")));

  const toWebp = (value: string): string => {
    if (!value || value.startsWith("http")) return value;
    if (value.startsWith("[")) {
      try {
        return JSON.stringify((JSON.parse(value) as string[]).map(toWebp));
      } catch {
        return value;
      }
    }
    if (!value.toLowerCase().endsWith(".jpg")) return value;
    const replaced = value.replace(/\.jpg$/i, ".webp");
    return fileExists(replaced) ? replaced : value;
  };

  const tx = database.transaction(() => {
    const projects = database
      .prepare("SELECT id, image, gallery FROM projects")
      .all() as { id: number; image: string; gallery: string }[];
    const updProject = database.prepare("UPDATE projects SET image = ?, gallery = ? WHERE id = ?");
    for (const p of projects) {
      const image = toWebp(p.image);
      const gallery = toWebp(p.gallery);
      if (image !== p.image || gallery !== p.gallery) updProject.run(image, gallery, p.id);
    }

    const news = database
      .prepare("SELECT id, image FROM news_events")
      .all() as { id: number; image: string }[];
    const updNews = database.prepare("UPDATE news_events SET image = ? WHERE id = ?");
    for (const n of news) {
      const image = toWebp(n.image);
      if (image !== n.image) updNews.run(image, n.id);
    }

    const galleryRows = database
      .prepare("SELECT id, image FROM gallery")
      .all() as { id: number; image: string }[];
    const updGallery = database.prepare("UPDATE gallery SET image = ? WHERE id = ?");
    for (const g of galleryRows) {
      const image = toWebp(g.image);
      if (image !== g.image) updGallery.run(image, g.id);
    }

    for (const [table, col] of [
      ["testimonials", "avatar"],
      ["landowner_reviews", "avatar"],
    ] as const) {
      const rows = database
        .prepare(`SELECT id, ${col} AS v FROM ${table}`)
        .all() as { id: number; v: string }[];
      const upd = database.prepare(`UPDATE ${table} SET ${col} = ? WHERE id = ?`);
      for (const r of rows) {
        const v = toWebp(r.v);
        if (v !== r.v) upd.run(v, r.id);
      }
    }
  });
  tx();
}

/* --------------------------------------------------------------- SEED --- */

interface SeedProject {
  name: string;
  location: string;
  status: "ongoing" | "closed";
  type: string;
  image: string;
  description: string;
  units?: string;
  floors?: string;
  area?: string;
  facing?: string;
  parking?: string;
  handover?: string;
  brochure?: string;
  gallery?: string[];
  features?: string[];
  map_lat?: string;
  map_lng?: string;
}

const SEED_PROJECTS: SeedProject[] = [
  {
    name: "Ainora Residences",
    location: "Road 11, Dhanmondi, Dhaka",
    status: "ongoing",
    type: "Luxury Residential Condominium",
    image: "/project-1.webp",
    map_lat: "23.7448",
    map_lng: "90.3757",
    description:
      "A serene enclave of refined condominiums wrapped in warm stone, glass and landscaped courtyards.",
    units: "84 Units",
    floors: "18 Floors",
    area: "1250 & 2500 sft",
    facing: "North Facing",
    parking: "96 Nos",
    handover: "June 2026",
    gallery: ["/project-1.webp", "/slide-1.webp", "/about-building.webp"],
    features: [
      "Panoramic Sky Lounge",
      "Rooftop Garden",
      "24/7 CCTV Surveillance",
      "Back-up Power Generator",
      "Covered Parking",
      "High-speed Passenger Lift",
    ],
  },
  {
    name: "Amara Grand Pavilion",
    location: "Gulshan Avenue, Gulshan-2, Dhaka",
    status: "ongoing",
    type: "Ultra-Luxury High-Rise Tower",
    image: "/project-2.webp",
    map_lat: "23.7925",
    map_lng: "90.4079",
    description:
      "A dramatic skyline statement with floor-to-ceiling glass, sky-gardens and panoramic sky lounges.",
    units: "120 Units",
    floors: "26 Floors",
    area: "1800 & 3200 sft",
    facing: "South Facing",
    parking: "140 Nos",
    handover: "December 2026",
    gallery: ["/project-2.webp", "/slide-3.webp", "/about-interior.webp"],
    features: [
      "Swimming Pool & Gym",
      "Panoramic Sky Lounge",
      "Smart Home Automation",
      "24/7 CCTV Surveillance",
      "Covered Parking",
      "Fire Safety System",
    ],
  },
  {
    name: "Aurora Signature",
    location: "Sector 3, Uttara, Dhaka",
    status: "closed",
    type: "Bespoke Waterfront Villas",
    image: "/about-building.webp",
    map_lat: "23.8734",
    map_lng: "90.3825",
    description:
      "Hand-crafted waterfront villas where private gardens meet quiet water views and timeless detailing.",
    units: "36 Villas",
    floors: "5 Floors",
    area: "3500 & 4200 sft",
    facing: "East Facing",
    parking: "72 Nos",
    handover: "Completed 2024",
    gallery: ["/about-building.webp", "/slide-2.webp", "/project-1.webp"],
    features: [
      "Private Waterfront Garden",
      "Swimming Pool & Gym",
      "Secure Community Gate",
      "Smart Home Automation",
      "Children's Play Area",
      "Rainwater Harvesting",
    ],
  },
  {
    name: "Zenith Sky Atrium",
    location: "Banani C/A, Dhaka",
    status: "ongoing",
    type: "LEED Platinum Commercial Tower",
    image: "/slide-3.webp",
    map_lat: "23.7937",
    map_lng: "90.4066",
    description:
      "A forward-thinking commercial landmark engineered for LEED platinum efficiency and sky-lit atriums.",
    units: "96 Offices",
    floors: "32 Floors",
    area: "1500 & 3000 sft",
    facing: "West Facing",
    parking: "180 Nos",
    handover: "March 2027",
    gallery: ["/slide-3.webp", "/project-2.webp", "/building-1.webp"],
    features: [
      "Sky-lit Atrium Lobby",
      "Back-up Power Generator",
      "High-speed Passenger Lift",
      "24/7 CCTV Surveillance",
      "Covered Parking",
      "Fire Safety System",
    ],
  },
  {
    name: "Serene Panorama",
    location: "Bashundhara R/A, Dhaka",
    status: "closed",
    type: "Exclusive Duplex Mansions",
    image: "/slide-2.webp",
    description:
      "Spacious duplex mansions designed for multi-generational living with expansive open-plan interiors.",
    units: "48 Units",
    floors: "8 Floors",
    area: "2800 & 3600 sft",
    facing: "South Facing",
    parking: "60 Nos",
    handover: "Completed 2023",
    gallery: ["/slide-2.webp", "/about-building.webp", "/building-2.webp"],
    features: [
      "Rooftop Garden",
      "Swimming Pool & Gym",
      "Children's Play Area",
      "Secure Community Gate",
      "Covered Parking",
      "Rainwater Harvesting",
    ],
  },
  {
    name: "Noor Tower",
    location: "Dhanmondi Lake View, Dhaka",
    status: "ongoing",
    type: "Smart Residential Tower",
    image: "/building-1.webp",
    description:
      "A resident-focused smart tower blending intelligent home automation with lake-facing elegance.",
    units: "72 Units",
    floors: "20 Floors",
    area: "1450 & 2200 sft",
    facing: "North Facing",
    parking: "80 Nos",
    handover: "September 2026",
    gallery: ["/building-1.webp", "/slide-3.webp", "/about-interior.webp"],
    features: [
      "Smart Home Automation",
      "Lake View Terrace",
      "24/7 CCTV Surveillance",
      "Back-up Power Generator",
      "Covered Parking",
      "High-speed Passenger Lift",
    ],
  },
  {
    name: "Crescent View",
    location: "Mohakhali DOHS, Dhaka",
    status: "closed",
    type: "Homestead & Family Residences",
    image: "/building-2.webp",
    description:
      "Sunlit family residences arranged around a crescent courtyard that encourages community living.",
    units: "60 Units",
    floors: "12 Floors",
    area: "2000 & 2700 sft",
    facing: "South Facing",
    parking: "66 Nos",
    handover: "Completed 2022",
    gallery: ["/building-2.webp", "/slide-2.webp", "/project-2.webp"],
    features: [
      "Crescent Courtyard",
      "Children's Play Area",
      "Rooftop Garden",
      "Secure Community Gate",
      "Covered Parking",
      "24/7 CCTV Surveillance",
    ],
  },
  {
    name: "Emerald Heights",
    location: "Mirpur DOHS, Dhaka",
    status: "ongoing",
    type: "Garden Residence Cluster",
    image: "/building-3.webp",
    description:
      "Clusters of garden residences connected by green promenades and a resort-style amenity deck.",
    units: "90 Units",
    floors: "15 Floors",
    area: "1600 & 2400 sft",
    facing: "East Facing",
    parking: "100 Nos",
    handover: "December 2025",
    gallery: ["/building-3.webp", "/project-1.webp", "/slide-1.webp"],
    features: [
      "Resort-style Amenity Deck",
      "Green Promenades",
      "Swimming Pool & Gym",
      "Children's Play Area",
      "Smart Home Automation",
      "Fire Safety System",
    ],
  },
  {
    name: "Sapphire Avenue",
    location: "Baridhara Diplomatic Zone, Dhaka",
    status: "closed",
    type: "Signature Corporate Residences",
    image: "/slide-1.webp",
    description:
      "Signature residences crafted for diplomats and executives in the heart of Baridhara's tree-lined avenues.",
    units: "54 Units",
    floors: "14 Floors",
    area: "2100 & 3100 sft",
    facing: "North Facing",
    parking: "72 Nos",
    handover: "Completed 2021",
    gallery: ["/slide-1.webp", "/building-3.webp", "/project-2.webp"],
    features: [
      "Diplomatic-standard Security",
      "Panoramic Sky Lounge",
      "24/7 CCTV Surveillance",
      "High-speed Passenger Lift",
      "Concierge Service",
      "Covered Parking",
    ],
  },
];

const SEED_CLIENTS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "IBM",
  "Netflix",
  "LinkedIn",
  "Spotify",
  "Samsung",
  "Tesla",
  "Adobe",
  "Oracle",
  "Sony",
  "Salesforce",
  "Shopify",
];

const SEED_TESTIMONIALS = [
  {
    name: "Ayesha Siddiqua",
    role: "Head of Operations",
    company: "Bayview Holdings",
    comment:
      "Mahatab Properties delivered our flagship office tower ahead of schedule with flawless craftsmanship. The transparency and engineering precision throughout every stage gave us complete confidence from day one.",
    avatar: "/about-interior.webp",
  },
  {
    name: "Tanvir Ahmed",
    role: "Managing Director",
    company: "Greenfield Developers",
    comment:
      "Their team treats every project like their own landmark. From structural integrity to elegant finishing, they exceeded our expectations and the collaboration felt effortless.",
    avatar: "/project-1.webp",
  },
  {
    name: "Nusrat Jahan",
    role: "Chief Financial Officer",
    company: "Southeast Bank",
    comment:
      "What impressed us most was their long-term commitment. Mahatab Properties isn't just building structures — they build lasting partnerships built on trust, honesty and measurable results.",
    avatar: "/about-building.webp",
  },
  {
    name: "Rakib Hossain",
    role: "Founder & CEO",
    company: "Urban Nest Realty",
    comment:
      "Every unit we delivered through their expertise sold out quickly. Their quality control and after-sales support are simply unmatched in the industry. A truly reliable partner.",
    avatar: "/project-2.webp",
  },
];

const SEED_MESSAGES = [
  {
    name: "Farhan Rahman",
    email: "farhan.rahman@example.com",
    phone: "+880 1711 223344",
    subject: "Apartment Inquiry – Dhanmondi",
    message:
      "Hello, I am interested in the 3-bedroom units at Ainora Residences. Could you share the current price list and available floor options?",
    is_read: 0,
  },
  {
    name: "Israt Jahan",
    email: "israt.j@example.com",
    phone: "+880 1812 998877",
    subject: "Partnership Opportunity",
    message:
      "Our firm would like to discuss a land development partnership in Bashundhara. Please let us know a convenient time for a meeting.",
    is_read: 1,
  },
];

const SEED_NEWS: Omit<NewsEventRow, "id" | "sort_order">[] = [
  {
    title: "Ainora Residences Reaches Structural Completion",
    category: "news",
    date: "2026-08-15",
    excerpt:
      "All 18 floors of Ainora Residences in Dhanmondi have been structurally topped out — interior finishing and landscaping are now in full swing.",
    body:
      "Mahatab Properties Ltd. is proud to announce that Ainora Residences has achieved its full structural height of 18 floors. The landmark Dhanmondi condominium passed all RAJUK compliance inspections on schedule.\n\nWith 84 carefully planned units, covered parking for 96 cars and a rooftop sky lounge, the building is now entering interior finishing, MEP installation and landscape works. Buyers can expect the promised June 2026 handover timeline to be met.\n\n\"This milestone reflects the disciplined engineering our clients have come to expect,\" said the Chairman of Mahatab Properties Ltd. \"We remain committed to transparent progress reporting every step of the way.\"",
    image: "/project-1.webp",
  },
  {
    title: "MPL Hosts Exclusive Pre-Launch of Amara Grand Pavilion",
    category: "event",
    date: "2026-07-22",
    excerpt:
      "Buyers and partners attended a private evening unveiling of our Gulshan flagship tower, featuring smart-home technology demonstrations and financial planning counters.",
    body:
      "In an intimate evening at a Gulshan convention venue, Mahatab Properties unveiled pre-launch configurations for Amara Grand Pavilion — a 26-storey glass tower on Gulshan Avenue.\n\nGuests explored floor-plan galleries, toured a full-scale smart-home automation demo, and consulted one-on-one with our finance team about payment plans and bank financing options. A dedicated desk helped foreign buyers with NRI remittance formalities.\n\nPlots are being offered with early-bird benefits for the first 30 reservations. Interested families may contact our Dhanmondi head office or the project site to book a private consultation.",
    image: "/slide-3.webp",
  },
  {
    title: "MPL Wins 'Trusted Developer' Award for the Fourth Consecutive Year",
    category: "news",
    date: "2026-06-05",
    excerpt:
      "Our relentless focus on on-time delivery and transparent practices has been recognised once again at the national Real Estate Excellence Awards 2026.",
    body:
      "For the fourth year running, Mahatab Properties Ltd. has been named 'Trusted Developer of the Year' at the Real Estate Excellence Awards.\n\nThe jury highlighted our across-the-board on-time handover record, the introduction of transparent progress dashboards for every ongoing project, and our customer-first after-sales support.\n\n\"This award belongs to every MPL family who trusted us with their investment,\" said our Managing Director. \"We will continue to build with the same ethical discipline that earned that trust.\"",
    image: "/slide-1.webp",
  },
  {
    title: "Charity Iftar & Community Day at Uttara",
    category: "event",
    date: "2026-03-12",
    excerpt:
      "Hundreds of residents joined MPL volunteers at our Uttara project courtyard for a community iftar and children's cultural programme during Ramadan.",
    body:
      "Mahatab Properties brought together residents, neighbours and volunteers for a warm community iftar at the Aurora Signature project courtyard in Sector 3, Uttara.\n\nAlongside the shared meal, children enjoyed an evening of cultural performances, and a medical camp offered free health check-ups to over two hundred attendees. Food packages were distributed to underprivileged families in the surrounding community.\n\n\"Building a home means building a community,\" said our CSR coordinator. \"These gatherings reflect the values of compassion and togetherness that shape every MPL neighbourhood.\"",
    image: "/slide-2.webp",
  },
  {
    title: "Aurora Signature Villas Now Ready for Possession",
    category: "news",
    date: "2026-01-28",
    excerpt:
      "Handover of our waterfront villa community in Uttara has officially begun — with keys, utility connections and handover documentation all completed.",
    body:
      "The gates of Aurora Signature are officially open. Possession of the 36 waterfront villas has commenced, with each home delivered with completed interiors, private gardens and fully connected utility services.\n\nFamilies receiving their keys also receive a comprehensive handover dossier — including the structural warranty certificate, fire-safety documentation and a personalised smart-home setup guide.\n\nA dedicated owner-support desk remains active on-site to assist families through the first months of settlement, continuing MPL's tradition of dependable after-sales care.",
    image: "/about-interior.webp",
  },
  {
    title: "Zenith Sky Atrium Achieves LEED-Certified Status",
    category: "news",
    date: "2025-11-19",
    excerpt:
      "Our Banani commercial tower has been awarded LEED certification, underscoring its leadership in energy efficiency and sustainable urban design.",
    body:
      "Zenith Sky Atrium in Banani has officially received LEED certification — a first for a high-rise of its scale in the neighbourhood.\n\nThe certification recognises the building's high-efficiency façade, intelligent energy-management systems, daylight-optimised floor plans and responsible water stewardship.\n\n\"Sustainability is not an add-on at MPL — it is the default standard for new construction,\" the project director noted. The tower remains on track for its March 2027 completion target.",
    image: "/building-1.webp",
  },
  {
    title: "Spring Home-fest: One-Stop Consultation for Aspiring Owners",
    category: "event",
    date: "2025-02-10",
    excerpt:
      "MPL's spring fair brought home-buying guidance, design workshops and special booking incentives to families across Dhaka.",
    body:
      "At the Mahatab Properties Spring Home-fest, families explored all live projects under one roof — comparing floor plans, walkthrough videos and live pricing side by side.\n\nThought-leadership sessions covered topics from property registration to interior styling, while our EMI desk produced instant financing illustrations for every visitor. Limited-period booking incentives were announced across all projects.\n\nA complete calendar of MPL open-house events for the year is now available on this page — join us and experience the difference of a transparent developer.",
    image: "/project-2.webp",
  },
];

const SEED_LANDOWNER_REVIEWS: Omit<LandownerReviewRow, "id" | "sort_order">[] = [
  {
    name: "Mohammad Shafiqur Rahman",
    role: "Landowner",
    company: "Dhanmondi, Dhaka",
    comment:
      "Mahatab Properties turned our family land into a landmark residential address. Every agreement was crystal clear, payments were always on time, and they kept us informed at every single stage of construction.",
    avatar: "/project-1.webp",
  },
  {
    name: "Anowara Begum",
    role: "Landowner",
    company: "Uttara, Dhaka",
    comment:
      "I entrusted my plot to MPL with complete confidence. They maximized the value of my land and delivered exactly what was promised — no hidden conditions, no surprises. A truly dependable partner.",
    avatar: "/project-2.webp",
  },
  {
    name: "Engr. Kamrul Hasan",
    role: "Landowner",
    company: "Banani, Dhaka",
    comment:
      "Their engineering team explained the entire development plan with full transparency before we signed. After handover, their support never stopped. I have already recommended them to two other landowners.",
    avatar: "/about-building.webp",
  },
  {
    name: "Farida Yasmin",
    role: "Landowner",
    company: "Bashundhara, Dhaka",
    comment:
      "What stood out was their honesty. From the very first meeting the financial projections were clear and realistic, and the finished apartments sold quickly. My family's land is now a valuable, income-generating asset.",
    avatar: "/about-interior.webp",
  },
];

const SEED_GALLERY: Omit<GalleryImageRow, "id" | "sort_order">[] = [
  {
    title: "Aurora Signature Villa Possession Ceremony",
    category: "handover",
    image: "/about-building.webp",
  },
  {
    title: "Keys Handover at Crescent View",
    category: "handover",
    image: "/building-2.webp",
  },
  {
    title: "Demo Apartment Inspection on Handover Day",
    category: "handover",
    image: "/about-interior.webp",
  },
  {
    title: "MOU Signing with Greenfield Developers",
    category: "mou",
    image: "/project-1.webp",
  },
  {
    title: "Land Partnership Agreement Ceremony",
    category: "mou",
    image: "/project-2.webp",
  },
  {
    title: "Annual Service Works at Noor Tower",
    category: "service-work",
    image: "/building-1.webp",
  },
  {
    title: "Pump & Utility Maintenance Team",
    category: "service-work",
    image: "/building-3.webp",
  },
  {
    title: "After-Sales Support Desk on Site",
    category: "service-work",
    image: "/slide-1.webp",
  },
  {
    title: "MPL Booth at REHAB Fair 2026",
    category: "rehab-fair",
    image: "/slide-3.webp",
  },
  {
    title: "Visitors Exploring Project Models",
    category: "rehab-fair",
    image: "/slide-2.webp",
  },
  {
    title: "Annual MPL Family Picnic",
    category: "picnic",
    image: "/building-2.webp",
  },
  {
    title: "Picnic Games by the Lake",
    category: "picnic",
    image: "/about-interior.webp",
  },
];

/** Tiny deterministic hash used to pick a distinct brand colour per client. */
function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const BRAND_COLORS = [
  ["#0d6e7e", "#074853"],
  ["#b45309", "#78350f"],
  ["#334155", "#0f172a"],
  ["#7c3aed", "#2e1065"],
  ["#be185d", "#500724"],
  ["#059669", "#064e3b"],
  ["#d97706", "#78350f"],
  ["#1d4ed8", "#172554"],
];

function writeClientLogo(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const [c1, c2] = BRAND_COLORS[hashString(name) % BRAND_COLORS.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="110" viewBox="0 0 320 110">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="320" height="110" rx="22" fill="url(#g)"/>
  <rect width="319" height="109" rx="21.5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff" letter-spacing="0.5">${name}</text>
</svg>
`;
  const dir = path.join(process.cwd(), "public", "logos");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${slug}.svg`);
  if (!fs.existsSync(file)) fs.writeFileSync(file, svg, "utf8");
  return `/logos/${slug}.svg`;
}

function seedIfEmpty(database: Database.Database) {
  const projectCount = (database.prepare("SELECT COUNT(*) AS c FROM projects").get() as { c: number }).c;
  if (projectCount === 0) {
    const insert = database.prepare(
      `INSERT INTO projects (name, location, status, type, image, description, area, units, floors, facing, parking, handover, brochure, gallery, features, map_lat, map_lng, sort_order)
       VALUES (@name, @location, @status, @type, @image, @description, @area, @units, @floors, @facing, @parking, @handover, @brochure, @gallery, @features, @map_lat, @map_lng, @sort_order)`
    );
    const tx = database.transaction(() => {
      SEED_PROJECTS.forEach((p, i) =>
        insert.run({
          name: p.name,
          location: p.location,
          status: p.status,
          type: p.type,
          image: p.image,
          description: p.description,
          area: p.area || "",
          units: p.units || "",
          floors: p.floors || "",
          facing: p.facing || "",
          parking: p.parking || "",
          handover: p.handover || "",
          brochure: p.brochure || "",
          gallery: JSON.stringify(p.gallery || [p.image]),
          features: JSON.stringify(p.features || []),
          map_lat: p.map_lat || "",
          map_lng: p.map_lng || "",
          sort_order: i + 1,
        })
      );
    });
    tx();
  }

  const clientCount = (database.prepare("SELECT COUNT(*) AS c FROM clients").get() as { c: number }).c;
  if (clientCount === 0) {
    const insert = database.prepare("INSERT INTO clients (name, logo) VALUES (?, ?)");
    const tx = database.transaction(() => {
      SEED_CLIENTS.forEach((name) => insert.run(name, writeClientLogo(name)));
    });
    tx();
  }

  const testimonialCount = (database.prepare("SELECT COUNT(*) AS c FROM testimonials").get() as { c: number }).c;
  if (testimonialCount === 0) {
    const insert = database.prepare(
      "INSERT INTO testimonials (name, role, company, comment, avatar, sort_order) VALUES (@name, @role, @company, @comment, @avatar, @sort_order)"
    );
    const tx = database.transaction(() => {
      SEED_TESTIMONIALS.forEach((t, i) => insert.run({ ...t, sort_order: i + 1 }));
    });
    tx();
  }

  const messageCount = (database.prepare("SELECT COUNT(*) AS c FROM messages").get() as { c: number }).c;
  if (messageCount === 0) {
    const insert = database.prepare(
      "INSERT INTO messages (name, email, phone, subject, message, is_read) VALUES (@name, @email, @phone, @subject, @message, @is_read)"
    );
    const tx = database.transaction(() => {
      SEED_MESSAGES.forEach((m) => insert.run(m));
    });
    tx();
  }

  const adminCount = (database.prepare("SELECT COUNT(*) AS c FROM admin").get() as { c: number }).c;
  if (adminCount === 0) {
    database
      .prepare("INSERT INTO admin (username, password_hash) VALUES (?, ?)")
      .run("admin", hashPassword("admin"));
  }

  const newsCount = (database.prepare("SELECT COUNT(*) AS c FROM news_events").get() as { c: number }).c;
  if (newsCount === 0) {
    const insert = database.prepare(
      "INSERT INTO news_events (title, category, date, excerpt, body, image, sort_order) VALUES (@title, @category, @date, @excerpt, @body, @image, @sort_order)"
    );
    const tx = database.transaction(() => {
      SEED_NEWS.forEach((n, i) => insert.run({ ...n, sort_order: i + 1 }));
    });
    tx();
  }

  const landownerReviewCount = (database.prepare("SELECT COUNT(*) AS c FROM landowner_reviews").get() as { c: number }).c;
  if (landownerReviewCount === 0) {
    const insert = database.prepare(
      "INSERT INTO landowner_reviews (name, role, company, comment, avatar, sort_order) VALUES (@name, @role, @company, @comment, @avatar, @sort_order)"
    );
    const tx = database.transaction(() => {
      SEED_LANDOWNER_REVIEWS.forEach((r, i) => insert.run({ ...r, sort_order: i + 1 }));
    });
    tx();
  }

  const galleryCount = (database.prepare("SELECT COUNT(*) AS c FROM gallery").get() as { c: number }).c;
  if (galleryCount === 0) {
    const insert = database.prepare(
      "INSERT INTO gallery (title, category, image, sort_order) VALUES (@title, @category, @image, @sort_order)"
    );
    const tx = database.transaction(() => {
      SEED_GALLERY.forEach((g, i) => insert.run({ ...g, sort_order: i + 1 }));
    });
    tx();
  }

  const settings = database.prepare("SELECT key FROM settings").all() as { key: string }[];
  const keys = new Set(settings.map((s) => s.key));
  const defaults: [string, string][] = [["show_clients_section", "1"]];
  const insertSetting = database.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  const tx = database.transaction(() => {
    for (const [key, value] of defaults) {
      if (!keys.has(key)) insertSetting.run(key, value);
    }
  });
  tx();
}

/** Backfill detail columns for projects created before the schema grew. */
function seedDetailDefaults(database: Database.Database) {
  const existing = database
    .prepare("SELECT * FROM projects WHERE facing = '' OR gallery = '' OR map_lat = ''")
    .all() as ProjectRow[];
  if (existing.length === 0) return;
  const update = database.prepare(
    `UPDATE projects SET facing = @facing, parking = @parking, handover = @handover,
       brochure = @brochure, gallery = @gallery, features = @features, map_lat = @map_lat, map_lng = @map_lng WHERE id = @id`
  );
  const tx = database.transaction(() => {
    existing.forEach((row) => {
      const seed = SEED_PROJECTS.find((p) => p.name === row.name);
      if (!seed) return;
      update.run({
        id: row.id,
        facing: seed.facing || "",
        parking: seed.parking || "",
        handover: seed.handover || "",
        brochure: seed.brochure || "",
        gallery: JSON.stringify(seed.gallery || [row.image]),
        features: JSON.stringify(seed.features || []),
        map_lat: seed.map_lat || "",
        map_lng: seed.map_lng || "",
      });
    });
  });
  tx();
}

export function getProjectById(id: number): ProjectRow | undefined {
  return getDb().prepare("SELECT * FROM projects WHERE id = ?").get(id) as ProjectRow | undefined;
}

export function getProjects(): ProjectRow[] {
  return getDb()
    .prepare("SELECT * FROM projects ORDER BY sort_order ASC, id ASC")
    .all() as ProjectRow[];
}

export function getClients(): ClientRow[] {
  return getDb().prepare("SELECT * FROM clients ORDER BY id ASC").all() as ClientRow[];
}

export function getTestimonials(): TestimonialRow[] {
  return getDb()
    .prepare("SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC")
    .all() as TestimonialRow[];
}

export function getMessages(): MessageRow[] {
  return getDb()
    .prepare("SELECT * FROM messages ORDER BY id DESC")
    .all() as MessageRow[];
}

export function getNewsEvents(): NewsEventRow[] {
  return getDb()
    .prepare("SELECT * FROM news_events ORDER BY date DESC, sort_order ASC")
    .all() as NewsEventRow[];
}

export function getNewsEventById(id: number): NewsEventRow | undefined {
  return getDb().prepare("SELECT * FROM news_events WHERE id = ?").get(id) as NewsEventRow | undefined;
}

export function getRecentNewsEvents(limit: number): NewsEventRow[] {
  return getDb()
    .prepare("SELECT * FROM news_events ORDER BY date DESC, sort_order ASC LIMIT ?")
    .all(limit) as NewsEventRow[];
}

export function getLandownerReviews(): LandownerReviewRow[] {
  return getDb()
    .prepare("SELECT * FROM landowner_reviews ORDER BY sort_order ASC, id ASC")
    .all() as LandownerReviewRow[];
}

export function getGalleryImages(): GalleryImageRow[] {
  return getDb()
    .prepare("SELECT * FROM gallery ORDER BY sort_order ASC, id ASC")
    .all() as GalleryImageRow[];
}

export function getGalleryImageById(id: number): GalleryImageRow | undefined {
  return getDb().prepare("SELECT * FROM gallery WHERE id = ?").get(id) as GalleryImageRow | undefined;
}

export function getAdminByUsername(username: string): AdminRow | undefined {
  return getDb().prepare("SELECT * FROM admin WHERE username = ?").get(username) as AdminRow | undefined;
}

export function getSetting(key: string): string {
  const row = getDb().prepare("SELECT value FROM settings WHERE key = ?").get(key) as
    | SettingRow
    | undefined;
  return row?.value ?? "";
}

export function setSetting(key: string, value: string): void {
  getDb()
    .prepare(
      "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    )
    .run(key, value);
}

const CLIENT_SECTION_SETTING = "show_clients_section";

export function isClientsSectionEnabled(): boolean {
  return getSetting(CLIENT_SECTION_SETTING) !== "0";
}

export function setClientsSectionEnabled(enabled: boolean): void {
  setSetting(CLIENT_SECTION_SETTING, enabled ? "1" : "0");
}

export function adminExists(): boolean {
  return (getDb().prepare("SELECT COUNT(*) AS c FROM admin").get() as { c: number }).c > 0;
}