import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChevronRight, X } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  description: string;
  route?: string;
  clickTarget?: boolean;
}

const tourSteps: TourStep[] = [
  {
    target: 'nav-settings',
    title: 'Start Here — Company Settings',
    description: 'Click here to set up your company name, address, phone, payment methods, dispatch fee percentage, and upload your logo.',
    clickTarget: true,
  },
  {
    target: 'nav-settings',
    title: 'Choose Your Invoice Template',
    description: 'On the Settings page, scroll down to select from 4 professional invoice templates. Then save your settings.',
    route: '/settings',
  },
  {
    target: 'nav-dashboard',
    title: 'Upload Rate Confirmations',
    description: 'Click here to go to your Dashboard. Upload rate confirmation PDFs — the AI extracts load details automatically. You can also add loads manually.',
    clickTarget: true,
  },
  {
    target: 'nav-invoice',
    title: 'Generate and Download Invoices',
    description: 'Click here to create professional invoices from your loads. Print them, download as PDF, or save to your records.',
    clickTarget: true,
  },
  {
    target: 'nav-carrier-history',
    title: 'Track Carrier Performance',
    description: 'Click here to see a complete breakdown per carrier — total loads, invoices, gross revenue, and paid vs. unpaid amounts.',
    clickTarget: true,
  },
];

function isMobile() {
  return window.innerWidth < 768;
}

export function OnboardingTour() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>(0);

  // Check if tour should show
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      const privacyKey = `privacy_accepted_${user.id}`;
      const tourKey = `onboarding_done_${user.id}`;
      if (localStorage.getItem(privacyKey) && !localStorage.getItem(tourKey)) {
        setActive(true);
        setStep(0);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

  const findAndPosition = useCallback(() => {
    if (!active) return;
    const current = tourSteps[step];
    const el = document.querySelector(`[data-tour="${current.target}"]`);
    if (!el) {
      setReady(false);
      return;
    }
    const rect = el.getBoundingClientRect();
    setTargetRect(rect);
    setReady(true);
  }, [active, step]);

  // Open mobile sidebar + position on each step
  useEffect(() => {
    if (!active) return;

    const current = tourSteps[step];

    // Navigate if needed
    if (current.route && location.pathname !== current.route) {
      navigate(current.route);
    }

    // On mobile: open the sidebar drawer so nav items are visible
    if (isMobile()) {
      window.dispatchEvent(new Event('tour:open-sidebar'));
    }

    // Wait for sidebar animation to finish, then position
    const timer = setTimeout(findAndPosition, isMobile() ? 400 : 150);

    const handleReposition = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(findAndPosition);
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [active, step, findAndPosition, location.pathname, navigate]);

  const handleClose = () => {
    if (user) localStorage.setItem(`onboarding_done_${user.id}`, 'true');
    setActive(false);
    if (isMobile()) {
      window.dispatchEvent(new Event('tour:close-sidebar'));
    }
  };

  const handleNext = () => {
    const current = tourSteps[step];

    if (current.clickTarget) {
      const el = document.querySelector(`[data-tour="${current.target}"]`) as HTMLAnchorElement;
      if (el) el.click();
    }

    if (step >= tourSteps.length - 1) {
      handleClose();
      return;
    }

    // On mobile, briefly close sidebar for page transition, then reopen
    if (isMobile() && current.clickTarget) {
      window.dispatchEvent(new Event('tour:close-sidebar'));
      setTimeout(() => {
        setStep(s => s + 1);
      }, 350);
    } else {
      setStep(s => s + 1);
    }
  };

  if (!active || !ready || !targetRect) return null;

  const current = tourSteps[step];
  const isLast = step === tourSteps.length - 1;
  const mobile = isMobile();
  const pad = 5;

  // Tooltip position
  const tooltipStyle: React.CSSProperties = mobile
    ? {
        // On mobile: position below the highlighted item
        top: targetRect.bottom + 14,
        left: 16,
        right: 16,
        width: 'auto',
      }
    : {
        // On desktop: position to the right of sidebar
        top: Math.max(12, targetRect.top - 20),
        left: targetRect.right + 14,
        width: 300,
      };

  return (
    <>
      {/* Dark overlay with cutout around target */}
      <div className="fixed inset-0 z-[990]" onClick={handleClose}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - pad}
                y={targetRect.top - pad}
                width={targetRect.width + pad * 2}
                height={targetRect.height + pad * 2}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0" y="0"
            width="100%" height="100%"
            fill="rgba(0,0,0,0.6)"
            mask="url(#tour-mask)"
          />
        </svg>
      </div>

      {/* Pulsing highlight border */}
      <div
        className="fixed z-[991] pointer-events-none rounded-xl"
        style={{
          top: targetRect.top - pad,
          left: targetRect.left - pad,
          width: targetRect.width + pad * 2,
          height: targetRect.height + pad * 2,
          boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.8), 0 0 24px rgba(13, 148, 136, 0.35)',
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute inset-0 rounded-xl border-2 border-signal"
        />
      </div>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: mobile ? 10 : 0, x: mobile ? 0 : 10 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[992]"
          style={tooltipStyle}
          onClick={e => e.stopPropagation()}
        >
          {/* Arrow */}
          {!mobile && (
            <div
              className="absolute -left-[7px] top-[28px]"
              style={{
                width: 0, height: 0,
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderRight: '7px solid #1e293b',
              }}
            />
          )}
          {mobile && (
            <div
              className="absolute -top-[7px] left-[32px]"
              style={{
                width: 0, height: 0,
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                borderBottom: '7px solid #1e293b',
              }}
            />
          )}

          <div className="bg-white rounded-xl shadow-2xl border border-steel/10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-white text-xs font-bold truncate">{current.title}</h3>
                <p className="text-white/40 text-[9px] font-semibold mt-0.5">
                  {step + 1} of {tourSteps.length}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white/60 hover:text-white transition-all shrink-0 ml-2"
              >
                <X size={12} />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 py-3">
              <p className="text-xs text-road leading-relaxed">{current.description}</p>
            </div>

            {/* Footer */}
            <div className="px-4 pb-3 flex items-center justify-between">
              <div className="flex gap-1">
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step ? 'w-5 bg-signal' : i < step ? 'w-1.5 bg-signal/40' : 'w-1.5 bg-steel/15'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="text-[10px] font-semibold text-steel hover:text-ink px-2 py-1"
                >
                  Skip
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-[10px] font-bold text-white bg-signal hover:bg-signal/90 px-3 py-1.5 rounded-lg transition-all"
                >
                  {isLast ? 'Finish' : current.clickTarget ? 'Click Here' : 'Next'}
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
