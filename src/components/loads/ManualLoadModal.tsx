import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Load } from '../../types';

interface ManualLoadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (load: Omit<Load, 'id'>) => void;
}

const empty = {
  loadNumber: '',
  brokerName: '',
  pickupDate: '',
  grossAmount: 0,
  originCity: '',
  originState: '',
  destinationCity: '',
  destinationState: '',
};

export function ManualLoadModal({ open, onClose, onSubmit }: ManualLoadModalProps) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof empty) => (v: string) => {
    setForm(prev => ({ ...prev, [k]: k === 'grossAmount' ? Number(v) || 0 : v }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.loadNumber.trim()) {
      setError('Load number is required.');
      return;
    }
    onSubmit(form);
    setForm(empty);
    setError(null);
    onClose();
  };

  const field = (label: string, key: keyof typeof empty, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">{label}</label>
      <input
        type={type}
        value={key === 'grossAmount' ? (form.grossAmount || '') : form[key]}
        onChange={e => set(key)(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-steel/20 rounded-xl px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-4 focus:ring-signal/10 focus:border-signal/70 transition-all placeholder:text-steel/45"
      />
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900 z-40"
            onClick={onClose}
          />
          
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-panel w-full max-w-lg p-6 relative z-50 border border-steel/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-steel hover:text-ink w-8 h-8 rounded-full flex items-center justify-center hover:bg-lane transition-all"
            >
              <X size={16} />
            </button>

            <h2 className="text-lg font-bold text-ink">Manual Load Entry</h2>
            <p className="text-steel text-xs mt-1 mb-6">Enter billing details to record the completed weekly load.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {field('Load #', 'loadNumber', 'text', 'e.g. 500392')}
                {field('Broker Name', 'brokerName', 'text', 'e.g. C.H. Robinson')}
                {field('Pickup Date', 'pickupDate', 'date')}
                {field('Gross Amount', 'grossAmount', 'number', 'e.g. 2400')}
                {field('Origin City', 'originCity', 'text', 'Chicago')}
                {field('Origin State', 'originState', 'text', 'IL')}
                {field('Destination City', 'destinationCity', 'text', 'Miami')}
                {field('Destination State', 'destinationState', 'text', 'FL')}
              </div>

              {error && (
                <p className="text-red-600 text-xs font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200 animate-fade-in">
                  {error}
                </p>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t border-steel/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-steel hover:text-ink hover:bg-lane rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-signal text-white rounded-xl text-xs font-bold hover:bg-signal/90 shadow-sm transition-all"
                >
                  Add Load Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
