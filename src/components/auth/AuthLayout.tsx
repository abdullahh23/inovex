import { Link } from 'react-router-dom';
import { Truck, Shield, Zap, BarChart3, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-white font-sans">

      {/* ── Left branding panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[48%] text-white flex-col justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #060e1e 0%, #0a1628 40%, #0d1f3c 70%, #091525 100%)' }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Glow orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(29,85,176,0.22) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)' }} />
        <div className="absolute top-[45%] right-[10%] w-[250px] h-[250px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(29,85,176,0.10) 0%, transparent 65%)' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="LoadToCash"
              style={{ height: '48px', width: 'auto', mixBlendMode: 'screen', objectFit: 'contain' }}
            />
          </div>

          {/* Main content — centered vertically */}
          <div className="flex-1 flex flex-col justify-center space-y-10">

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-[2.6rem] font-black leading-[1.1] tracking-tight">
                Dispatch billing,<br />
                <span style={{ background: 'linear-gradient(135deg, #4d9fff, #7b61ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  simplified.
                </span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs font-medium">
                Upload rate confirmations, track weekly loads, and generate professional dispatch fee invoices in seconds.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="space-y-3">
              {[
                { icon: Zap,       text: 'AI extracts all fields in under 3 seconds' },
                { icon: FileText,  text: '4 premium invoice templates, one click PDF' },
                { icon: BarChart3, text: 'Live dashboard — loads, fees & payments' },
                { icon: CheckCircle, text: 'Auto dispatch fee calculator — zero errors' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(29,85,176,0.2)', border: '1px solid rgba(29,85,176,0.35)' }}>
                    <Icon size={13} style={{ color: '#5b9df9' }} />
                  </div>
                  <span className="text-xs text-white/55 font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Mini dashboard mockup */}
            <div className="rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(29,85,176,0.2)' }}>
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                <div className="w-2 h-2 rounded-full bg-green-400/50" />
                <div className="ml-2 text-[9px] text-white/25">load-to-cash.com/dashboard</div>
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px p-3" style={{ background: 'rgba(0,0,0,0.2)' }}>
                {[
                  { label: 'Weekly Loads', val: '7', color: '#5b9df9' },
                  { label: 'Gross Revenue', val: '$12,400', color: '#10b981' },
                  { label: 'Dispatch Fee', val: '$744', color: '#f59e0b' },
                ].map(s => (
                  <div key={s.label} className="px-2 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="text-[8px] text-white/30 font-medium mb-0.5">{s.label}</div>
                    <div className="text-xs font-bold" style={{ color: s.color }}>{s.val}</div>
                  </div>
                ))}
              </div>
              {/* Table rows */}
              <div className="px-3 pb-3 space-y-1">
                {[
                  { num: 'OGRE45711', broker: 'Ship Amino', amt: '$1,850', paid: true },
                  { num: 'JB98823-A', broker: 'Echo Global', amt: '$2,100', paid: false },
                ].map(r => (
                  <div key={r.num} className="flex items-center justify-between rounded px-2 py-1.5"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <span className="text-[9px] font-semibold text-white/60">{r.num}</span>
                    <span className="text-[9px] text-white/30">{r.broker}</span>
                    <span className="text-[9px] font-bold text-white/70">{r.amt}</span>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        color: r.paid ? '#10b981' : '#ef4444',
                        background: r.paid ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'
                      }}>
                      {r.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <Shield size={14} style={{ color: '#10b981' }} />
              <span className="text-[10px] text-white/45 font-medium">
                Bank-grade encryption · AWS hosted · Your data stays private
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-[10px] text-white/25 font-medium">
            <span>© Load to Cash</span>
            <span>SaaS Dispatch Platform</span>
          </div>
        </div>
      </motion.div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 relative overflow-hidden">
        {/* Subtle bg */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(29,85,176,0.06) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(99,102,241,0.04) 0%, transparent 60%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-white border border-gray-200/80 p-8 rounded-2xl shadow-xl relative z-10"
        >
          {/* Logo on mobile only */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <img
              src="/logo.png"
              alt="LoadToCash"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
          <p className="text-gray-400 text-xs font-medium mt-1 mb-6">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export function AuthInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-300"
      />
    </div>
  );
}

export function AuthButton({ children, loading, ...props }: { loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full text-white py-3 rounded-xl font-bold transition-all disabled:opacity-60 text-sm shadow-md flex items-center justify-center hover:opacity-90 active:scale-95"
      style={{ background: 'linear-gradient(135deg, #1d55b0, #2563eb)', boxShadow: '0 4px 16px rgba(29,85,176,0.35)' }}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-blue-600 hover:text-blue-700 hover:underline text-xs font-semibold transition-colors">
      {children}
    </Link>
  );
}
