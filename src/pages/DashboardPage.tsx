import { CheckCircle, Plus, AlertTriangle, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { UploadZone } from '../components/UploadZone';
import { LoadTable } from '../components/LoadTable';
import { TotalsBar } from '../components/TotalsBar';
import { ManualLoadModal } from '../components/loads/ManualLoadModal';
import { MotivationalSlider } from '../components/MotivationalSlider';
import type { Load, CompanySettings, CarrierSettings } from '../types';
import type { Profile } from '../lib/supabase';
import { calcTotals } from '../lib/calc';
import { useState, useEffect, useCallback } from 'react';
import { fetchUserInvoices } from '../lib/invoices';

interface DashboardPageProps {
  loads: Load[];
  company: CompanySettings;
  carrier: CarrierSettings;
  profile: Profile | null;
  canUploadFile: boolean;
  canAddManual: boolean;
  onLoadExtracted: (load: Load) => void | Promise<void>;
  onManualLoad: (load: Omit<Load, 'id'>) => void | Promise<void>;
  onRemoveLoad: (id: string) => void;
  onClearLoads: () => void;
}

export function DashboardPage({
  loads,
  company,
  carrier,
  profile,
  canUploadFile,
  canAddManual,
  onLoadExtracted,
  onManualLoad,
  onRemoveLoad,
  onClearLoads,
}: DashboardPageProps) {
  const { totalGrossRevenue, dispatchFee } = calcTotals(loads, company.dispatchPercentage);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  const loadInvoiceStats = useCallback(async () => {
    if (!profile) return;
    try {
      const invoices = await fetchUserInvoices(profile.id);
      let paid = 0, unpaid = 0;
      for (const inv of invoices) {
        const fee = Number(inv.dispatch_fee) || 0;
        if (inv.status === 'paid') paid += fee;
        else unpaid += fee;
      }
      setTotalPaid(paid);
      setTotalUnpaid(unpaid);
    } catch (e) {
      console.error('Failed to fetch invoice stats:', e);
    }
  }, [profile]);

  useEffect(() => { loadInvoiceStats(); }, [loadInvoiceStats]);

  const isPending = profile?.status === 'pending';
  const isSuspended = profile?.status === 'suspended';

  // Split limits
  const manualLimit = profile?.manual_load_limit ?? 10;
  const manualUsed = profile?.manual_loads_used ?? 0;
  const fileLimit = profile?.file_upload_limit ?? 20;
  const fileUsed = profile?.file_uploads_used ?? 0;

  let fileDisabledMessage = '';
  if (isPending) fileDisabledMessage = 'Your account is awaiting admin approval.';
  else if (isSuspended) fileDisabledMessage = 'Your account has been suspended. Contact admin.';
  else if (!canUploadFile) fileDisabledMessage = `File upload limit reached (${fileUsed}/${fileLimit}). Contact support on WhatsApp for more credits.`;

  let manualDisabledMessage = '';
  if (isPending) manualDisabledMessage = 'Your account is awaiting admin approval.';
  else if (isSuspended) manualDisabledMessage = 'Your account has been suspended. Contact admin.';
  else if (!canAddManual) manualDisabledMessage = `Manual load limit reached (${manualUsed}/${manualLimit}). Contact support on WhatsApp for more credits.`;

  const handleExtracted = async (load: Load) => {
    await onLoadExtracted(load);
    setLastAdded(load.loadNumber || 'Load');
    setTimeout(() => setLastAdded(null), 3000);
  };

  const handleManual = async (data: Omit<Load, 'id'>) => {
    if (!canAddManual) {
      alert(manualDisabledMessage || 'You cannot add manual loads at this time.');
      return;
    }
    await onManualLoad(data);
    setLastAdded(data.loadNumber || 'Load');
    setTimeout(() => setLastAdded(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight font-outfit">Weekly Loads</h1>
          <p className="text-steel text-sm mt-0.5 font-medium">Upload rate confirmations to auto-extract and add loads.</p>
        </div>
      </div>

      {/* Warnings & Alerts */}
      {!company.companyName && (
        <div className="bg-amberline/5 border border-amberline/20 text-amberline rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <AlertTriangle size={16} className="shrink-0" />
          <span>Complete your company settings before exporting invoices.</span>
        </div>
      )}

      {!carrier.carrierName && (
        <div className="bg-amberline/5 border border-amberline/20 text-amberline rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <AlertTriangle size={16} className="shrink-0" />
          <span>Carrier information is not set. Go to Settings to add carrier details.</span>
        </div>
      )}

      {/* Motivational Slider */}
      <MotivationalSlider />

      {/* Approval Status Banners */}
      {isPending && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <Clock size={16} className="shrink-0 text-amber-600" />
          <span>Your account is awaiting admin approval. You cannot upload documents yet.</span>
        </div>
      )}

      {isSuspended && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <Shield size={16} className="shrink-0 text-red-600" />
          <span>Your account has been suspended. Contact admin for assistance.</span>
        </div>
      )}

      {!isPending && !isSuspended && !canUploadFile && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <AlertTriangle size={16} className="shrink-0 text-red-600" />
          <span>
            File upload limit reached ({fileUsed}/{fileLimit}). 
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-bold underline ml-1">Contact support on WhatsApp</a> for more credits.
          </span>
        </div>
      )}

      {!isPending && !isSuspended && !canAddManual && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <AlertTriangle size={16} className="shrink-0 text-red-600" />
          <span>
            Manual load limit reached ({manualUsed}/{manualLimit}). 
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-bold underline ml-1">Contact support on WhatsApp</a> for more credits.
          </span>
        </div>
      )}

      {/* Low credits warning */}
      {!isPending && !isSuspended && canUploadFile && fileLimit > 0 && (fileLimit - fileUsed) <= 5 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <AlertTriangle size={16} className="shrink-0 text-amber-600" />
          <span>
            ⚠️ Only {fileLimit - fileUsed} file upload{(fileLimit - fileUsed) !== 1 ? 's' : ''} remaining! 
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-bold underline ml-1">Contact support on WhatsApp</a> for more credits.
          </span>
        </div>
      )}

      {!isPending && !isSuspended && canAddManual && manualLimit > 0 && (manualLimit - manualUsed) <= 3 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2.5 shadow-card">
          <AlertTriangle size={16} className="shrink-0 text-amber-600" />
          <span>
            ⚠️ Only {manualLimit - manualUsed} manual load{(manualLimit - manualUsed) !== 1 ? 's' : ''} remaining! 
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-bold underline ml-1">Contact support on WhatsApp</a> for more credits.
          </span>
        </div>
      )}

      {lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 bg-teal-50 border border-teal-200 text-teal-700 rounded-2xl p-4 text-xs font-semibold shadow-card"
        >
          <CheckCircle size={16} className="shrink-0 text-teal-600" />
          <span>Load "{lastAdded}" added successfully!</span>
        </motion.div>
      )}

      {/* Upload Block */}
      <div className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-steel/5 pb-4">
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Upload Rate Confirmation</h2>
          <button
            onClick={() => setManualOpen(true)}
            disabled={!canAddManual}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
              canAddManual
                ? 'text-signal bg-signal/5 border border-signal/15 hover:bg-signal hover:text-white'
                : 'text-steel/50 bg-steel/5 border border-steel/10 cursor-not-allowed'
            }`}
            title={!canAddManual ? manualDisabledMessage : 'Add a load manually'}
          >
            <Plus size={14} /> Manual Load Entry
          </button>
        </div>
        <UploadZone onLoadExtracted={handleExtracted} disabled={!canUploadFile} disabledMessage={fileDisabledMessage} />
        {profile && profile.status === 'approved' && (
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-1 text-xs font-semibold">
            <span className={`${fileLimit > 0 && (fileLimit - fileUsed) <= 5 ? 'text-amber-600' : 'text-steel'}`}>
              📁 File Uploads: {fileUsed} / {fileLimit === 0 ? '∞' : fileLimit}
              {fileLimit > 0 && <span className="text-steel/60 ml-1">({fileLimit - fileUsed} remaining)</span>}
            </span>
            <span className={`${manualLimit > 0 && (manualLimit - manualUsed) <= 3 ? 'text-amber-600' : 'text-steel'}`}>
              ✏️ Manual Loads: {manualUsed} / {manualLimit === 0 ? '∞' : manualLimit}
              {manualLimit > 0 && <span className="text-steel/60 ml-1">({manualLimit - manualUsed} remaining)</span>}
            </span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <TotalsBar
        totalGrossRevenue={totalGrossRevenue}
        dispatchFee={dispatchFee}
        dispatchPercentage={company.dispatchPercentage}
        loadCount={loads.length}
        totalPaid={totalPaid}
        totalUnpaid={totalUnpaid}
      />

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-panel border border-steel/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-steel/5 pb-4">
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider">Weekly Load Log ({loads.length})</h2>
          {loads.length > 0 && (
            <button
              onClick={() => { if (confirm('Are you sure you want to clear all active loads?')) onClearLoads(); }}
              className="text-xs font-bold text-steel hover:text-red-500 transition-colors"
            >
              Clear Log
            </button>
          )}
        </div>
        <LoadTable loads={loads} onRemove={onRemoveLoad} />
      </div>

      {/* Manual Entry Modal */}
      <ManualLoadModal open={manualOpen} onClose={() => setManualOpen(false)} onSubmit={handleManual} />
    </div>
  );
}
