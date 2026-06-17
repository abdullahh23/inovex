import { useState, useEffect } from 'react';
import { Shield, Lock, X, Server, Key, Globe, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export function PrivacyModal() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;
    const key = `privacy_accepted_${user.id}`;
    if (!localStorage.getItem(key)) {
      setShow(true);
    }
  }, [user]);

  const handleAccept = () => {
    if (user) {
      localStorage.setItem(`privacy_accepted_${user.id}`, 'true');
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[999]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto border border-steel/10">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Shield size={22} className="text-teal-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold tracking-tight font-outfit">Security & Privacy</h2>
                    <p className="text-white/50 text-xs font-medium">Your data is protected</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <p className="text-sm text-road leading-relaxed">
                  Welcome to <strong>Load to Cash</strong>. Your security is our priority. All data on this platform is fully encrypted and protected by enterprise-grade infrastructure.
                </p>

                <div className="space-y-3">
                  {[
                    { icon: <Lock size={16} className="text-teal-600" />, text: 'All data is encrypted using 256-bit SSL/TLS encryption in transit and AES-256 at rest.' },
                    { icon: <Server size={16} className="text-blue-600" />, text: 'Hosted on Amazon Web Services (AWS) — trusted by leading enterprises worldwide.' },
                    { icon: <Key size={16} className="text-amber-600" />, text: 'Your loads, invoices, and business data are accessible only by you — no exceptions.' },
                    { icon: <Globe size={16} className="text-emerald-600" />, text: 'We never sell, share, or provide your data to any third party.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-lane rounded-xl p-3 border border-steel/8">
                      <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0 border border-steel/10">
                        {item.icon}
                      </div>
                      <p className="text-xs text-road leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-steel leading-relaxed">
                  By continuing to use this platform, you acknowledge that your data is processed in accordance with our security standards. You may review our full{' '}
                  <a href="/privacy" target="_blank" className="text-signal font-semibold hover:underline">Security & Privacy Policy</a>{' '}
                  at any time.
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 space-y-3">
                <button
                  onClick={handleAccept}
                  className="w-full bg-signal text-white py-3 rounded-xl font-bold text-sm hover:bg-signal/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle size={16} />
                  I Understand — Continue
                </button>
                <p className="text-center text-[9px] text-steel/60">
                  Protected by AWS  ·  Secured by SSL/TLS  ·  Encrypted by AES-256
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
