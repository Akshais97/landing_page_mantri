import { useState, useEffect } from "react";
import { 
  Compass,
  Sparkles, 
  ArrowRight, 
  Clock, 
  Phone, 
  Database
} from "lucide-react";
import { 
  PROJECT_INFO, 
  KEY_HIGHLIGHTS
} from "./data";
import InteractiveImage from "./components/InteractiveImage";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationModal from "./components/RegistrationModal";
import AdminConsole from "./components/AdminConsole";

const resolveAsset = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  const baseUrl = import.meta.env.BASE_URL || "/";
  return `${baseUrl}${cleanPath}`;
};

export default function App() {
  // Lead popup states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubline, setModalSubline] = useState("");
  const [modalSource, setModalSource] = useState("");
  const [modalShowBudget, setModalShowBudget] = useState(false);
  const [conceptFilmAutoplay, setConceptFilmAutoplay] = useState(false);

  // Admin Console state
  const [adminOpen, setAdminOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    // Lead capture statistics update
    const updateLeadCount = () => {
      const stored = localStorage.getItem("codename_the_legend_leads");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLeadCount(parsed.length);
        } catch {
          setLeadCount(2);
        }
      } else {
        setLeadCount(2); // Mock default loaded count
      }
    };
    
    updateLeadCount();
    window.addEventListener("storage_leads_updated", updateLeadCount);

    return () => {
      window.removeEventListener("storage_leads_updated", updateLeadCount);
    };
  }, []);

  const openFormModal = (title: string, subline: string, source: string, showBudget = false) => {
    setModalTitle(title);
    setModalSubline(subline);
    setModalSource(source);
    setModalShowBudget(showBudget);
    setModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-marble font-sans overflow-x-hidden text-charcoal selection:bg-gold selection:text-white relative">
      
      {/* 1. TOP HEADER / BRAND BAR */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-ivory/95 backdrop-blur-md border-b border-gold/20 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center text-left">
            <img
              src={resolveAsset("/assets/logo.svg")}
              alt="Codename The Legend"
              className="h-[88px] w-[190px] sm:w-[230px] object-contain scale-[4.2] origin-center pointer-events-none"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-xs uppercase tracking-[0.22em] font-bold text-olive">
            <button onClick={() => scrollToSection("story")} className="hover:text-gold transition cursor-pointer">The Legend</button>
            <button onClick={() => scrollToSection("lakeside")} className="hover:text-gold transition cursor-pointer">The Concept</button>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${PROJECT_INFO.phoneNumber.replace(/\s+/g, "")}`} 
              className="hidden sm:flex items-center gap-2 border border-gold text-charcoal text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-2.5 hover:bg-gold hover:text-white transition-all rounded-none bg-transparent"
            >
              <Phone className="w-3 h-3 text-gold shrink-0" />
              <span>{PROJECT_INFO.phoneNumber}</span>
            </a>
            <button
              onClick={() => openFormModal("EXPRESS INTEREST", "Priority Unit Selection and early pricing active.", "Header Premium CTA")}
              className="bg-charcoal hover:bg-gold hover:text-[#171717] text-white text-[10px] tracking-[0.25em] font-bold uppercase py-3 px-5 transition-all duration-300 rounded-none shadow-sm cursor-pointer"
            >
              BOOK A SLOT
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION */}
      <section className="relative mt-24 h-[min(calc(100vh-6rem),760px)] bg-stone-950 text-white overflow-hidden">
        {/* Cinematic Hero Banner */}
        <div className="relative w-full h-full overflow-hidden bg-stone-950">
          <InteractiveImage 
            src="/assets/Surya_Phase-1_master.jpg"
            alt="Hero banner for Codename: The Legend"
            parentClass="relative w-full h-full overflow-hidden group"
            className="w-full h-full object-contain object-center"
          />
        </div>
      </section>

      {/* 4. INTRO STORY SECTION (Section 2) */}
      <section id="story" className="py-24 md:py-32 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Left: Curved high fashion image frames */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute top-4 left-4 -translate-x-4 -translate-y-4 inset-0 border border-gold/25 rounded-none pointer-events-none transition group-hover:translate-x-0 group-hover:translate-y-0 duration-500" />
              <InteractiveImage 
                src="/assets/curtain.jpg" 
                alt="Classical Greek whisper sculptures representing the rumors of the legend"
                parentClass="aspect-4/5 rounded-none overflow-hidden relative shadow-2xl bg-stone-950"
              />
            </div>

            {/* Story Right: Editorial narrative context */}
            <div className="lg:col-span-7 text-center space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-bold text-gold uppercase">THE ORIGIN STATEMENT</span>
              
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-neutral-950 tracking-normal">
                <span>Live Like A </span>
                <span className="italic font-light text-gold">Legend</span>
              </h2>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                Welcome to <span className="font-serif font-bold text-[#171717] text-[1.08em]">Codename: THE LEGEND</span> an iconic new address redefining luxury living in <span className="font-serif font-bold text-[#171717] text-[1.08em]">Yelahanka, North Bangalore</span>.
              </p>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                Created for those who aspire to live beyond the ordinary, <span className="font-serif font-bold text-[#171717] text-[1.08em]">THE LEGEND</span> presents South India&apos;s first luxury <span className="font-serif font-bold text-[#171717] text-[1.08em]">Stacked Villa Residences</span> where timeless architecture, uncompromising craftsmanship, expansive private living, lush forest landscapes, and curated lifestyle experiences come together in perfect harmony.
              </p>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                This isn&apos;t simply a home. It&apos;s a legacy built for extraordinary living.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openFormModal("REQUEST DISCOVERY BOOKLET", "Secure a pristine walkthrough prospectus of the Greek stacked villas.", "Intro Story CTA")}
                  className="bg-charcoal hover:bg-gold hover:text-charcoal text-white font-bold text-[10px] tracking-[0.2em] uppercase py-4.5 px-8 rounded-none transition duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  DISCOVER THE WORLD OF LEGENDS
                  <ArrowRight className="w-4 h-4 text-gold shrink-0" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>
      {/* 12. CONCEPT FILM FEATURE (Section 10) */}
      <section id="lakeside" className="py-24 md:py-32 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* Concept Film Narrative */}
            <div className="lg:col-span-5 text-center space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-bold text-gold uppercase">
                THE CONCEPT FILM
              </span>
              
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] text-neutral-950 tracking-normal">
                <span>What Makes a </span>
                <span className="italic font-light text-gold">Legend?</span>
              </h2>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                A legend is not created by scale alone.
              </p>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                It is shaped by presence, by silence, by beauty that does not need to announce itself.
              </p>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                This film captures the spirit behind <span className="font-serif font-bold text-[#171717] text-[1.08em]">Codename: THE LEGEND</span> — a world imagined for those who seek more than luxury, more than comfort, more than an address.
              </p>

              <p className="text-neutral-700 leading-relaxed text-sm md:text-[15px] max-w-3xl mx-auto">
                It is a glimpse into a life designed to feel rare, rooted, elevated, and unforgettable.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setConceptFilmAutoplay(true);
                    document.getElementById("concept-film-video")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="bg-charcoal hover:bg-gold hover:text-charcoal text-white font-bold text-[10px] tracking-[0.2em] uppercase py-4.5 px-8 rounded-none transition duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  WATCH THE CONCEPT FILM
                  <ArrowRight className="w-4 h-4 text-gold shrink-0" />
                </button>
              </div>
            </div>

            {/* Concept Film Embed */}
            <div id="concept-film-video" className="lg:col-span-7 relative">
              <div className="absolute -inset-2 border border-gold/15 rounded-none pointer-events-none" />
              <div className="relative aspect-video rounded-none overflow-hidden shadow-2xl bg-neutral-900">
                <iframe
                  src={`https://www.youtube.com/embed/lc3F2qo32H0?rel=0${conceptFilmAutoplay ? "&autoplay=1" : ""}`}
                  title="Codename The Legend concept film"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* 16. INVESTMENT / URGENCY BAR (Section 14) */}
      <section className="py-20 bg-neutral-900 text-white relative border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1 text-[10px] tracking-[0.3em] font-mono text-gold uppercase font-bold">
            <Clock className="w-4 h-4 animate-pulse text-gold" /> STRICT LIMITED HORIZON EXCLUSIVITY
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-marble">
            The opportunity is limited.
          </h2>
          
          <p className="font-serif italic text-gold text-base">
            Register your interest to access the unveiling of The Legends.
          </p>
          
          

          <div className="flex justify-center gap-2 text-[10px] tracking-widest uppercase font-mono text-zinc-400 font-bold">
            <span>PRIORITY ACCESS</span>
            <span>|</span>
            <span>PRIVATE PREVIEWS</span>
            <span>|</span>
            <span>OFFICIAL UNVEILING</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("final-form")}
              className="bg-gold hover:bg-gold/90 text-neutral-950 font-sans font-bold text-[10px] tracking-widest uppercase py-4 px-10 rounded-none transition cursor-pointer"
            >
              BOOK A SLOT
            </button>
            <a
              href={`tel:${PROJECT_INFO.phoneNumber.replace(/\s+/g, "")}`}
              className="hover:bg-white/10 border border-white/20 text-white font-sans font-bold text-[10px] tracking-widest uppercase py-4 px-10 rounded-none transition"
            >
              CALL NOW
            </a>
          </div>
        </div>
      </section>

      {/* 17. FINAL LEAD CAPTURE FORM SECTION (Section 15) */}
      <section id="final-form" className="pt-20 pb-12 bg-stone-950 text-white relative overflow-hidden">
        {/* Dynamic Dark Marble Texture backdrop */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <InteractiveImage 
            src="/assets/project_image.jpeg" 
            alt="Dark charcoal premium marble texture bg representation"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] font-mono text-gold uppercase block font-bold mb-2">
              ACQUIRE ENTRY TOKEN
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-marble tracking-wide">
              Experience Legendary Living.
            </h2>
            <p className="text-stone-400 text-xs italic mt-2.5 font-serif">
              Express your interest to be part of Codename: THE LEGEND today.
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
          </div>

          {/* Form component loaded inside a beautiful premium container with shadows */}
          <div className="bg-neutral-900 border border-gold/15 p-1 rounded-none shadow-2xl">
            <RegistrationForm 
              source="Final Lead Form Section" 
              title="Express Your Interest Now"
              subline="A private communications desk representative registers your token immediately."
              showBudget={true}
            />
          </div>

          <p className="text-stone-500 text-[11px] text-center mt-4 uppercase tracking-wider font-mono">
            * Our executive consulting team will reach out within 12 HOURS of your submission
          </p>

        </div>
      </section>

      {/* 18. ACCESSIBLE FOOTER (Section 16) */}
      <footer className="bg-[#080706] border-t border-gold/20 py-14 md:py-16 text-stone-400 text-xs relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-16 items-start pb-10 border-b border-gold/10">
            <div className="text-left space-y-6">
              <div className="h-28 w-72 overflow-hidden flex items-center justify-start">
                <img
                  src={resolveAsset("/assets/logo.svg")}
                  alt="Codename The Legend"
                  className="h-full w-full object-contain scale-[3.25] origin-center pointer-events-none invert"
                />
              </div>

              <p className="max-w-2xl text-stone-300 text-sm leading-7">
                South India's First Greek-Themed Stacked Villa Luxury Residences, planned strictly to host private generational legends with infinite layouts, no common walls, and majestic forest trails.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] tracking-[0.08em]">
                <a
                  href={`tel:${PROJECT_INFO.phoneNumber.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-gold hover:text-white transition font-mono"
                >
                  <Phone className="w-4 h-4" />
                  <span>{PROJECT_INFO.phoneNumber}</span>
                </a>
                <span className="hidden sm:block h-4 w-px bg-gold/20" />
                <span className="inline-flex items-center gap-2 font-mono text-stone-300">
                  <Compass className="w-4 h-4 text-gold" />
                  <span>Yelahanka, North Bangalore</span>
                </span>
              </div>
            </div>

            <div className="lg:text-right space-y-8">
              <div>
                <h5 className="font-serif text-gold text-sm uppercase tracking-[0.26em] font-semibold mb-5">
                  CAMPAIGN DIRECTORIES
                </h5>
                <div className="flex flex-col items-start lg:items-end gap-3 text-sm">
                  <button onClick={() => scrollToSection("story")} className="text-stone-300 hover:text-white transition">
                    Story Concept
                  </button>
                  <button onClick={() => scrollToSection("lakeside")} className="text-stone-300 hover:text-white transition">
                    Private Preview Trailer
                  </button>
                  <button onClick={() => scrollToSection("final-form")} className="text-stone-300 hover:text-white transition">
                    Book A Slot
                  </button>
                </div>
              </div>

            
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[10px] tracking-[0.2em] uppercase font-mono text-stone-600">
            <span>&copy; {new Date().getFullYear()} CODENAME: THE LEGEND</span>
            <span>Private preview campaign. Details subject to final builder confirmation.</span>
          </div>
        </div>
      </footer>

      {/* 19. MOBILE STICKY DIRECT CTAs BOTTOM PANEL */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-ivory/95 backdrop-blur-md border-t border-gold/25 z-40 grid grid-cols-2">
        <a 
          href={`tel:${PROJECT_INFO.phoneNumber.replace(/\s+/g, "")}`}
          className="flex items-center justify-center gap-2 text-neutral-900 font-sans font-bold text-xs tracking-wider uppercase border-r border-gold/15"
        >
          <Phone className="w-4 h-4 text-gold" />
          <span>CALL CAMPAIGN</span>
        </a>
        <button
          onClick={() => scrollToSection("final-form")}
          className="bg-gold text-charcoal font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer rounded-none border-none"
        >
          <Sparkles className="w-4 h-4 text-neutral-950" />
          <span>BOOK PREVIEW</span>
        </button>
      </div>

      {/* 20. POPUP MODAL LIGHTBOX TRIGGERED BY CTA TRIGGERS */}
      <RegistrationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        subline={modalSubline}
        source={modalSource}
        showBudget={modalShowBudget}
      />

      {/* 21. LOCAL LEADS PRE-LAUNCH CONSOLE PANEL */}
      {adminOpen && (
        <AdminConsole onClose={() => setAdminOpen(false)} />
      )}

    </div>
  );
}
