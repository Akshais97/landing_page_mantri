import { useState, useEffect } from "react";
import { 
  Compass, 
  Waves, 
  ShieldAlert, 
  Trees, 
  Crown, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Expand, 
  ArrowRight, 
  Clock, 
  Phone, 
  Mail, 
  Award, 
  Info, 
  Layers, 
  MapPin, 
  Sliders, 
  Database
} from "lucide-react";
import { 
  PROJECT_INFO, 
  KEY_HIGHLIGHTS, 
  CONFIGURATIONS, 
  EXPLAINER_LEVELS, 
  DESTINATION_CARDS, 
  AMENITIES, 
  LIFESTYLE_ITEMS 
} from "./data";
import InteractiveImage from "./components/InteractiveImage";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationModal from "./components/RegistrationModal";
import AdminConsole from "./components/AdminConsole";

export default function App() {
  // Lead popup states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubline, setModalSubline] = useState("");
  const [modalSource, setModalSource] = useState("");
  const [modalShowBudget, setModalShowBudget] = useState(false);

  // Active level explainer tab
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);

  // Admin Console state
  const [adminOpen, setAdminOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  // Live countdown timer for pre-launch urgency
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 14, minutes: 30, seconds: 45 });

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

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => {
      window.removeEventListener("storage_leads_updated", updateLeadCount);
      clearInterval(timer);
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
      <header className="fixed top-0 left-0 right-0 h-20 bg-ivory/95 backdrop-blur-md border-b border-gold/20 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex flex-col text-left">
            <span className="text-[9px] tracking-[0.3em] font-bold text-olive uppercase leading-none mb-1">CODENAME</span>
            <span className="font-serif text-xl sm:text-2xl tracking-tight font-black text-charcoal leading-none uppercase">
              THE LEGEND
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-olive">
            <button onClick={() => scrollToSection("story")} className="hover:text-gold transition cursor-pointer">The Legend</button>
            <button onClick={() => scrollToSection("concept")} className="hover:text-gold transition cursor-pointer">The Concept</button>
            <button onClick={() => scrollToSection("residences")} className="hover:text-gold transition cursor-pointer">Villas</button>
            <button onClick={() => scrollToSection("world")} className="hover:text-gold transition cursor-pointer">The Realms</button>
            <button onClick={() => scrollToSection("amenities")} className="hover:text-gold transition cursor-pointer">Amenities</button>
            <button onClick={() => scrollToSection("location")} className="hover:text-gold transition cursor-pointer">Location</button>
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
              PREVIEW REQUISITION
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 opacity-40">
          <InteractiveImage 
            src="assets/hero-greek-entrance.jpg"
            alt="Greek luxury gateway entrance of Codename: The Legend"
            className="w-full h-full scale-100 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
        </div>

        {/* Elegant Greek Line Art Overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-950 pointer-events-none" />

        {/* Hero Golden Arch accent decoration */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] border border-gold/15 rounded-t-full pointer-events-none hidden xl:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8 text-left animate-fade-in-up">
            <div className="mb-4 inline-block px-3 py-1 bg-gold text-white text-[10px] font-bold tracking-[0.3em] uppercase">
              Pre-Launching Now
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl leading-[1.05] font-normal tracking-tight text-marble mb-4">
              South India's First <br/>
              <span className="italic font-light text-gold">Greek-Themed</span> <br/>
              Stacked Villas
            </h1>

            <p className="text-taupe text-lg md:text-xl leading-relaxed max-w-xl mb-4 text-left font-serif">
              Premium 4.5 BHK Stacked Villas with Servant Room &amp; Private Terrace options in Yelahanka, North Bangalore.
            </p>

            <p className="text-stone-400 text-sm max-w-2xl leading-relaxed mb-8 text-left">
              Experience legendary living featuring private sky gardens, a scenic 2-acre mini forest, lakeside civic amenity sanctuary, and India's finest 40,000+ sq.ft branded club zone managed by the prestigious IIESEUM Clubs network.
            </p>

            {/* Greek-themed metric highlights columns */}
            <div className="flex gap-12 pt-6 border-t border-white/10 w-full mb-8 text-left">
              <div className="flex flex-col">
                <span className="text-gold text-2xl sm:text-3xl font-serif">2500+</span>
                <span className="text-[9px] text-white/50 uppercase tracking-widest font-mono font-bold mt-1">Sq.Ft SBUA</span>
              </div>
              <div className="flex flex-col border-l border-white/15 pl-8">
                <span className="text-gold text-2xl sm:text-3xl font-serif">40k+</span>
                <span className="text-[9px] text-white/50 uppercase tracking-widest font-mono font-bold mt-1">Sq.Ft Club</span>
              </div>
              <div className="flex flex-col border-l border-white/15 pl-8">
                <span className="text-gold text-2xl sm:text-3xl font-serif">2 Acr</span>
                <span className="text-[9px] text-white/50 uppercase tracking-widest font-mono font-bold mt-1">Mini Forest</span>
              </div>
            </div>

            {/* Simple CTAs */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <button 
                onClick={() => scrollToSection("final-form")}
                className="w-full sm:w-auto text-center bg-gold hover:bg-gold/90 text-charcoal font-bold tracking-[0.2em] text-[10px] py-4 px-8 uppercase transition-all duration-300 rounded-none cursor-pointer"
              >
                BOOK A PRIVATE PREVIEW
              </button>
              <a 
                href={`tel:${PROJECT_INFO.phoneNumber.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto text-center hover:bg-white/10 border border-white/30 text-white font-bold tracking-[0.2em] text-[10px] py-4 px-8 uppercase transition-all duration-300 rounded-none"
              >
                CALL NOW
              </a>
            </div>

            {/* Mobile/Below trust strip note */}
            <div className="text-stone-400 text-[11px] uppercase tracking-[0.2em] mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <span>• Limited Pre-Launch Inventory</span>
              <span>• Early Pricing</span>
              <span>• December 2028 Allocation</span>
            </div>
          </div>

          {/* Hero Right: Floating lead form card of private request */}
          <div className="lg:col-span-5 w-full mt-8 lg:mt-0 relative">
            <div className="relative">
              {/* Decorative classical pillar design frame behind the form for visual theme */}
              <div className="absolute -inset-4 bg-gradient-to-r from-gold/15 to-transparent blur-xl opacity-50 rounded" />
              <RegistrationForm 
                source="Desktop Hero Floating Card" 
                title="REGISTER FOR PRIVATE PREVIEW"
                subline="Secure early pre-launch pricing benefit."
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. TIMER / REGISTER STATUS BANNER */}
      <div className="bg-charcoal border-y border-gold/20 text-white/95 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-gold rounded-full animate-ping" />
            <div>
              <span className="text-[9px] tracking-[0.3em] text-gold uppercase block font-mono font-bold">PRE-LAUNCH ENROLMENT TICKING</span>
              <span className="text-[11px] text-stone-300 uppercase">Only limited registration capacity left. Early-bird allocation rules apply.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div className="bg-charcoal/80 border border-gold/15 px-3 py-1.5 rounded-none min-w-[60px]">
              <span className="block font-serif text-xl text-gold font-bold">{timeLeft.days}</span>
              <span className="text-[7.5px] text-stone-400 uppercase tracking-widest font-mono">DAYS</span>
            </div>
            <div className="bg-charcoal/80 border border-gold/15 px-3 py-1.5 rounded-none min-w-[60px]">
              <span className="block font-serif text-xl text-gold font-bold">{timeLeft.hours}</span>
              <span className="text-[7.5px] text-stone-400 uppercase tracking-widest font-mono">HRS</span>
            </div>
            <div className="bg-charcoal/80 border border-gold/15 px-3 py-1.5 rounded-none min-w-[60px]">
              <span className="block font-serif text-xl text-gold font-bold">{timeLeft.minutes}</span>
              <span className="text-[7.5px] text-stone-400 uppercase tracking-widest font-mono">MINS</span>
            </div>
            <div className="bg-charcoal/80 border border-gold/15 px-3 py-1.5 rounded-none min-w-[60px]">
              <span className="block font-serif text-xl text-gold font-bold">{timeLeft.seconds}</span>
              <span className="text-[7.5px] text-stone-400 uppercase tracking-widest font-mono">SECS</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTRO STORY SECTION (Section 2) */}
      <section id="story" className="py-24 md:py-32 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story Left: Curved high fashion image frames */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute top-4 left-4 -translate-x-4 -translate-y-4 inset-0 border border-gold/25 rounded-none pointer-events-none transition group-hover:translate-x-0 group-hover:translate-y-0 duration-500" />
              <InteractiveImage 
                src="assets/curtain-reveal.jpg" 
                alt="Classical Greek whisper sculptures representing the pre-launch rumors of the legend"
                parentClass="aspect-4/5 rounded-none overflow-hidden relative shadow-2xl bg-stone-950"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-marble/95 backdrop-blur-sm border border-gold/20 text-neutral-950 rounded-none shadow-lg text-left">
                <span className="font-serif text-[10px] uppercase tracking-widest block text-gold mb-1 font-bold">UNVEILING DEC 2028</span>
                <span className="font-serif text-base font-normal">" Timeless Greece, reimagined inside North Bangalore's finest growth axis. "</span>
              </div>
            </div>

            {/* Story Right: Editorial narrative context */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-bold text-gold uppercase">THE ORIGIN STATEMENT</span>
              
              <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.2] text-neutral-950 tracking-wide">
                Some homes become addresses. <br />
                <span className="italic font-light text-gold text-4xl sm:text-5xl">Others become legends.</span>
              </h2>

              <p className="text-neutral-700 leading-relaxed text-sm">
                Introducing <span className="font-serif font-semibold text-[#171717]">Codename: THE LEGEND</span>, a landmark residential collective inspired by the enduring aesthetic code of classical Greek architecture and Mediterranean luxury, mastercrafted exclusively for Yelahanka, North Bangalore.
              </p>

              <p className="text-neutral-700 leading-relaxed text-sm">
                This is not just another residential community of standard apartments. It is a sovereign sanctuary of stacked villa luxury residences where monumental architecture, native forest canopies, lakeside healing waters, club curation, and vertical privacy merge into an unimaginable lifestyle.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
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

      {/* 5. THE FIRST OF ITS KIND SECTION (Section 3) */}
      <section id="concept" className="py-24 bg-marble border-y border-stone-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase block font-bold mb-2">LIMITED LAUNCH REVELATION</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-neutral-950 tracking-wide">
              A First For South India.
            </h2>
            <p className="font-serif italic text-stone-500 mt-2 text-md">
              South India's First Greek-Themed Stacked Villa Luxury Homes.
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-6" />
            <p className="text-neutral-600 text-sm leading-relaxed mt-6">
              Created for the select few who decline standard flat living, yet deserve the extreme private sanctuary of a villa without sacrificing structural community convenience or high-tier amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Feature lists */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              
              <div className="p-6 bg-[#F7F1E8] border border-gold/15 rounded-none hover:border-gold transition duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 font-serif text-sm">01</div>
                <h4 className="font-serif text-lg font-medium text-neutral-950 mb-2">Stacked Villa Architecture</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">Vertical luxury separation giving families double height proportions and custom open layouts.</p>
              </div>

              <div className="p-6 bg-[#F7F1E8] border border-gold/15 rounded-none hover:border-gold transition duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 font-serif text-sm">02</div>
                <h4 className="font-serif text-lg font-medium text-neutral-950 mb-2">No Common Walls</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">Absolute engineering isolation from side neighbors. 100% serene sound dampening and perimeter exclusivity.</p>
              </div>

              <div className="p-6 bg-[#F7F1E8] border border-gold/15 rounded-none hover:border-gold transition duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 font-serif text-sm">03</div>
                <h4 className="font-serif text-lg font-medium text-neutral-950 mb-2">Greek-Themed Pillars</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">Stunning white travertine stone elevations, high arches, and classic pergolas defining natural breeze paths.</p>
              </div>

              <div className="p-6 bg-[#F7F1E8] border border-gold/15 rounded-none hover:border-gold transition duration-305">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4 font-serif text-sm">04</div>
                <h4 className="font-serif text-lg font-medium text-neutral-950 mb-2">Approx. 3600 Sft Usable</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">Vast footprint space representing high structural utilization of layouts spanning extensive terracing decks.</p>
              </div>

              <div className="p-6 bg-[#F7F1E8] border border-gold/15 rounded-none hover:border-gold transition duration-305 col-span-1 sm:col-span-2 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-gold shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-medium text-neutral-950">4-Side Open Perimeter Living</h4>
                    <p className="text-neutral-600 text-xs mt-1">
                      Experience uninterrupted 360-degree native views, deep ventilation drafts, and supreme morning solar captures from all rooms.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Massive exterior presentation visual */}
            <div className="lg:col-span-6 relative">
              <InteractiveImage 
                src="assets/stacked-villa-exterior.jpg"
                alt="Render mockup of Greek luxury stacked villas in Yelahanka"
                parentClass="aspect-4/3 rounded-none overflow-hidden shadow-2xl relative bg-stone-950 group"
              />
              <div className="absolute top-4 right-4 bg-[#171717]/90 backdrop-blur-sm border border-gold/25 text-white py-1 px-3 text-[9px] uppercase tracking-widest font-semibold rounded-none">
                EXCLUSIVE ARTISTIC VISUAL
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE STACKED VILLA EXPLAINER (Section 4) */}
      <section id="interactive-explainer" className="py-24 bg-stone-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-stone-950 to-neutral-950" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase block font-bold mb-2">THE ARCHITECTURAL PARADIGM</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-marble tracking-wide">
              Not a flat. Not a traditional villa.
            </h2>
            <p className="text-gold font-serif italic text-sm mt-3">A totally new, superior way to live.</p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
            <p className="text-stone-400 text-xs leading-relaxed max-w-2xl mx-auto mt-6">
              The stacked villa sequence is planned to offer dual vertical level zoning, isolating guest social areas from primary private resting suites, and offering expansive private terrace options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Interactive Level Switcher Buttons Left */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
              <span className="text-[9px] tracking-[0.2em] text-stone-500 uppercase font-mono font-bold block mb-2 text-left">SELECT LEVEL ZONE</span>
              
              {EXPLAINER_LEVELS.map((lvl, index) => (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevelIdx(index)}
                  className={`w-full text-left p-5 rounded-none border transition-all duration-300 relative cursor-pointer ${
                    activeLevelIdx === index 
                      ? "bg-gold text-[#171717] border-gold shadow-lg" 
                      : "bg-neutral-900/60 text-stone-400 border-stone-800 hover:border-gold/30 hover:bg-neutral-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest font-mono opacity-80 block mb-1">
                      {lvl.level}
                    </span>
                    {activeLevelIdx === index && <Sliders className="w-3.5 h-3.5 text-neutral-900" />}
                  </div>
                  <h4 className={`font-serif text-base md:text-lg font-normal ${
                    activeLevelIdx === index ? "text-neutral-950 font-bold" : "text-marble"
                  }`}>
                    {lvl.title}
                  </h4>
                </button>
              ))}

              <div className="pt-6">
                <button
                  onClick={() => openFormModal("BOOK STACKED WALKTHROUGH", "Book a custom interactive guided walkthrough session.", "Interactive Explainer SECTION")}
                  className="w-full bg-transparent border border-gold/30 text-gold text-[10px] tracking-[0.2em] font-bold py-4 rounded-none hover:bg-gold hover:text-charcoal transition-all cursor-pointer"
                >
                  BOOK A PRIVATE WALKTHROUGH
                </button>
              </div>
            </div>

            {/* Interactive Level Content Area Right */}
            <div className="lg:col-span-8 bg-neutral-900/40 border border-gold/15 p-6 md:p-8 rounded-none flex flex-col justify-between">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
                
                {/* Text details */}
                <div className="space-y-4 text-left">
                  <span className="text-[9.5px] font-mono tracking-[0.25em] text-gold uppercase px-2 .py-0.5 bg-gold/10 rounded-none border border-gold/25">
                    {EXPLAINER_LEVELS[activeLevelIdx].level}
                  </span>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-marble tracking-wide">
                    {EXPLAINER_LEVELS[activeLevelIdx].title}
                  </h3>
                  
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {EXPLAINER_LEVELS[activeLevelIdx].description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block font-mono">SPECIFIED SPACES:</span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {EXPLAINER_LEVELS[activeLevelIdx].highlights.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Level Image view */}
                <div className="relative group">
                  <InteractiveImage
                    src={EXPLAINER_LEVELS[activeLevelIdx].imagePath}
                    alt={EXPLAINER_LEVELS[activeLevelIdx].title}
                    parentClass="aspect-[4/3] rounded-none overflow-hidden shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent opacity-60" />
                </div>

              </div>

              {/* Lifestyle Benefits quick badges */}
              <div className="pt-6 border-t border-stone-800 grid grid-cols-3 gap-2 text-[9.5px] uppercase tracking-wider text-stone-400 font-semibold font-mono text-center">
                <div>
                  <span className="block text-gold">✔ MULTI-GENERATIONAL</span>
                </div>
                <div className="border-x border-stone-800">
                  <span className="block text-gold">✔ PRIVATE SKY POOL OPT.</span>
                </div>
                <div>
                  <span className="block text-gold">✔ DOUBLE VERTICAL HEIGHTS</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. RESIDENCE DETAILS SECTION (Section 5) */}
      <section id="residences" className="py-24 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase block font-bold mb-2">UNIT ARCHITECTURE</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-neutral-950 tracking-wide">
              Designed around real life.
            </h2>
            <p className="font-serif italic text-stone-500 mt-2 text-sm text-center">
              A private vertical layout configured with world-class spatial efficiency.
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-8">
            
            {CONFIGURATIONS.map((cfg) => (
              <div 
                key={cfg.id} 
                className="bg-marble border border-gold/15 rounded-none overflow-hidden flex flex-col justify-between relative p-6 sm:p-8 hover:border-gold hover:shadow-xl transition-all duration-300"
              >
                {/* Thin inner border */}
                <div className="absolute inset-2 border border-gold/5 pointer-events-none rounded-none" />
                
                <div className="space-y-6 relative z-10 text-left">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-mono text-gold uppercase font-bold block">
                        STACKED VILLA STATEMENT
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-neutral-950 tracking-wide mt-1">
                        {cfg.title}
                      </h3>
                    </div>
                  </div>

                  {/* Areas and Pricing badges */}
                  <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-ivory rounded-none border border-gold/10">
                    <div>
                      <span className="block text-[8px] tracking-widest text-stone-500 uppercase font-mono font-bold">SUPER AREA</span>
                      <span className="block font-serif text-sm font-semibold text-neutral-900 mt-0.5">{cfg.superArea}</span>
                    </div>
                    <div className="border-x border-stone-200/80 px-4">
                      <span className="block text-[8px] tracking-widest text-stone-500 uppercase font-mono font-bold">USABLE AREA</span>
                      <span className="block font-serif text-sm font-semibold text-neutral-900 mt-0.5">{cfg.usableArea}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] tracking-widest text-stone-500 uppercase font-mono font-bold">STARTING PRICE</span>
                      <span className="block font-serif text-sm text-gold font-bold mt-0.5">{cfg.price}</span>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-xs leading-relaxed text-left">
                    {cfg.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[9.5px] font-mono font-bold tracking-widest text-stone-400 block uppercase">KEY UNIT HIGHLIGHTS:</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {cfg.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-stone-700">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 relative z-10">
                  <button
                    onClick={() => openFormModal("GET FLOOR PLAN DETAILS", `Configured suite maps & area details for ${cfg.title}.`, `Config Card ${cfg.id}`)}
                    className="w-full bg-charcoal hover:bg-gold hover:text-charcoal text-white font-bold text-[10px] tracking-widest py-4 px-6 rounded-none uppercase transition duration-300 cursor-pointer"
                  >
                    GET FLOOR PLAN DETAILS
                  </button>
                </div>
              </div>
            ))}

          </div>

          <div className="text-center py-6 border-t border-stone-200/60 mt-12">
            <span className="inline-block bg-stone-900 text-gold font-mono text-[10px] tracking-[0.25em] font-semibold py-2 px-6 rounded-none border border-gold/15">
              PROJECT POSSESSION HORIZON: DECEMBER 2028
            </span>
          </div>

        </div>
      </section>

      {/* 8. THE WORLD OF LEGENDS DIAL REALMS (Section 6) */}
      <section id="world" className="py-24 bg-stone-950 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950 opacity-90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase block font-bold mb-2">RECREATIVE REALMS</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-marble tracking-wide">
              Welcome to The World of Legends.
            </h2>
            <p className="text-gold font-serif italic text-sm mt-3">
              A pristine private sanctuary where architecture, forest, lake, and ultimate wellness co-exist.
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {DESTINATION_CARDS.map((dst) => (
              <div 
                key={dst.id} 
                className="bg-charcoal border border-gold/10 hover:border-gold/45 rounded-none overflow-hidden flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <InteractiveImage
                    src={dst.imagePath}
                    alt={dst.title}
                    parentClass="aspect-video relative overflow-hidden rounded-none"
                  />
                  
                  <div className="p-6 text-left space-y-2">
                    <span className="text-[9px] tracking-[0.2em] font-mono text-gold uppercase font-bold block">
                      {dst.realm}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-marble group-hover:text-gold transition">
                      {dst.title}
                    </h3>
                    <p className="text-stone-400 text-xs italic font-serif">
                       {dst.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-left">
                  <button 
                    onClick={() => openFormModal(`REQUEST REALM INSIGHT: ${dst.realm}`, `Detailed amenities schedules for ${dst.title}.`, `Realm ${dst.realm}`)}
                    className="text-gold text-[10px] tracking-widest font-bold uppercase inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                  >
                    READ MORE SELECTIONS <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. PREMIUM AMENITIES GRID SECTION (Section 7) */}
      <section id="amenities" className="py-24 bg-marble scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase block font-bold mb-2">EXPERIENTIAL RECREATION</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-neutral-950 tracking-wide">
              Amenities designed as experiences.
            </h2>
            <p className="font-serif italic text-stone-500 mt-2 text-sm text-center">
              South India's most detailed wellness and hospitality matrix matching Aman resorts.
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {AMENITIES.map((am) => (
              <div 
                key={am.id}
                className="p-6 bg-[#F7F1E8] border border-gold/15 hover:border-gold rounded-none transition duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-gold/10 border border-gold/30 rounded-none flex items-center justify-center text-gold">
                    {am.iconName === "Crown" && <Crown className="w-5 h-5" />}
                    {am.iconName === "Waves" && <Waves className="w-5 h-5" />}
                    {am.iconName === "Sparkles" && <Sparkles className="w-5 h-5" />}
                    {am.iconName === "Users" && <Compass className="w-5 h-5" />}
                    {am.iconName === "UtensilsCrossed" && <Compass className="w-5 h-5" />}
                    {am.iconName === "Trees" && <Trees className="w-5 h-5" />}
                    {am.iconName === "Compass" && <Compass className="w-5 h-5" />}
                    {am.iconName === "ShieldAlert" && <ShieldAlert className="w-5 h-5" />}
                  </div>

                  <div>
                    <span className="text-[8.5px] font-mono tracking-widest text-stone-400 uppercase font-bold block">
                      {am.subtitle}
                    </span>
                    <h4 className="font-serif text-base font-medium text-neutral-950 mt-1">
                      {am.title}
                    </h4>
                    <p className="text-stone-600 text-[11px] leading-relaxed mt-2">
                      {am.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 text-left border-t border-stone-250/30 mt-4">
                  <span className="text-[8.5px] font-mono font-bold tracking-widest text-stone-400 block uppercase">
                    ✔ EXCLUSIVE INCLUSION
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => openFormModal("EXPLORE AMENITIES LIST", "Check the full list of 45+ lifestyle amenities with descriptions.", "Amenities CTA")}
              className="bg-charcoal hover:bg-gold hover:text-charcoal text-white font-bold text-[10px] tracking-widest py-4.5 px-10 rounded-none uppercase transition-all duration-300 cursor-pointer"
            >
              EXPLORE AMENITIES PROSPECTUS
            </button>
          </div>

        </div>
      </section>

      {/* 10. LIFESTYLE GALLERY SECTION (Section 8) */}
      <section className="py-24 bg-stone-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] text-gold uppercase block font-bold mb-2">CAMPUS EDITORIAL LIVING</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-marble tracking-wide">
              Live Like A Legend.
            </h2>
            <p className="text-gold font-serif italic text-xs mt-3 uppercase tracking-[0.1em]">
              "Every day, beautifully unhurried."
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {LIFESTYLE_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="bg-charcoal border border-gold/15 rounded-none overflow-hidden relative group"
              >
                <InteractiveImage
                  src={item.imagePath}
                  alt={item.title}
                  parentClass="aspect-4/5 relative overflow-hidden rounded-none"
                />
                
                {/* Visual hover treatment and text gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-90 transition duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-left space-y-1">
                  <span className="text-[9px] tracking-widest text-gold font-mono uppercase font-semibold">
                    REALM LIFESTYLE
                  </span>
                  <h3 className="font-serif text-base font-normal text-marble group-hover:text-gold transition">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-xs italic font-serif">
                    {item.subline}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. NATURE & 2-ACRE MINI FOREST FEATURE (Section 9) */}
      <section id="nature" className="relative py-28 md:py-36 bg-stone-950 text-white overflow-hidden">
        
        {/* Full-width Forest image backdrop */}
        <div className="absolute inset-0 opacity-40">
          <InteractiveImage 
            src="assets/mini-forest.jpg"
            alt="Pristine native forest walking path"
            className="w-full h-full object-cover scale-100 group-hover:scale-105 duration-1000"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left h-full flex flex-col justify-center">
          <div className="max-w-xl space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-mono text-gold uppercase block font-bold">THE SUSTAINABLE MATRIX</span>
            
            <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-white tracking-wide">
              The forest is part <br />Of the address.
            </h2>
            
            <p className="text-gold font-serif italic text-base">A 2-acre mini forest created for your mind, body and soul.</p>
            
            <p className="text-stone-300 text-sm leading-relaxed">
              Not every luxury can be built by hands. Some supreme moments must be grown over seasons. At The Legend, nature is not a mere cosmetic afterthought—it is the literal canvas, featuring over 500 indigenous evergreen oxygen-rich trees forming a quiet wellness trail boundary around your home.
            </p>

            <div className="pt-4">
              <button
                onClick={() => openFormModal("REQUEST FOREST PRESERVE PLANS", "Get the list of native tree species and wellness plans.", "Nature Section CTA")}
                className="bg-gold hover:bg-gold/90 text-charcoal font-bold text-[10px] tracking-widest py-4.5 px-8 rounded-none uppercase transition-all duration-300 cursor-pointer"
              >
                BOOK A SITE VISIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. LAKESIDE WALK FEATURE (Section 10) */}
      <section id="lakeside" className="py-24 md:py-32 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Lakeside Text Narrative Left */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-[10.5px] tracking-[0.3em] font-mono text-gold uppercase block font-bold">
                WATERSIDE REFLECTION
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.2] text-neutral-950 tracking-wide">
                Stillness is <br />
                the new status symbol.
              </h2>
              
              <p className="font-serif italic text-gold text-lg">A 2-acre lakeside civic amenity zone.</p>
              
              <p className="text-neutral-700 text-sm leading-relaxed">
                A majestic, calm freshwater front experience planned carefully for slow evening walks, quiet meditation, reading, family hours, and a perfect everyday mental escape. Unwind as golden-hour shadows rest cleanly over soft lakeside stones.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => openFormModal("REQUEST WATERFRONT MAP", "Get detailed master plans of the lakeside boardwalk trail.", "Lakeside Section CTA")}
                  className="bg-charcoal hover:bg-gold hover:text-charcoal text-white font-bold text-[10px] tracking-widest py-4.5 px-8 rounded-none uppercase transition cursor-pointer"
                >
                  ACQUIRE LAKESIDE GUIDE MAP
                </button>
              </div>
            </div>

            {/* Lakeside Visual Promenade Right */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-2 border border-gold/15 rounded-none pointer-events-none" />
              <InteractiveImage 
                src="assets/lakeside-zone.jpg"
                alt="2-acre lakeside zone civic amenity walk of the legend"
                parentClass="aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-neutral-900"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 13. CLUBHOUSE FEATURE (Section 11) */}
      <section id="clubhouse" className="py-24 md:py-32 bg-stone-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Clubhouse Image Left */}
            <div className="lg:col-span-6 relative order-last lg:order-first">
              <div className="absolute top-4 right-4 -translate-x-4 inset-0 border border-gold/20 rounded-none pointer-events-none" />
              <InteractiveImage 
                src="assets/branded-clubhouse.jpg"
                alt="40000 sq ft Club Agora by IIESEUM Clubs"
                parentClass="aspect-[16/10] rounded-none overflow-hidden shadow-2xl bg-neutral-900"
              />
            </div>

            {/* Clubhouse Text Narrative Right */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-mono text-gold uppercase block font-bold">
                PRIVATE MEMBER ACCESS
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.2] text-marble tracking-wide">
                The Club of Legends.
              </h2>
              
              <p className="text-gold font-serif italic text-base">40,000+ Sq.ft branded clubhouse by IIESEUM Clubs.</p>
              
              <p className="text-stone-300 text-sm leading-relaxed">
                India's classic residential socializing arena, containing dedicated business suites, high-tech fitness gyms, private visual audio screening rooms, fine dining sky lounges under an open Greek pergola, and an infinity water body deck context managed by IIESEUM hospitality operators.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => openFormModal("REQUEST CLUBHOUSE SECTIONS", "Detailed lists of clubhouse services, visual maps, and plans.", "Clubhouse Section CTA")}
                  className="bg-gold hover:bg-gold/90 text-charcoal font-bold text-[10px] tracking-widest py-4.5 px-8 rounded-none uppercase transition-all cursor-pointer"
                >
                  REQUEST CLUBHOUSE DETAILS
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 14. PRIVACY & ARCHITECTURAL SPECS (Section 12) */}
      <section id="privacy" className="py-24 bg-marble border-y border-stone-250/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Specs Left: Text details */}
            <div className="lg:col-span-6 text-left space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-mono text-gold uppercase block font-bold">
                Meticulous Exclusivity
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.2] text-neutral-950 tracking-wide">
                Privacy, by design.
              </h2>
              
              <p className="text-neutral-600 text-sm leading-relaxed">
                Every residential stacked villa stands carefully organized with four wide open exposure paths. Because you deserve zero interference, common-wall sharing is excluded completely from our engineering blueprint.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-gold/10 text-gold rounded-none flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-neutral-950">No Common Walls</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed">Absolute acoustic tranquility.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-gold/10 text-gold rounded-none flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-neutral-950">Four-side Open Residences</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed">Continuous ventilation drafts.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-gold/10 text-gold rounded-none flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-neutral-950">Large Deep Decks</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed">Extended outdoor dining areas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-gold/10 text-gold rounded-none flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-neutral-950">Zero Vehicle Community</h5>
                    <p className="text-stone-500 text-[11px] leading-relaxed">100% serene pedestrian campus.</p>
                  </div>
                </div>
              </div>

              <p className="text-stone-500 text-[10px] italic leading-relaxed pt-2">
                " Every stacked villa stands separated by open skies, landscaped greens, and double-height vertical garden decks. "
              </p>
            </div>

            {/* Specs Right: High end layout mockup visual */}
            <div className="lg:col-span-6 relative">
              <InteractiveImage 
                src="assets/stacked-villa-cutaway.jpg"
                alt="Classical Greek architect pointing to the blueprint scroll design of the legend"
                parentClass="aspect-[16/11] rounded-none overflow-hidden shadow-2xl bg-neutral-900"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 15. LOCATION ANALYSIS SECTION (Section 13) */}
      <section id="location" className="py-24 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Location details */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-mono text-gold uppercase block font-bold">
                YELAHANKA, NORTH BANGALORE
              </span>
              
              <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.2] text-neutral-950 tracking-wide">
                Where legends <br />Are located.
              </h2>
              
              <p className="font-serif italic text-stone-500">
                Positioned in South India's premium growth corridor.
              </p>
              
              <p className="text-neutral-700 text-sm leading-relaxed">
                Located in Yelahanka, North Bangalore, Codename: THE LEGEND offers immediate connection access to the Kempegowda International Airport corridor, premium multi-specialty healthcare, executive elite international schools, and emerging tech park zones.
              </p>

              {/* Distances key nodes list */}
              <div className="space-y-3.5 border-t border-stone-200/80 pt-6">
                
                <div className="flex items-center justify-between text-xs text-stone-700">
                  <span className="font-medium">Kempegowda International Airport Link</span>
                  <span className="font-mono text-[11px] text-stone-500 italic">Airport Transit Zone</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-stone-700 border-t border-stone-200/40 pt-2.5">
                  <span className="font-medium">Upcoming Special Economic Tech Zones (SEZs)</span>
                  <span className="font-mono text-[11px] text-stone-500 italic">North Growth Axis</span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-700 border-t border-stone-200/40 pt-2.5">
                  <span className="font-medium">Elite International Academies &amp; Schools</span>
                  <span className="font-mono text-[11px] text-stone-500 italic">Within Close Proximity</span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-700 border-t border-stone-200/40 pt-2.5">
                  <span className="font-medium">Multi-specialty Health Sanatoriums &amp; Care</span>
                  <span className="font-mono text-[11px] text-stone-500 italic">Prompt Reach</span>
                </div>

              </div>

              {/* RERA Note on distances */}
              <div className="flex gap-2 p-3 bg-stone-900 text-gold rounded-none border border-gold/15 text-[10px] leading-relaxed italic text-left">
                <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>
                  Notes: RERA details to be updated. Distances, metro accessibility projections, and physical timings are subject to final verified routes.
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openFormModal("GET LOCATION DETAILS", "Get the location maps, vicinity guides, and infrastructure updates.", "Location Section CTA")}
                  className="bg-charcoal hover:bg-gold hover:text-charcoal text-white font-bold text-[10px] tracking-widest py-4.5 px-8 rounded-none uppercase transition-all cursor-pointer"
                >
                  GET LOCATION DETAILS
                </button>
              </div>
            </div>

            {/* Map Placeholder graphic (Modern aesthetic map matching strict direction) */}
            <div className="lg:col-span-7 relative">
              <div className="absolute inset-0 bg-neutral-950/5 rounded-none pointer-events-none border border-gold/5" />
              <div className="relative rounded-none overflow-hidden shadow-2xl border border-gold/20 bg-marble p-2">
                
                {/* Elegant representation of a local map layout with nodes instead of generic screenshot */}
                <div className="aspect-[16/10] bg-stone-950 text-white p-6 relative flex flex-col justify-between rounded-none">
                  <div className="absolute inset-0 opacity-15">
                    <InteractiveImage 
                      src="assets/location-map.jpg"
                      alt="The Legend Location Map Overview reference"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  
                  {/* Subtle vector grid overlays representing a technical luxury map */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,106,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,106,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  {/* Map Node items representation */}
                  <div className="relative z-10 flex cursor-default justify-between">
                    <div className="text-left">
                      <span className="text-[10px] tracking-[0.2em] text-gold uppercase block font-bold font-mono">NORTH AXIS BOUNDARY</span>
                      <span className="text-slate-400 text-[10px]">Airport Road High-Speed Axis</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] tracking-[0.2em] text-stone-500 uppercase font-mono">STATUS: HIGH VALUE DEVELOPMENT</span>
                    </div>
                  </div>

                  <div className="relative z-10 my-8 py-4 flex flex-col items-center justify-center text-center">
                    {/* Pulsing center node of Codename: The Legend */}
                    <div className="relative mb-3">
                      <div className="absolute inset-0 w-8 h-8 -translate-x-1.5 -translate-y-1.5 bg-gold/30 rounded-full animate-ping" />
                      <div className="w-5 h-5 bg-gold border-2 border-marble rounded-full shadow-lg relative flex items-center justify-center">
                        <MapPin className="text-stone-950 w-3 h-3" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl text-marble tracking-wide uppercase">
                      {PROJECT_INFO.name}
                    </h3>
                    <p className="text-gold font-mono text-[10px] tracking-widest mt-1">
                      YELAHANKA, BENGALURU
                    </p>
                    <span className="text-stone-400 text-[10px] italic mt-1 font-serif">" 2-Acres mini forest and scenic lakeside frontage bounds the project "</span>
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-2 text-center text-[10px] tracking-wider font-mono border-t border-white/10 pt-4">
                    <div>
                      <span className="block text-gold">TECH PARKS</span>
                      <span className="text-stone-400 text-[8px]">Transit Proximate</span>
                    </div>
                    <div>
                      <span className="block text-gold">AIRPORT CONNECT</span>
                      <span className="text-stone-400 text-[8px]">Broad Highway</span>
                    </div>
                    <div>
                      <span className="block text-gold">METRO LINE</span>
                      <span className="text-stone-400 text-[8px]">In Projections</span>
                    </div>
                  </div>

                </div>

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
            Pre-launch registrations and private preview tokens are now open.
          </p>
          
          <p className="text-stone-400 text-xs max-w-xl mx-auto leading-relaxed">
            Early launch subscribers receive direct priority floor allocations, early investor entry pricing options starting from ₹2.5 Cr onwards, and select private sky terrace customization benefits.
          </p>

          <div className="flex justify-center gap-2 text-[10px] tracking-widest uppercase font-mono text-zinc-400 font-bold">
            <span>LIMITED INVENTORY</span>
            <span>|</span>
            <span>EARLY INVESTOR PRICING</span>
            <span>|</span>
            <span>PRIORITY SELECTION</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("final-form")}
              className="bg-gold hover:bg-gold/90 text-neutral-950 font-sans font-bold text-[10px] tracking-widest uppercase py-4 px-10 rounded-none transition cursor-pointer"
            >
              BOOK YOUR PRIVATE PREVIEW
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
      <section id="final-form" className="py-24 bg-stone-950 text-white relative">
        {/* Dynamic Dark Marble Texture backdrop */}
        <div className="absolute inset-0 opacity-20">
          <InteractiveImage 
            src="assets/lead-form-bg.jpg" 
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
              Book your private preview of Codename: THE LEGEND today.
            </p>
            <div className="h-0.5 w-[50px] bg-gold mx-auto mt-4" />
          </div>

          {/* Form component loaded inside a beautiful premium container with shadows */}
          <div className="bg-neutral-900 border border-gold/15 p-1 rounded-none shadow-2xl">
            <RegistrationForm 
              source="Final Lead Form Section" 
              title="RESERVE PRE-LAUNCH SLOT"
              subline="A private communications desk representative registers your token immediately."
              showBudget={true}
            />
          </div>

          <p className="text-stone-500 text-[11px] text-center mt-6 uppercase tracking-wider font-mono">
            * Our executive consulting team will reach out within 12 HOURS with layouts, layouts blueprints, and schedule visits confirmation.
          </p>

        </div>
      </section>

      {/* 18. ACCESSIBLE FOOTER (Section 16) */}
      <footer className="bg-stone-950 border-t border-gold/15 py-16 text-stone-400 text-xs relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pb-12 border-b border-stone-900">
            
            {/* Brand column left */}
            <div className="md:col-span-5 text-left space-y-4">
              <span className="font-serif text-lg tracking-[0.35em] text-white uppercase block">
                {PROJECT_INFO.name}
              </span>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                South India's First Greek-Themed Stacked Villa Luxury Residences, planned strictly to host private generational legends with infinite layouts, no common walls, and majestic forest trails.
              </p>
              
              <div className="flex gap-4">
                <a 
                  href={`tel:${PROJECT_INFO.phoneNumber.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 text-gold hover:text-white transition font-mono"
                >
                  <Phone className="w-3.5 h-3.5" /> <span>{PROJECT_INFO.phoneNumber}</span>
                </a>
                <span className="text-stone-700">|</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Compass className="w-3.5 h-3.5 text-gold" /> Yelahanka, North Bangalore
                </span>
              </div>
            </div>

            {/* Quick Section Links middle */}
            <div className="md:col-span-3 text-left">
              <h5 className="font-serif text-gold text-xs uppercase tracking-widest font-semibold mb-4">
                CAMPAIGN DIRECTORIES
              </h5>
              <div className="space-y-2 text-[11px]">
                <button onClick={() => scrollToSection("story")} className="block text-stone-400 hover:text-white transition">Story Concept</button>
                <button onClick={() => scrollToSection("interactive-explainer")} className="block text-stone-400 hover:text-white transition">Villa Explainer Levels</button>
                <button onClick={() => scrollToSection("residences")} className="block text-stone-400 hover:text-white transition">Configuration Matrix</button>
                <button onClick={() => scrollToSection("world")} className="block text-stone-400 hover:text-white transition">Amenity Realms</button>
                <button onClick={() => scrollToSection("location")} className="block text-stone-400 hover:text-white transition">vicinity maps Node</button>
              </div>
            </div>

            {/* Client Checking diagnostic tool desk */}
            <div className="md:col-span-4 text-left font-serif text-stone-400">
              <h5 className="font-sans text-gold text-xs uppercase tracking-widest font-semibold mb-4">
                ADMIN CONSOLE TESTING
              </h5>
              <p className="text-[11px] leading-relaxed mb-4 text-stone-400 font-sans text-left">
                Real-time captured sandbox pre-launch registrations are stored securely locally. Review submissions using the active developer console.
              </p>
              
              <button
                onClick={() => setAdminOpen(true)}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-none text-[11.5px] tracking-wide text-marble hover:border-gold/30 hover:bg-white/10 transition cursor-pointer w-full font-sans justify-center"
              >
                <Database className="w-4 h-4 text-gold" />
                <span>OPEN REGISTRY RECORD DESK ({leadCount})</span>
              </button>
            </div>

          </div>

          {/* Compliance warnings */}
          <div className="pt-12 text-[10px] text-stone-500 space-y-3.5 text-left leading-relaxed">
            <p className="font-mono text-[9px] tracking-wider text-stone-400 uppercase">
              • COMPLIANCE &amp; LEGAL DISCLAIMERS PROSPECTUS:
            </p>
            <p>
              RERA details are subject to be updated post official local approvals announcement. All distances, structural maps, upcoming public high-speed light metros, transit times, and road development indices listed here serve reference estimations subject to verified travel route verification.
            </p>
            <p>
              Paint colors, facade stone layouts, private sky pools representation, and landscaping elements displayed are architectural impressions or representational campaign ideas representing pre-launch visions. Physical dimensions, layouts, prices, specs, and stock capacities are subject to change by builder prior allocations confirmation.
            </p>
            <p className="text-center pt-4 border-t border-stone-900/60 font-mono text-[9px]">
              &copy; {new Date().getFullYear()} CODENAME: THE LEGEND INC • DESIGNED EXCLUSIVELY FOR PRIVATE PREVIEW SERVICES
            </p>
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
