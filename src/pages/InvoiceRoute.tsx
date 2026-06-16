import { useMemo, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAppLoads, useAppSettings } from '../contexts/DataContext';
import { InvoicePage } from './InvoicePage';
import { generateInvoiceNumber, getCurrentWeekLabel } from '../lib/calc';
import { saveInvoice } from '../lib/invoices';
import { printInvoice } from '../lib/pdf';

export function InvoiceRoute() {
  const { user } = useAuth();
  const { loads } = useAppLoads();
  const { company, carrier, saveCompany } = useAppSettings();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const invoiceNumber = useMemo(() => generateInvoiceNumber(), []);
  const invoiceDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);
  const weekLabel = useMemo(() => getCurrentWeekLabel(), []);

  const handlePrint = async () => {
    if (user && loads.length > 0) {
      // Ask user if they want to save the carrier loads before printing
      const shouldSave = confirm(
        `Save this invoice and ${loads.length} load(s) to ${carrier.carrierName || 'carrier'} history?\n\n` +
        `This will add all loads to the carrier's records so you can track them in Carrier History.\n\n` +
        `Click OK to save & print, or Cancel to print without saving.`
      );

      if (shouldSave) {
        setSaveStatus('saving');
        try {
          await saveInvoice(user.id, loads, company, carrier, invoiceNumber, invoiceDate, weekLabel);
          setSaveStatus('saved');
          // Auto-clear the toast after 4 seconds
          setTimeout(() => setSaveStatus('idle'), 4000);
        } catch (e) {
          console.error('Failed to save invoice:', e);
          setSaveStatus('error');
          setTimeout(() => setSaveStatus('idle'), 4000);
        }
      }
    }
    printInvoice();
  };

  const handleTemplateChange = async (templateId: string) => {
    await saveCompany({ ...company, templateId });
  };

  return (
    <>
      <InvoicePage
        loads={loads}
        company={company}
        carrier={carrier}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
        weekLabel={weekLabel}
        onPrint={handlePrint}
        onTemplateChange={handleTemplateChange}
      />

      {/* Save Confirmation Toast */}
      {saveStatus !== 'idle' && (
        <div className="fixed bottom-6 right-6 z-50 no-print animate-fade-in">
          {saveStatus === 'saving' && (
            <div className="bg-ink text-white px-5 py-3 rounded-xl shadow-panel flex items-center gap-3 text-sm font-medium">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving to {carrier.carrierName || 'carrier'} history...
            </div>
          )}
          {saveStatus === 'saved' && (
            <div className="bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-panel flex items-center gap-3 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              {loads.length} load(s) saved to {carrier.carrierName || 'carrier'} history!
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-panel flex items-center gap-3 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              Failed to save — check console for details
            </div>
          )}
        </div>
      )}
    </>
  );
}
