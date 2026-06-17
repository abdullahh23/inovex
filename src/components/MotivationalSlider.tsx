import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Clock, Rocket, Target, Sparkles } from 'lucide-react';

const quotes = [
  {
    text: "Work smarter, not harder — automate your invoicing.",
    icon: Zap,
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconColor: "text-violet-600",
  },
  {
    text: "Every minute saved on paperwork is a minute earned on the road.",
    icon: Clock,
    gradient: "from-teal-500 to-emerald-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    iconColor: "text-teal-600",
  },
  {
    text: "Turn rate confirmations into revenue — in seconds, not hours.",
    icon: TrendingUp,
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    text: "Professional invoices build trust. Trust builds business.",
    icon: Target,
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    text: "Scale your dispatch business without scaling your workload.",
    icon: Rocket,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconColor: "text-rose-600",
  },
  {
    text: "Let AI handle the paperwork while you handle the deals.",
    icon: Sparkles,
    gradient: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    iconColor: "text-cyan-600",
  },
];

export function MotivationalSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];
  const Icon = quote.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl no-print">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`${quote.bg} border ${quote.border} rounded-2xl p-5 flex items-center gap-4`}
        >
          <div className={`w-11 h-11 bg-gradient-to-br ${quote.gradient} rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
            <Icon size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-ink leading-snug">{quote.text}</p>
            <p className="text-[10px] text-steel font-medium mt-1">Load to Cash — Dispatch Automation</p>
          </div>
          {/* Dots */}
          <div className="flex gap-1.5 shrink-0">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? `bg-gradient-to-r ${quote.gradient} w-4` : 'bg-steel/20'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
