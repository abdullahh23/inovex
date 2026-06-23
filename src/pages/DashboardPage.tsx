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

  const isPending   = profile?.status === 'pending';
  const isSuspended = profile?.status === 'suspended';

  const manualLimit = profile?.manual_load_limit  ?? 15;
  const manualUsed  = profile?.manual_loads_used  ?? 0;
  const fileLimit   = profile?.file_upload_limit  ?? 20;
  const fileUsed    = profile?.file_uploads_used  ?? 0;

  let fileDisabledMessage = '';
  if (isPending)        fileDisabledMessage = 'Your account is awaiting admin approval.';
  else if (isSuspended) fileDisabledMessage = 'Your account has been suspended. Contact admin.';
  else if (!canUploadFile) fileDisabledMessage = `File upload limit reached (${fileUsed}/${fileLimit}). Contact support on WhatsApp for more credits.`;

  let manualDisabledMessage = '';
  if (isPending)        manualDisabledMessage = 'Your account is awaiting admin approval.';
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
    <div className="space-y-5 animate-fade-in">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Weekly Loads</h1>
          <p className="text-steel text-sm mt-0.5">Upload rate confirmations to auto-extract and add loads.</p>
        </div>
      </div>

      {/* ── Setup Warnings ── */}
      {!company.companyName && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium">
          <AlertTriangle size={15} className="shrink-0 text-amber-600" />
          <span>Complete your company settings before exporting invoices.</span>
        </div>
      )}

      {!carrier.carrierName && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium">
          <AlertTriangle size={15} className="shrink-0 text-amber-600" />
          <span>Carrier information is not set. Go to Settings to add carrier details.</span>
        </div>
      )}

      {/* ── Motivational Banner ── */}
      <MotivationalSlider />

      {/* ── Account Status Alerts ── */}
      {isPending && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium">
          <Clock size={15} className="shrink-0 text-amber-600" />
          <span>Your account is awaiting admin approval. You cannot upload documents yet.</span>
        </div>
      )}

      {isSuspended && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
          <Shield size={15} className="shrink-0 text-red-600" />
          <span>Your account has been suspended. Contact admin for assistance.</span>
        </div>
      )}

      {!isPending && !isSuspended && !canUploadFile && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
          <AlertTriangle size={15} className="shrink-0 text-red-600" />
          <span>
            File upload limit reached ({fileUsed}/{fileLimit}).{' '}
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-semibold underline">
              Contact support on WhatsApp
            </a>{' '}
            for more credits.
          </span>
        </div>
      )}

      {!isPending && !isSuspended && !canAddManual && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
          <AlertTriangle size={15} className="shrink-0 text-red-600" />
          <span>
            Manual load limit reached ({manualUsed}/{manualLimit}).{' '}
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-semibold underline">
              Contact support on WhatsApp
            </a>{' '}
            for more credits.
          </span>
        </div>
      )}

      {!isPending && !isSuspended && canUploadFile && fileLimit > 0 && (fileLimit - fileUsed) <= 5 && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium">
          <AlertTriangle size={15} className="shrink-0 text-amber-600" />
          <span>
            Only {fileLimit - fileUsed} file upload{(fileLimit - fileUsed) !== 1 ? 's' : ''} remaining.{' '}
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-semibold underline">
              Contact support
            </a>{' '}
            for more credits.
          </span>
        </div>
      )}

      {!isPending && !isSuspended && canAddManual && manualLimit > 0 && (manualLimit - manualUsed) <= 3 && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-medium">
          <AlertTriangle size={15} className="shrink-0 text-amber-600" />
          <span>
            Only {manualLimit - manualUsed} manual load{(manualLimit - manualUsed) !== 1 ? 's' : ''} remaining.{' '}
            <a href="https://wa.me/16023451572" target="_blank" rel="noopener noreferrer" className="text-signal font-semibold underline">
              Contact support
            </a>{' '}
            for more credits.
          </span>
        </div>
      )}

      {lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs font-medium"
        >
          <CheckCircle size={15} className="shrink-0 text-emerald-600" />
          <span>Load "{lastAdded}" added successfully.</span>
        </motion.div>
      )}

      {/* ── Upload Section ── */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-panel">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-semibold text-ink">Upload Rate Confirmation</h2>
            <p className="text-xs text-steel mt-0.5">PDF, JPG, PNG, or WEBP — up to 20 MB</p>
          </div>
          <button
            onClick={() => setManualOpen(true)}
            disabled={!canAddManual}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md border transition-colors ${
              canAddManual
                ? 'text-signal bg-white border-signal/30 hover:bg-signal hover:text-white hover:border-signal'
                : 'text-steel/40 bg-gray-50 border-gray-200 cursor-not-allowed'
            }`}
            title={!canAddManual ? manualDisabledMessage : 'Add a load manually'}
          >
            <Plus size={13} /> Manual Entry
          </button>
        </div>
        <div className="p-5">
          <UploadZone onLoadExtracted={handleExtracted} disabled={!canUploadFile} disabledMessage={fileDisabledMessage} />
          {profile && profile.status === 'approved' && (
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-3 text-[11px] font-medium text-steel border-t border-gray-100 pt-3">
              <span className={fileLimit > 0 && (fileLimit - fileUsed) <= 5 ? 'text-amber-600 font-semibold' : ''}>
                File Uploads: {fileUsed} / {fileLimit === 0 ? '∞' : fileLimit}
                {fileLimit > 0 && <span className="text-steel/50 ml-1">({fileLimit - fileUsed} left)</span>}
              </span>
              <span className={manualLimit > 0 && (manualLimit - manualUsed) <= 3 ? 'text-amber-600 font-semibold' : ''}>
                Manual Loads: {manualUsed} / {manualLimit === 0 ? '∞' : manualLimit}
                {manualLimit > 0 && <span className="text-steel/50 ml-1">({manualLimit - manualUsed} left)</span>}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <TotalsBar
        totalGrossRevenue={totalGrossRevenue}
        dispatchFee={dispatchFee}
        dispatchPercentage={company.dispatchPercentage}
        loadCount={loads.length}
        totalPaid={totalPaid}
        totalUnpaid={totalUnpaid}
      />

      {/* ── Load Table ── */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-panel">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-ink">
            Weekly Load Log
            <span className="ml-2 text-xs font-medium text-steel bg-lane px-2 py-0.5 rounded">
              {loads.length}
            </span>
          </h2>
          {loads.length > 0 && (
            <button
              onClick={() => { if (confirm('Are you sure you want to clear all active loads?')) onClearLoads(); }}
              className="text-xs font-medium text-steel hover:text-red-600 transition-colors"
            >
              Clear Log
            </button>
          )}
        </div>
        <div className="p-5">
          <LoadTable loads={loads} onRemove={onRemoveLoad} />
        </div>
      </div>

      {/* ── Manual Entry Modal ── */}
      <ManualLoadModal open={manualOpen} onClose={() => setManualOpen(false)} onSubmit={handleManual} />
    </div>
  );
}
