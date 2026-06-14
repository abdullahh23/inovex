import { useState } from 'react';
import { Save, CheckCircle, Building2, Truck, DollarSign, Wallet } from 'lucide-react';
import type { CompanySettings, CarrierSettings } from '../types';

interface SettingsPageProps {
  company: CompanySettings;
  carrier: CarrierSettings;
  onSave: (company: CompanySettings, carrier: CarrierSettings) => void | Promise<void>;
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-steel/20 rounded-xl px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-4 focus:ring-signal/10 focus:border-signal/70 transition-all placeholder:text-steel/45"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-steel/20 rounded-xl px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-4 focus:ring-signal/10 focus:border-signal/70 transition-all placeholder:text-steel/45 resize-none"
      />
    </div>
  );
}

export function SettingsPage({ company, carrier, onSave }: SettingsPageProps) {
  const [comp, setComp] = useState<CompanySettings>(company);
  const [carr, setCarr] = useState<CarrierSettings>(carrier);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await onSave(comp, carr);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setC = (k: keyof CompanySettings) => (v: string) => setComp(prev => ({ ...prev, [k]: k === 'dispatchPercentage' ? Number(v) : v }));
  const setK = (k: keyof CarrierSettings) => (v: string) => setCarr(prev => ({ ...prev, [k]: v }));

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight font-outfit">Settings</h1>
        <p className="text-steel text-sm mt-0.5 font-medium">Configure company info, carrier settings, and payment preferences.</p>
      </div>

      {/* Dispatch Company */}
      <section className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-steel/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-signal/5 text-signal flex items-center justify-center">
            <Building2 size={16} />
          </div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Dispatch Company Profile</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Company Name" value={comp.companyName} onChange={setC('companyName')} placeholder="e.g. Apex Dispatch Services" />
          </div>
          <div className="sm:col-span-2">
            <Field label="Company Address" value={comp.companyAddress} onChange={setC('companyAddress')} placeholder="e.g. 100 Main St, Suite 400, Chicago, IL" />
          </div>
          <Field label="Contact Phone" value={comp.companyPhone} onChange={setC('companyPhone')} placeholder="e.g. (555) 123-4567" />
          <Field label="Contact Email" value={comp.companyEmail} onChange={setC('companyEmail')} type="email" placeholder="e.g. billing@apexdispatch.com" />
        </div>
      </section>

      {/* Carrier Defaults */}
      <section className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-steel/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-signal/5 text-signal flex items-center justify-center">
            <Truck size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Carrier Information</h2>
            <p className="text-[10px] text-steel font-semibold -mt-0.5">Carrier information defaults for invoice billing.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Carrier Name" value={carr.carrierName} onChange={setK('carrierName')} placeholder="e.g. Red Line Express LLC" />
          <Field label="MC Number" value={carr.mcNumber} onChange={setK('mcNumber')} placeholder="e.g. MC-123456" />
          <div className="sm:col-span-2">
            <Field label="Carrier Address" value={carr.carrierAddress} onChange={setK('carrierAddress')} placeholder="e.g. 450 Freight Rd, Dallas, TX" />
          </div>
          <div className="sm:col-span-2">
            <Field label="Carrier Phone" value={carr.carrierPhone} onChange={setK('carrierPhone')} placeholder="e.g. (555) 987-6543" />
          </div>
        </div>
      </section>

      {/* Dispatch Percentage */}
      <section className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-steel/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-signal/5 text-signal flex items-center justify-center">
            <DollarSign size={16} />
          </div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Service Commission Rate</h2>
        </div>
        <div>
          <label className="block text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">Dispatch Fee Percentage</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={50}
              step={0.5}
              value={comp.dispatchPercentage}
              onChange={e => setComp(prev => ({ ...prev, dispatchPercentage: Number(e.target.value) }))}
              className="w-24 border border-steel/20 rounded-xl px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-4 focus:ring-signal/10 focus:border-signal/70 transition-all font-mono"
            />
            <span className="text-steel text-xs font-semibold">% of Weekly Load Total Gross Revenue</span>
          </div>
        </div>
      </section>

      {/* Invoice Template Styling */}
      <section className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-steel/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-signal/5 text-signal flex items-center justify-center">
            <Wallet size={16} />
          </div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Invoice statement Design</h2>
        </div>
        <div>
          <label className="block text-xxs font-bold text-steel uppercase tracking-widest mb-2.5">Default Invoice Template</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'classic', name: 'Corporate Classic', desc: 'Elegant Navy and Gold traditional layout.' },
              { id: 'modern', name: 'Modern Minimalist', desc: 'Clean, high-contrast monochrome design.' },
              { id: 'cargo', name: 'Executive Cargo', desc: 'Bold grid lines with amber logistics accents.' },
              { id: 'teal', name: 'Emerald Steel', desc: 'Polished tech startup slate and teal theme.' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setComp(prev => ({ ...prev, templateId: t.id }))}
                className={`p-4 rounded-xl border text-left transition-all ${
                  (comp.templateId || 'classic') === t.id
                    ? 'border-signal bg-signal/5 ring-2 ring-signal/20'
                    : 'border-steel/15 hover:border-steel/30 bg-white shadow-xxs'
                }`}
              >
                <div className="font-bold text-sm text-ink">{t.name}</div>
                <div className="text-xxs text-steel mt-1 font-semibold">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-steel/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-signal/5 text-signal flex items-center justify-center">
            <Wallet size={16} />
          </div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Payment Information</h2>
        </div>
        <TextArea label="Payment Instructions" value={comp.paymentInstructions} onChange={setC('paymentInstructions')} placeholder="e.g. Please remit payment within 5 business days." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Zelle" value={comp.zelle} onChange={setC('zelle')} placeholder="e.g. finance@apexdispatch.com" />
          <Field label="Payoneer" value={comp.payoneer} onChange={setC('payoneer')} placeholder="e.g. payments@apexdispatch.com" />
          <div className="sm:col-span-2">
            <TextArea label="Bank Account Details (Wire/ACH)" value={comp.bankInformation} onChange={setC('bankInformation')} placeholder="e.g. Bank Name: Chase Bank, Routing: 123456789, Account: 987654321" />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end pt-4 pb-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-signal text-white px-6 py-3 rounded-xl font-bold hover:bg-signal/90 shadow-sm transition-all text-xs"
        >
          {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Settings</>}
        </button>
      </div>
    </div>
  );
}
