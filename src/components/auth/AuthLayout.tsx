import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-lane font-sans">
      {/* Left branding panel */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-[48%] bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Subtle grid patterns */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl flex items-center justify-center shadow-sm">
            <Truck size={20} className="text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight font-outfit uppercase">Load to Cash</span>
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight font-outfit">
            Dispatch billing, simplified.
          </h1>
          <p className="text-white/70 text-base font-medium leading-relaxed">
            Upload rate confirmations, track weekly loads, and generate professional dispatch fee invoices in seconds.
          </p>
        </div>

        <div className="relative z-10 flex justify-between items-center text-xs text-white/45 font-medium">
          <span>© Load to Cash Dispatch statements</span>
          <span>SaaS Platform</span>
        </div>
      </motion.div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-lane relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-signal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amberline/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full max-w-md bg-white border border-steel/10 p-8 rounded-3xl shadow-panel relative z-10"
        >
          {/* Logo on mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-signal rounded-lg flex items-center justify-center">
              <Truck size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-sm text-ink font-outfit uppercase tracking-wider">Load to Cash</span>
          </div>

          <h2 className="text-2xl font-extrabold text-ink tracking-tight font-outfit">{title}</h2>
          <p className="text-steel text-xs font-semibold mt-1 mb-6">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function AuthInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full border border-steel/20 rounded-xl px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-4 focus:ring-signal/10 focus:border-signal/70 transition-all placeholder:text-steel/45"
      />
    </div>
  );
}

export function AuthButton({ children, loading, ...props }: { loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full bg-signal text-white py-3 rounded-xl font-bold hover:bg-signal/90 transition-all disabled:opacity-60 text-xs shadow-sm flex items-center justify-center"
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="text-signal hover:text-teal-700 hover:underline text-xs font-bold transition-all">{children}</Link>;
}
