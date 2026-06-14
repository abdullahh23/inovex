import { Printer, LayoutTemplate } from 'lucide-react';
import { InvoiceTemplate } from '../templates/InvoiceTemplate';
import type { Load, CompanySettings, CarrierSettings } from '../types';

interface InvoicePageProps {
  loads: Load[];
  company: CompanySettings;
  carrier: CarrierSettings;
  invoiceNumber: string;
  invoiceDate: string;
  weekLabel: string;
  onPrint: () => void;
  onTemplateChange?: (templateId: string) => void;
}

export function InvoicePage({
  loads,
  company,
  carrier,
  invoiceNumber,
  invoiceDate,
  weekLabel,
  onPrint,
  onTemplateChange,
}: InvoicePageProps) {
  const currentTemplate = company.templateId || 'classic';

  const templates = [
    { id: 'classic', name: 'Corporate Classic' },
    { id: 'modern', name: 'Modern Minimalist' },
    { id: 'cargo', name: 'Executive Cargo' },
    { id: 'teal', name: 'Emerald Steel' },
  ];

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md border border-steel/10 p-4 rounded-2xl shadow-sm no-print">
        <div>
          <h1 className="text-xl font-bold text-ink">Invoice Statements</h1>
          <p className="text-steel text-xs mt-0.5">Customize, preview, and export invoices.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Template Switcher */}
          <div className="flex items-center gap-2 bg-lane border border-steel/15 px-3 py-1.5 rounded-xl">
            <LayoutTemplate size={16} className="text-signal" />
            <select
              value={currentTemplate}
              onChange={e => onTemplateChange?.(e.target.value)}
              className="bg-transparent text-xs font-semibold text-ink focus:outline-none cursor-pointer pr-2"
            >
              {templates.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-2 bg-signal text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-signal/90 shadow-sm transition-colors text-xs"
          >
            <Printer size={15} />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Invoice Container with styling box */}
      <div className="bg-white rounded-2xl shadow-panel border border-steel/10 overflow-x-auto p-4 md:p-8 flex justify-center">
        <div className="shadow-lg border border-steel/5 rounded-sm bg-white overflow-hidden">
          <InvoiceTemplate
            loads={loads}
            company={company}
            carrier={carrier}
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            weekLabel={weekLabel}
          />
        </div>
      </div>
    </div>
  );
}
