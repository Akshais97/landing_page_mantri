import { useState, useEffect } from "react";
import { Download, Trash2, X, Users, Compass, FileSpreadsheet, KeyRound } from "lucide-react";

interface LeadData {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  visitDate: string;
  budgetRange?: string;
  message?: string;
  timestamp: string;
  source: string;
}

interface AdminConsoleProps {
  onClose: () => void;
}

export default function AdminConsole({ onClose }: AdminConsoleProps) {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [authorized, setAuthorized] = useState(true); // Auto authorized for easy client checking

  useEffect(() => {
    loadLeads();
    
    const handleUpdate = () => {
      loadLeads();
    };
    window.addEventListener("storage_leads_updated", handleUpdate);
    return () => {
      window.removeEventListener("storage_leads_updated", handleUpdate);
    };
  }, []);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem("codename_the_legend_leads");
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Hydrate with 2 realistic pre-launch test leads for demonstration
        const testLeads: LeadData[] = [
          {
            id: "lead-test-1",
            fullName: "Rajesh S. Kumar",
            phone: "+91 94480 12053",
            email: "rajesh.kumar@infotech-cap.com",
            visitDate: "2026-06-21",
            budgetRange: "₹3.0 Cr - ₹4.0 Cr",
            message: "Looking for a 4.5 BHK standard stacked villa. Please send project brochure and private preview invite details.",
            timestamp: "Today, 10:45 AM",
            source: "Desktop Hero Premium Box"
          },
          {
            id: "lead-test-2",
            fullName: "Ananya Deshmukh",
            phone: "+91 98801 44521",
            email: "ananya.deshmukh@law-alliance.in",
            visitDate: "2026-06-25",
            budgetRange: "₹4.0 Cr+",
            message: "Interested in the 4.5 BHK with Private Terrace. Want to reserve early pricing options.",
            timestamp: "Yesterday, 06:15 PM",
            source: "Lakeside Section CTA"
          }
        ];
        localStorage.setItem("codename_the_legend_leads", JSON.stringify(testLeads));
        setLeads(testLeads);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to dismiss this pre-launch request?")) {
      const filtered = leads.filter(l => l.id !== id);
      setLeads(filtered);
      localStorage.setItem("codename_the_legend_leads", JSON.stringify(filtered));
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to purge all pre-launch records from this session?")) {
      setLeads([]);
      localStorage.setItem("codename_the_legend_leads", JSON.stringify([]));
    }
  };

  const exportCSV = () => {
    try {
      const headers = ["ID", "Full Name", "Phone", "Email", "Visit Date", "Budget Range", "Message", "Timestamp", "Capture Source"];
      const rows = leads.map(l => [
        l.id,
        l.fullName,
        l.phone,
        l.email,
        l.visitDate,
        l.budgetRange || "Not Specified",
        l.message ? l.message.replace(/,/g, " ") : "",
        l.timestamp,
        l.source
      ]);
      
      const csvContent = 
        "data:text/csv;charset=utf-8," + 
        [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "The_Legend_Prelaunch_Leads.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert("CSV download is only supported on direct tab browsers.");
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-950/90 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-md">
      <div className="bg-neutral-900 border border-gold/30 rounded-none max-w-4xl w-full text-marble overflow-hidden shadow-2xl relative">
        <div className="absolute inset-1 border border-gold/10 pointer-events-none rounded-none" />
        
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between relative bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 border border-gold/35 rounded-none flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-serif text-lg tracking-wider text-marble uppercase">
                CODENAME: THE LEGEND - REGISTRATION DESK
              </h3>
              <p className="text-stone-400 text-xs font-mono">
                Stored Locally in Sandbox (Localstorage Database Engine)
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 border border-stone-800 rounded-none hover:border-stone-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Body */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="text-sm">
              Current Registered Accounts: <span className="text-gold font-bold font-mono text-base">{leads.length}</span> luxury entries
            </div>
            
            <div className="flex flex-wrap gap-2">
              {leads.length > 0 && (
                <>
                  <button
                    onClick={exportCSV}
                    className="flex items-center gap-1.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-xs font-semibold py-2 px-4 rounded-none transition duration-300 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export leads Sheet (.csv)
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1.5 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs font-semibold py-2 px-4 rounded-none transition duration-300 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Purge Database
                  </button>
                </>
              )}
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-16 bg-stone-950 rounded-none border border-stone-800/60 font-serif italic text-stone-500">
              No entries logged in this environment session yet. Submit a reservation form to populate the database.
            </div>
          ) : (
            <div className="overflow-x-auto border border-stone-800/80 rounded-none bg-stone-950 max-h-[400px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-900 border-b border-stone-800 text-[10px] tracking-wider text-stone-400 uppercase font-bold">
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Preference & Budget</th>
                    <th className="py-3 px-4">Visit Date</th>
                    <th className="py-3 px-4">Request / Message</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-850 text-xs">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-neutral-900/60 transition duration-150">
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-bold text-marble">{l.fullName}</div>
                        <div className="text-stone-300 font-medium text-[11px] mt-0.5">{l.phone}</div>
                        <div className="text-stone-400 text-[10px] lowercase">{l.email}</div>
                        <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-gold/15 text-gold border border-gold/25 rounded-none font-mono">
                          {l.source}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-sans text-left">
                        <div className="font-mono text-gold font-medium">{l.budgetRange}</div>
                        <span className="text-[10px] text-stone-400">December 2028 Horizon</span>
                      </td>
                      <td className="py-3.5 px-4 font-serif italic text-marble">
                        {l.visitDate}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-stone-400 italic">
                        {l.message || "-"}
                      </td>
                      <td className="py-3.5 px-4 text-right col-span-1">
                        <button
                          onClick={() => handleDelete(l.id)}
                          className="p-1.5 bg-stone-900 text-stone-400 hover:text-rose-400 hover:bg-stone-800 rounded-none transition duration-300"
                          title="Dismiss item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 text-[11px] text-stone-500 text-center uppercase tracking-widest relative">
          CODENAME: THE LEGEND REGISTERED CAMPAIGNS DESK • PREVIEWS BY APPOINTMENT ONLY
        </div>
      </div>
    </div>
  );
}
