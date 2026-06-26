import { useState, FormEvent } from "react";
import { Check, Loader2, Sparkles, X } from "lucide-react";
import { resolveLeadEndpoint } from "../lib/leadEndpoint.js";

interface LeadData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  visitDate: string;
  contactConsent: boolean;
  budgetRange?: string;
  message?: string;
  timestamp: string;
  source: string;
}

interface RegistrationFormProps {
  source: string;
  title?: string;
  subline?: string;
  compact?: boolean;
  onSuccess?: () => void;
  showBudget?: boolean;
}

export default function RegistrationForm({
  source,
  title = "Request A Private Preview Invite",
  subline = "Previews are available by private invitation only.",
  compact = false,
  onSuccess,
  showBudget = false,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    visitDate: "",
    contactConsent: true,
    budgetRange: "₹2.5 Cr - ₹3 Cr",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const name = formData.fullName.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();

    if (!name || !phone || !email) {
      setError("Please complete all required fields (*).");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.contactConsent) {
      setError("Please provide contact consent to proceed.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(resolveLeadEndpoint(import.meta.env.BASE_URL), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit enquiry right now. Please try again.");
      }

      const newLead: LeadData = {
        id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        fullName: name,
        phone,
        email,
        visitDate: formData.visitDate || "Not Specified",
        contactConsent: formData.contactConsent,
        budgetRange: showBudget ? formData.budgetRange : "₹2.5 Cr Onwards",
        message: formData.message || "Requesting pre-launch details & floor plans.",
        timestamp: new Date().toLocaleDateString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        source: source,
      };

      const existingLeadsRaw = localStorage.getItem("codename_the_legend_leads");
      const existingLeads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      existingLeads.unshift(newLead);
      localStorage.setItem("codename_the_legend_leads", JSON.stringify(existingLeads));
      window.dispatchEvent(new Event("storage_leads_updated"));

      setIsSubmitted(true);
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your registration request could not be processed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const budgetOptions = [
    "₹2.5 Cr - ₹3.0 Cr",
    "₹3.0 Cr - ₹4.0 Cr",
    "₹4.0 Cr+",
  ];

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-neutral-900 border border-gold/30 rounded-lg text-white">
        <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold flex items-center justify-center mb-6 animate-bounce">
          <Check className="text-gold w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl tracking-wide text-marble mb-2">
          RESERVATION REQUEST RECEIVED
        </h3>
        <p className="font-serif italic text-gold text-sm max-w-sm mb-4">
          "The World of Legends awaits you."
        </p>
        <p className="text-stone-400 text-xs max-w-md leading-relaxed">
          An executive legend representative from Yelahanka has reserved a high-priority preview token. A secure communication channel invitation is transmitting shortly to <span className="font-medium text-marble">{formData.email}</span>.
        </p>
        {formData.visitDate && (
          <div className="mt-4 py-2 px-4 bg-white/5 border border-white/10 rounded text-xs text-stone-300">
            Selected Date: <span className="text-gold font-medium">{formData.visitDate}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-[#171717]/95 text-marble border border-gold/20 p-6 sm:p-8 ${compact ? "rounded-none" : "rounded-none"} shadow-2xl relative`}>
      {/* Editorial aesthetic gold outline border */}
      <div className="absolute inset-2 border border-gold/10 pointer-events-none" />

      <div className="relative z-10">
        {!compact && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] text-gold uppercase font-bold mb-2">
              <Sparkles className="w-3 h-3 text-gold" /> EARLY ACCESS
            </div>
            <h3 className="font-serif text-2xl text-marble tracking-wide font-normal">
              {title}
            </h3>
            <p className="text-taupe text-xs italic mt-1 font-serif">
              {subline}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 text-xs font-semibold text-amber-500 bg-amber-955/15 border border-amber-500/20 py-2.5 px-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1 text-left">
            <label className="text-[9px] uppercase tracking-widest text-taupe font-bold block">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full border-b border-stone-800 py-2 focus:border-gold outline-none transition-colors text-sm px-1 bg-transparent text-marble placeholder-stone-600 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest text-taupe font-bold block">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-b border-stone-800 py-2 focus:border-gold outline-none transition-colors text-sm px-1 bg-transparent text-marble placeholder-stone-600 font-sans"
              />
            </div>
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest text-[#B7A58B] font-bold block">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g., name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-stone-800 py-2 focus:border-gold outline-none transition-colors text-sm px-1 bg-transparent text-marble placeholder-stone-600 font-sans"
              />
            </div>
          </div>



          <div className="pt-2 space-y-4">
            <label className="flex items-start gap-3 text-left cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={formData.contactConsent}
                onChange={(e) => setFormData({ ...formData, contactConsent: e.target.checked })}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border border-gold/50 bg-charcoal text-gold accent-gold"
              />
              <span className="text-[11px] sm:text-xs leading-relaxed text-stone-300 group-hover:text-marble transition-colors">
                I agree to be contacted through SMS, RCS, Email, WhatsApp and other mediums for knowing further details.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full bg-[#171717] border border-gold hover:bg-gold hover:text-[#171717] text-white py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  AUTHENTICATING REQUEST...
                </>
              ) : (
                "Book A Slot"
              )}
            </button>

            <p className="text-[10px] text-center text-taupe italic leading-relaxed">
              Private previews are available by appointment only. Strictly limited pre-launch inventory.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
