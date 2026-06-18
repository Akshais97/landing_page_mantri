export interface Highlight {
  id: string;
  text: string;
}

export interface Configuration {
  id: string;
  title: string;
  superArea: string;
  usableArea: string;
  price: string;
  description: string;
  features: string[];
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface DestinationCard {
  id: string;
  realm: string;
  title: string;
  subtitle: string;
  imagePath: string;
  fallbackUrl: string;
}

export interface ExplainerLevel {
  id: string;
  level: string;
  title: string;
  highlights: string[];
  description: string;
  imagePath: string;
  fallbackUrl: string;
}

export interface LifestyleCard {
  id: string;
  title: string;
  subline: string;
  imagePath: string;
  fallbackUrl: string;
}

export const PROJECT_INFO = {
  name: "CODENAME: THE LEGEND",
  tagline: "THE WORLD OF LEGENDS",
  location: "Yelahanka, North Bangalore",
  mainUSP: "South India's First Greek-Themed Stacked Villa Luxury Homes",
  product: "Premium 4.5 BHK Stacked Villas with Servant Room",
  possession: "December 2028",
  urgency: "Only limited pre-launch inventory available. Book early for priority unit selection.",
  reraCompliance: "RERA details to be updated. Distances and upcoming infrastructure are subject to final verification.",
  phoneNumber: "+91 80 4040 1928", // Exclusive phone line style placeholder
};

export const KEY_HIGHLIGHTS: Highlight[] = [
  { id: "1", text: "South India's First Greek-Themed Stacked Villa Luxury Homes" },
  { id: "2", text: "Premium 4.5 BHK Stacked Villas with Servant Room" },
  { id: "3", text: "Private Terrace options available" },
  { id: "4", text: "4-side open residences with zero common walls" },
  { id: "5", text: "Abundant natural light and cross ventilation" },
  { id: "6", text: "Maximum privacy and exclusivity" },
  { id: "7", text: "Large decks and expansive balconies" },
  { id: "8", text: "Landscaped green and lake views" },
  { id: "9", text: "Zero vehicle movement community for maximum safety" },
  { id: "10", text: "2-acre mini forest for mind, body and soul" },
  { id: "11", text: "2-acre lakeside civic amenity zone" },
  { id: "12", text: "40,000+ sq.ft branded clubhouse by IIESEUM Clubs" },
  { id: "13", text: "Resort-inspired landscaping and international amenities" },
  { id: "14", text: "Early investor pricing & priority unit selection" },
];

export const CONFIGURATIONS: Configuration[] = [
  {
    id: "config-1",
    title: "4.5 BHK + Servant Room Stacked Villa",
    superArea: "2500 Sq.ft",
    usableArea: "Approx. 3600 Sq.ft",
    price: "₹2.5 Cr Onwards",
    description: "Multi-level vertical luxury home with double-height lobby, majestic layouts, pristine marble finishes, and separate servant quarters.",
    features: ["Zero Common Walls", "4-side Open Residence", "Separate Servant Room", "Large Living & Dining Deck"]
  },
  {
    id: "config-2",
    title: "4.5 BHK + Servant Room Stacked Villa with Private Terrace",
    superArea: "2500 Sq.ft",
    usableArea: "Approx. 3600 Sq.ft",
    price: "₹2.85 Cr Onwards", // Majestic variation
    description: "The ultimate residential statement. Vertically planned stacked villa featuring a private sky terrace, infinity lounging porch, and pristine views.",
    features: ["Private Sky Terrace", "Sky Lounge & Bar Deck", "Zero Common Walls", "Elevated Private Green Canopy"]
  }
];

export const EXPLAINER_LEVELS: ExplainerLevel[] = [
  {
    id: "lvl-ground",
    level: "Ground / Lower Level",
    title: "The Grand Living & Social Lounge",
    highlights: ["Double-Height Ceiling", "Expansive Formal Living", "Bespoke Dining Porch", "Separate Wet & Dry Kitchen", "Ensuite Guest Bedroom"],
    description: "Designed for grand entertainment and warmth. Flows seamlessly into the private deck, wrapping your social lounge with abundant natural light.",
    imagePath: "assets/villa-interior-living.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lvl-upper",
    level: "Upper Level",
    title: "The Private Sanctuary & Quiet Lounges",
    highlights: ["Master Bedroom Suite", "Private Family Lounge", "Generous Kids Ensuite", "Expansive Balconies", "Dressing Alcoves"],
    description: "A private retreat dedicated strictly to family rest. Features individual walk-in closets, bespoke bathroom fittings, and spacious private sunrise balconies.",
    imagePath: "assets/villa-bedroom-suite.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lvl-terrace",
    level: "Terrace Level",
    title: "The Sky Deck & Private Terrace Lounge",
    highlights: ["Bespoke Sky Lounge", "Pergola-shaded BBQ Deck", "Mediterranean Sky Garden", "Outdoor Dining Area", "Scenic Overlook"],
    description: "Your absolute private domain under the sky. Perfect for stargazing, holding closed-circle private cocktail soirees, or enjoying quiet morning yoga amidst dense green canopies.",
    imagePath: "assets/private-terrace.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1600&q=80"
  }
];

export const DESTINATION_CARDS: DestinationCard[] = [
  {
    id: "dest-grove",
    realm: "THE GROVE",
    title: "2-Acre Mini Forest",
    subtitle: "For mind, body and soul.",
    imagePath: "assets/mini-forest.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "dest-shore",
    realm: "THE SHORE",
    title: "2-Acre Lakeside Civic Zone",
    subtitle: "Where life finds its perfect pace.",
    imagePath: "assets/lakeside-zone.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "dest-agora",
    realm: "THE AGORA",
    title: "40,000+ Sq.ft Branded Clubhouse",
    subtitle: "Where great minds gather.",
    imagePath: "assets/branded-clubhouse.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "dest-residences",
    realm: "THE RESIDENCES",
    title: "Greek-Themed Stacked Villas",
    subtitle: "Built for lives worth remembering.",
    imagePath: "assets/stacked-villa-exterior.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80"
  }
];

export const AMENITIES: Amenity[] = [
  { id: "am-club", title: "40,000+ Sq.ft Clubhouse", subtitle: "IIESEUM Clubs", description: "Bespoke sports lounges, business centers, high-end private dining, and artistic libraries.", iconName: "Crown" },
  { id: "am-pool", title: "Resort-Inspired Pool", subtitle: "Infinity-edge Lap Pool", description: "Surrounded by majestic white marble cabanas and Mediterranean olive plantings.", iconName: "Waves" },
  { id: "am-wellness", title: "Wellness Spaces", subtitle: "Spa & Meditation Pavilions", description: "Dedicated therapy rooms, steam chambers, and quiet zones powered by acoustic design.", iconName: "Sparkles" },
  { id: "am-lounge", title: "Social Lounge & Agora", subtitle: "Private Resident Gathering", description: "The community focal point inspired by ancient Greek central social hubs.", iconName: "Users" },
  { id: "am-dining", title: "Dining & Celebrations", subtitle: "Al Fresco Sky Deck", description: "A highly curated hosting arena equipped for celebrity chef catering events.", iconName: "UtensilsCrossed" },
  { id: "am-forest", title: "2-Acre Mini Forest", subtitle: "The Breath Exchange", description: "Over 500 indigenous trees creating an air purification buffer zone and shaded walking trails.", iconName: "Trees" },
  { id: "am-lakeside", title: "Lakeside Civic Zone", subtitle: "Waterside Boardwalk", description: "An expansive promenade perfect for scenic evening strolls and reflection.", iconName: "Compass" },
  { id: "am-vehicle", title: "Zero Vehicle Movement", subtitle: "100% Pedestrian Friendly", description: "Traffic is intelligently routed completely underground upon entering the main gate.", iconName: "ShieldAlert" },
];

export const LIFESTYLE_ITEMS: LifestyleCard[] = [
  {
    id: "life-1",
    title: "Timeless Conversations",
    subline: "Where ideas feel at home.",
    imagePath: "assets/community-agora.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "life-2",
    title: "Legendary Leisure",
    subline: "Every day, beautifully unhurried.",
    imagePath: "assets/poolside-leisure.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "life-3",
    title: "The Art of Stillness",
    subline: "Where every day slows down.",
    imagePath: "assets/relaxation-calm.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "life-4",
    title: "Active Luxury",
    subline: "Wellness becomes a way of life.",
    imagePath: "assets/active-lifestyle.jpg",
    fallbackUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80"
  }
];

export const DEFAULT_FALLBACK_IMAGES: Record<string, string> = {
  "https://img.youtube.com/vi/lc3F2qo32H0/maxresdefault.jpg": "https://img.youtube.com/vi/lc3F2qo32H0/sddefault.jpg",
  "assets/hero-greek-entrance.jpg": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
  "assets/mobile-hero.jpg": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1080&q=80",
  "assets/curtain-reveal.jpg": "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?auto=format&fit=crop&w=1200&q=80",
  "assets/vr-future-vision.jpg": "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=80",
  "assets/blueprint-of-legend.jpg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  "assets/stacked-villa-exterior.jpg": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  "assets/stacked-villa-cutaway.jpg": "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=1200&q=80",
  "assets/private-terrace.jpg": "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1600&q=80",
  "assets/mini-forest.jpg": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
  "assets/lakeside-zone.jpg": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "assets/branded-clubhouse.jpg": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
  "assets/poolside-leisure.jpg": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  "assets/active-lifestyle.jpg": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
  "assets/relaxation-calm.jpg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  "assets/community-agora.jpg": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "assets/location-map.jpg": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
  "assets/villa-interior-living.jpg": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "assets/villa-bedroom-suite.jpg": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "assets/private-study.jpg": "https://images.unsplash.com/photo-1507842229512-238dd25936ce?auto=format&fit=crop&w=1200&q=80",
  "assets/servant-room-utility.jpg": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
  "assets/master-community-aerial.jpg": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
  "assets/project_image.jpeg": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "assets/lead-form-bg.jpg": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "assets/thank-you-hero.jpg": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
};
