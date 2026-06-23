import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Clock, Rocket, Target, Sparkles } from 'lucide-react';

const quotes = [
  {
    text: "Work smarter, not harder — automate your invoicing.",
    icon: Zap,
    lightGradient: "from-violet-500 to-purple-600",
    darkGradient:  "from-violet-700 to-purple-800",
  },
  {
    text: "Every minute saved on paperwork is a minute earned on the road.",
    icon: Clock,
    lightGradient: "from-teal-500 to-emerald-600",
    darkGradient:  "from-teal-700 to-emerald-800",
  },
  {
    text: "Turn rate confirmations into revenue — in seconds, not hours.",
    icon: TrendingUp,
    lightGradient: "from-blue-500 to-indigo-600",
    darkGradient:  "from-blue-700 to-indigo-800",
  },
  {
    text: "Professional invoices build trust. Trust builds business.",
    icon: Target,
    lightGradient: "from-amber-500 to-orange-600",
    darkGradient:  "from-amber-700 to-orange-800",
  },
  {
    text: "Scale your dispatch business without scaling your workload.",
    icon: Rocket,
    lightGradient: "from-rose-500 to-pink-600",
    darkGradient:  "from-rose-700 to-pink-800",
  },
  {
    text: "Let AI handle the paperwork while you handle the deals.",
    icon: Sparkles,
    lightGradient: "from-cyan-500 to-teal-600",
    darkGradient:  "from-cyan-700 to-teal-800",
  },
];

export function MotivationalSlider() {
  const [index, setIndex] = useState(0);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedRef   = useRef(false);

  // Track dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) setIndex(prev => (prev + 1) % quotes.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startInterval]);

  const handleDotClick = (i: number) => { setIndex(i); startInterval(); };
  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; startInterval(); };

  const quote = quotes[index];
  const Icon  = quote.icon;
  const gradient = isDark ? quote.darkGradient : quote.lightGradient;

  return (
    <div
      className="relative overflow-hidden rounded-lg no-print"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`bg-gradient-to-r ${gradient} rounded-lg py-4 px-5 flex items-center gap-4`}
        >
          {/* Icon bubble */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
               style={{ background: 'rgba(255,255,255,0.18)' }}>
            <Icon size={19} className="text-white" />
          </div>

          {/* Quote text */}
          <p className="flex-1 min-w-0 text-sm font-semibold text-white leading-snug">
            {quote.text}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 shrink-0">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? 'bg-white w-4 h-1.5'
                    : 'w-1.5 h-1.5'
                }`}
                style={{ background: i === index ? '#ffffff' : 'rgba(255,255,255,0.35)' }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
