import { X, ShieldCheck } from "lucide-react";
import RegistrationForm from "./RegistrationForm";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subline?: string;
  source: string;
  showBudget?: boolean;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  title,
  subline,
  source,
  showBudget = false,
}: RegistrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-neutral-900 border border-gold/30 rounded-none max-w-lg w-full overflow-hidden shadow-2xl relative animate-fade-in-up">
        {/* Subtle interior decorative gold thin border */}
        <div className="absolute inset-2 border border-gold/10 pointer-events-none rounded-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-white p-1.5 border border-stone-800 rounded-none bg-stone-950/50 hover:bg-stone-900 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Box */}
        <div className="p-1">
          <RegistrationForm
            source={source}
            title={title}
            subline={subline}
            compact={true}
            showBudget={showBudget}
            onSuccess={() => {
              // Automatically dismiss after a brief interval so user can see completion
              setTimeout(() => {
                onClose();
              }, 3000);
            }}
          />
        </div>

        {/* Dynamic Compliance Seal */}
        <div className="p-3 bg-stone-950 text-center flex items-center justify-center gap-1.5 text-[10px] text-stone-500 border-t border-stone-850">
          <ShieldCheck className="w-3.5 h-3.5 text-gold/60" />
          Secure 256-bit Connection
        </div>
      </div>
    </div>
  );
}
