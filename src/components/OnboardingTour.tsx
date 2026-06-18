import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChevronRight, X } from 'lucide-react';

interface TourStep {
  target: string;          // data-tour selector
  title: string;
  description: string;
  route?: string;          // navigate here before showing
  position: 'right' | 'bottom' | 'left';
  clickTarget?: boolean;   // should user click the target to proceed
}

const tourSteps: TourStep[] = [
  {
    target: 'nav-settings',
    title: 'Start Here — Company Settings',
    description: 'Click here to set up your company name, address, payment methods, dispatch fee percentage, and upload your logo.',
    position: 'right',
    clickTarget: true,
  },
  {
    target: 'nav-settings',
    title: 'Choose Your Invoice Template',
    description: 'On the Settings page, scroll down to select from 4 professional invoice templates: Classic, Executive, Minimal, or Tech.',
    route: '/settings',
    position: 'right',
  },
  {
    target: 'nav-dashboard',
    title: 'Upload Rate Confirmations',
    description: 'Click here to go to your Dashboard. Upload rate confirmation PDFs and the AI will extract load details automatically. You can also add loads manually.',
    position: 'right',
    clickTarget: true,
  },
  {
    target: 'nav-invoice',
    title: 'Generate and Download Invoices',
    description: 'Click here to create professional invoices from your loads. You can print them, download as PDF, or save to your records.',
    position: 'right',
    clickTarget: true,
  },
  {
    target: 'nav-carrier-history',
    title: 'Track Carrier Performance',
    description: 'Click here to see a complete breakdown per carrier — total loads, invoices, gross revenue, and paid vs. unpaid amounts.',
    position: 'right',
    clickTarget: true,
  },
];

export function OnboardingTour() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
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

  // Position tooltip relative to target element
  const positionTooltip = useCallback(() => {
    if (!active) return;
    const current = tourSteps[step];
    const el = document.querySelector(`[data-tour="${current.target}"]`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setTargetRect(rect);

    const gap = 12;
    let top = 0;
    let left = 0;

    if (current.position === 'right') {
      top = rect.top + rect.height / 2;
      left = rect.right + gap;
    } else if (current.position === 'bottom') {
      top = rect.bottom + gap;
      left = rect.left + rect.width / 2;
    } else if (current.position === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - gap;
    }

    setTooltipPos({ top, left });
  }, [active, step]);

  // Reposition on scroll/resize and step change
  useEffect(() => {
    if (!active) return;

    const current = tourSteps[step];
    if (current.route && location.pathname !== current.route) {
      navigate(current.route);
    }

    // Small delay to let navigation render
    const timer = setTimeout(positionTooltip, 150);

    const handleReposition = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(positionTooltip);
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [active, step, positionTooltip, location.pathname, navigate]);

  const handleClose = () => {
    if (user) localStorage.setItem(`onboarding_done_${user.id}`, 'true');
    setActive(false);
  };

  const handleNext = () => {
    const current = tourSteps[step];

    if (current.clickTarget) {
      // Navigate to the target's route
      const el = document.querySelector(`[data-tour="${current.target}"]`) as HTMLAnchorElement;
      if (el) el.click();
    }

    if (step >= tourSteps.length - 1) {
      handleClose();
      return;
    }

    setStep(s => s + 1);
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!active || !targetRect) return null;

  const current = tourSteps[step];
  const isLast = step === tourSteps.length - 1;
  const padding = 6;

  return (
    <>
      {/* Overlay with cutout */}
      <div className="fixed inset-0 z-[990]" onClick={handleSkip}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={targetRect.left - padding}
                y={targetRect.top - padding}
                width={targetRect.width + padding * 2}
                height={targetRect.height + padding * 2}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0" y="0"
            width="100%" height="100%"
            fill="rgba(0,0,0,0.55)"
            mask="url(#tour-mask)"
          />
        </svg>
      </div>

      {/* Highlight border around target */}
      <div
        className="fixed z-[991] pointer-events-none rounded-xl"
        style={{
          top: targetRect.top - padding,
          left: targetRect.left - padding,
          width: targetRect.width + padding * 2,
          height: targetRect.height + padding * 2,
          boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.7), 0 0 20px rgba(13, 148, 136, 0.3)',
        }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute inset-0 rounded-xl border-2 border-signal"
        />
      </div>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[992]"
          style={{
            top: current.position === 'right' || current.position === 'left'
              ? tooltipPos.top - 60
              : tooltipPos.top,
            left: current.position === 'right'
              ? tooltipPos.left
              : current.position === 'left'
              ? tooltipPos.left - 320
              : tooltipPos.left - 150,
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Arrow pointing left (when tooltip is on right) */}
          {current.position === 'right' && (
            <div
              className="absolute -left-2 top-[58px] w-0 h-0"
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '8px solid white',
              }}
            />
          )}

          <div className="bg-white rounded-xl shadow-2xl border border-steel/10 w-[300px] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xs font-bold">{current.title}</h3>
                <p className="text-white/40 text-[9px] font-semibold mt-0.5">
                  {step + 1} of {tourSteps.length}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white/60 hover:text-white transition-all"
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
              {/* Progress */}
              <div className="flex gap-1">
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === step ? 'w-5 bg-signal' : i < step ? 'w-1.5 bg-signal/40' : 'w-1.5 bg-steel/15'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSkip}
                  className="text-[10px] font-semibold text-steel hover:text-ink transition-all px-2 py-1"
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
