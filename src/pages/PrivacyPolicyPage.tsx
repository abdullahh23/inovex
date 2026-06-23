import { Link } from 'react-router-dom';
import { Shield, Lock, ArrowLeft, CheckCircle, Cloud, Database, Key, Globe, Fingerprint, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export function PrivacyPolicyPage() {
  const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-lane font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold mb-8 transition-all">
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <motion.div {...fadeIn} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-outfit">Security & Privacy</h1>
                <p className="text-white/50 text-sm font-medium mt-0.5">Load to Cash — Enterprise-Grade Protection</p>
              </div>
            </div>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Your data is fully encrypted, secured by industry-leading infrastructure, and accessible only by you. We take security seriously — here is how we protect every piece of information on our platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: <Lock size={16} className="text-teal-600 dark:text-teal-400" />, label: 'SSL/TLS Encrypted', sub: '256-bit' },
              { icon: <Cloud size={16} className="text-blue-600 dark:text-blue-400" />, label: 'AWS Protected', sub: 'Cloud Security' },
              { icon: <Shield size={16} className="text-purple-600 dark:text-purple-400" />, label: 'SOC 2 Compliant', sub: 'Infrastructure' },
              { icon: <Database size={16} className="text-rose-600 dark:text-rose-400" />, label: 'AES-256', sub: 'Data Encryption' },
              { icon: <Globe size={16} className="text-emerald-600 dark:text-emerald-400" />, label: 'GDPR Ready', sub: 'Privacy Standard' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-lane dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  {badge.icon}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-ink leading-tight">{badge.label}</div>
                  <div className="text-[10px] text-steel font-medium">{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Hero */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-navy to-navy-hover text-white rounded-lg p-8 md:p-10 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <Lock size={24} className="text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-outfit mb-2">Your Data is 100% Private and Secure</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                All data on Load to Cash is <strong className="text-teal-300">end-to-end encrypted</strong> and stored on <strong className="text-teal-300">Amazon Web Services (AWS)</strong> — the world's most trusted cloud platform, used by NASA, Netflix, and the U.S. Department of Defense. Your loads, invoices, and business information are fully protected and <strong className="text-teal-300">only accessible by you</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security Grid */}
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <h2 className="text-lg font-extrabold text-ink font-outfit mb-5">How We Protect Your Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <Lock size={22} className="text-teal-500 dark:text-teal-400" />,
                title: '256-bit SSL/TLS Encryption',
                desc: 'Every connection to our platform is protected by military-grade 256-bit encryption. Your data cannot be intercepted or read by anyone during transmission.',
                badge: 'Bank-Level Security',
              },
              {
                icon: <Cloud size={22} className="text-blue-500 dark:text-blue-400" />,
                title: 'AWS Cloud Infrastructure',
                desc: 'Hosted on Amazon Web Services with automatic failover, redundant backups, and 99.99% uptime. The same infrastructure trusted by the world\'s largest enterprises.',
                badge: 'Enterprise Grade',
              },
              {
                icon: <Database size={22} className="text-purple-500 dark:text-purple-400" />,
                title: 'AES-256 Encryption at Rest',
                desc: 'All stored data is encrypted using Advanced Encryption Standard (AES-256). Even in the unlikely event of unauthorized access, your data remains unreadable.',
                badge: 'Military Grade',
              },
              {
                icon: <Key size={22} className="text-amber-500 dark:text-amber-400" />,
                title: 'Secure Authentication',
                desc: 'Your password is hashed using bcrypt with unique salt — we never store or have access to your actual password. Session tokens expire automatically for added security.',
                badge: 'Zero-Knowledge',
              },
              {
                icon: <Fingerprint size={22} className="text-rose-500 dark:text-rose-400" />,
                title: 'User-Only Access Control',
                desc: 'Strict row-level security ensures your loads, invoices, and business data are visible only to you. No other user or party can access your information.',
                badge: 'Private by Design',
              },
              {
                icon: <Globe size={22} className="text-emerald-500 dark:text-emerald-400" />,
                title: 'No Third-Party Sharing',
                desc: 'We never sell, share, or provide your data to advertisers, analytics companies, or any third party. Your business data stays exclusively with you.',
                badge: 'Zero Sharing',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-card hover:shadow-panel transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-lane dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-extrabold text-signal bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-ink text-sm mb-1.5">{item.title}</h3>
                <p className="text-steel text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-card overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-extrabold text-ink font-outfit">Your Data, Your Control</h2>
          </div>
          <div className="p-6 space-y-3 text-sm text-road leading-relaxed">
            <ul className="space-y-3">
              {[
                'Only YOU can view your loads, invoices, and business information — no exceptions.',
                'You can delete your data at any time directly from the platform.',
                'All uploaded files are processed securely and encrypted immediately upon receipt.',
                'Your account is protected by industry-standard authentication protocols.',
                'Request complete account and data deletion at any time by contacting support.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Verified By */}
        <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
          <h2 className="text-lg font-extrabold text-ink font-outfit mb-5">Protected and Verified By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Amazon Web Services', sub: 'Cloud Hosting & Security', icon: <Cloud size={24} className="text-orange-500 dark:text-orange-400" />, color: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30', border: 'border-orange-200 dark:border-orange-900/40' },
              { name: 'SSL Certificate', sub: 'TLS 1.3 / 256-bit', icon: <Lock size={24} className="text-green-600 dark:text-green-400" />, color: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30', border: 'border-green-200 dark:border-green-900/40' },
              { name: 'Supabase', sub: 'Encrypted Database', icon: <Server size={24} className="text-teal-600 dark:text-teal-400" />, color: 'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30', border: 'border-teal-200 dark:border-teal-900/40' },
              { name: 'bcrypt', sub: 'Password Hashing', icon: <Key size={24} className="text-purple-600 dark:text-purple-400" />, color: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30', border: 'border-purple-200 dark:border-purple-900/40' },
            ].map((cert, i) => (
              <div key={i} className={`bg-gradient-to-br ${cert.color} border ${cert.border} rounded-lg p-5 text-center`}>
                <div className="flex justify-center mb-2">{cert.icon}</div>
                <div className="text-xs font-bold text-ink">{cert.name}</div>
                <div className="text-[10px] text-steel font-medium mt-0.5">{cert.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="text-center py-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-5 py-2.5 rounded-full text-xs font-bold">
            <Shield size={14} />
            Your data is protected by enterprise-grade security
          </div>
          <div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-signal text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-signal/90 transition-all shadow-md"
            >
              <Lock size={16} /> Secure Login
            </Link>
          </div>
          <p className="text-steel/40 text-[10px] mt-4">
            © {new Date().getFullYear()} Load to Cash. All rights reserved.
          </p>
          <p className="text-steel/30 text-[9px]">
            Protected by AWS  ·  Secured by SSL/TLS  ·  Encrypted by AES-256  ·  Powered by Supabase
          </p>
        </motion.div>
      </div>
    </div>
  );
}
