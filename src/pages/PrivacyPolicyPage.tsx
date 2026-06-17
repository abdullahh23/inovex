import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Server, UserCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function PrivacyPolicyPage() {
  const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-lane font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold mb-6 transition-all">
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <motion.div {...fadeIn} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl flex items-center justify-center">
                <Shield size={24} className="text-teal-400" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight font-outfit">Privacy & Security Policy</h1>
                <p className="text-white/60 text-sm font-medium mt-0.5">Load to Cash Dispatch Platform</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
              Your data security is our top priority. This policy explains how we collect, protect, and handle your information on the Load to Cash platform.
            </p>
            <p className="text-white/40 text-xs mt-3">Last updated: June 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Security Banner */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
            <Lock size={20} className="text-teal-700" />
          </div>
          <div>
            <h3 className="font-bold text-teal-900 text-sm">End-to-End Encrypted & Secure</h3>
            <p className="text-teal-700 text-xs leading-relaxed mt-1">
              All data transmitted between your browser and our servers is encrypted using <strong>TLS 1.3 (256-bit encryption)</strong> — the same security standard used by banks and financial institutions. Your data is also encrypted at rest in our database.
            </p>
          </div>
        </motion.div>

        {/* Sections */}
        <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border border-steel/10 shadow-card overflow-hidden">
          <div className="p-6 border-b border-steel/10">
            <div className="flex items-center gap-2.5">
              <Eye size={18} className="text-signal" />
              <h2 className="text-lg font-extrabold text-ink font-outfit">1. What Data We Collect</h2>
            </div>
          </div>
          <div className="p-6 space-y-3 text-sm text-road leading-relaxed">
            <p>We collect only the minimum data necessary to provide our dispatch invoicing service:</p>
            <ul className="space-y-2">
              {[
                'Account information (name, email address)',
                'Company and carrier details you enter in Settings',
                'Load data from uploaded rate confirmations',
                'Invoice records generated through the platform',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-signal shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-steel text-xs mt-2 bg-lane rounded-xl p-3 border border-steel/10">
              <strong>We do NOT collect:</strong> Social Security numbers, bank account details, credit card numbers, GPS/location data, or any personal financial information beyond what you voluntarily enter for invoicing purposes.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-steel/10 shadow-card overflow-hidden">
          <div className="p-6 border-b border-steel/10">
            <div className="flex items-center gap-2.5">
              <Lock size={18} className="text-signal" />
              <h2 className="text-lg font-extrabold text-ink font-outfit">2. How We Protect Your Data</h2>
            </div>
          </div>
          <div className="p-6 space-y-4 text-sm text-road leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '🔐', title: 'Encryption in Transit', desc: 'All data is encrypted via TLS/SSL (HTTPS) using 256-bit encryption during transmission.' },
                { icon: '🗄️', title: 'Encryption at Rest', desc: 'Your stored data is encrypted using AES-256 on enterprise-grade cloud infrastructure.' },
                { icon: '🔒', title: 'Row-Level Security', desc: 'Database-enforced rules ensure each user can only access their own data. No user can view another user\'s loads or invoices.' },
                { icon: '🛡️', title: 'Secure Authentication', desc: 'Passwords are hashed using bcrypt with salt. We never store plain-text passwords.' },
                { icon: '☁️', title: 'Enterprise Infrastructure', desc: 'Hosted on AWS/Google Cloud — the same infrastructure trusted by Fortune 500 companies.' },
                { icon: '🔑', title: 'Session Security', desc: 'JWT-based authentication with automatic session expiration. Tokens are securely managed.' },
              ].map((item, i) => (
                <div key={i} className="bg-lane border border-steel/10 rounded-xl p-4">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-ink text-xs">{item.title}</h4>
                  <p className="text-steel text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border border-steel/10 shadow-card overflow-hidden">
          <div className="p-6 border-b border-steel/10">
            <div className="flex items-center gap-2.5">
              <UserCheck size={18} className="text-signal" />
              <h2 className="text-lg font-extrabold text-ink font-outfit">3. Data Access & Privacy</h2>
            </div>
          </div>
          <div className="p-6 space-y-3 text-sm text-road leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-lane border-b border-steel/10">
                    <th className="text-left px-4 py-3 font-bold text-steel uppercase tracking-wider">Who</th>
                    <th className="text-center px-4 py-3 font-bold text-steel uppercase tracking-wider">Can See Your Data?</th>
                    <th className="text-left px-4 py-3 font-bold text-steel uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel/5">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink">Other Users</td>
                    <td className="px-4 py-3 text-center"><span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-bold text-[10px]">NO</span></td>
                    <td className="px-4 py-3 text-steel">Row-Level Security prevents any user from accessing another user's data</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink">Platform Admin</td>
                    <td className="px-4 py-3 text-center"><span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-bold text-[10px]">NO</span></td>
                    <td className="px-4 py-3 text-steel">Admin panel only shows email, name, and account status — not your loads or invoices</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink">Third Parties</td>
                    <td className="px-4 py-3 text-center"><span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-bold text-[10px]">NO</span></td>
                    <td className="px-4 py-3 text-steel">We never sell, share, or provide your data to any third party</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink">You (Account Owner)</td>
                    <td className="px-4 py-3 text-center"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[10px]">YES</span></td>
                    <td className="px-4 py-3 text-steel">Full access to all your loads, invoices, settings, and carrier data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-steel/10 shadow-card overflow-hidden">
          <div className="p-6 border-b border-steel/10">
            <div className="flex items-center gap-2.5">
              <Server size={18} className="text-signal" />
              <h2 className="text-lg font-extrabold text-ink font-outfit">4. Data Retention & Your Rights</h2>
            </div>
          </div>
          <div className="p-6 space-y-3 text-sm text-road leading-relaxed">
            <ul className="space-y-2.5">
              {[
                'Your data is retained only as long as your account is active.',
                'You can delete your loads and invoices at any time from within the platform.',
                'You may request complete account deletion by contacting the administrator.',
                'Upon account deletion, all associated data (loads, invoices, settings) is permanently removed from our servers.',
                'We do not create backups of individual user data for marketing or analytics purposes.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-signal shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.35 }} className="bg-white rounded-2xl border border-steel/10 shadow-card overflow-hidden">
          <div className="p-6 border-b border-steel/10">
            <div className="flex items-center gap-2.5">
              <Shield size={18} className="text-signal" />
              <h2 className="text-lg font-extrabold text-ink font-outfit">5. No Data Sharing Policy</h2>
            </div>
          </div>
          <div className="p-6 space-y-3 text-sm text-road leading-relaxed">
            <p>We commit to the following:</p>
            <ul className="space-y-2">
              {[
                'We will NEVER sell your personal or business data.',
                'We will NEVER share your data with advertisers or marketing companies.',
                'We will NEVER use your load or invoice data for any purpose other than providing the service.',
                'We will NEVER allow other users to access your account data.',
                'We use NO third-party tracking or analytics that collect your business data.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Lock size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="text-center py-8 space-y-3">
          <p className="text-steel text-xs">
            Questions about our privacy practices? Contact us at <strong>support@milliondollartransport.online</strong>
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-signal text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-signal/90 transition-all shadow-sm"
          >
            <ArrowLeft size={14} /> Back to Login
          </Link>
          <p className="text-steel/50 text-[10px] mt-4">© {new Date().getFullYear()} Load to Cash. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
