import { Trash2, Sparkles, FileInput } from 'lucide-react';
import type { Load } from '../types';
import { formatCurrency, formatDate } from '../lib/calc';

interface LoadTableProps {
  loads: Load[];
  onRemove: (id: string) => void;
}

export function LoadTable({ loads, onRemove }: LoadTableProps) {
  if (loads.length === 0) {
    return (
      <div className="text-center py-12 text-steel text-sm bg-lane/50 rounded-2xl border border-dashed border-steel/20">
        No active loads listed. Upload a rate confirmation or enter a load manually to get started.
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-steel/10 bg-white shadow-card">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-lane/50 border-b border-steel/10 text-steel text-[11px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4 text-left">Load Info</th>
              <th className="px-5 py-4 text-left">Broker</th>
              <th className="px-5 py-4 text-left">Pickup Date</th>
              <th className="px-5 py-4 text-left">Route Details</th>
              <th className="px-5 py-4 text-right">Gross Pay</th>
              <th className="px-5 py-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel/5">
            {loads.map((load) => {
              const isExtracted = load.source === 'extract';
              const route = load.originCity && load.destinationCity
                ? `${load.originCity}, ${load.originState} → ${load.destinationCity}, ${load.destinationState}`
                : '—';
              
              return (
                <tr key={load.id} className="hover:bg-lane/35 transition-all">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-ink text-sm">
                        {load.loadNumber || '—'}
                      </span>
                      {isExtracted ? (
                        <span className="flex items-center gap-0.5 text-[9px] font-extrabold bg-teal-50 border border-teal-200 text-teal-700 px-1.5 py-0.5 rounded-full" title="Auto-extracted via AI">
                          <Sparkles size={8} /> AI
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[9px] font-extrabold bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full" title="Manually entered">
                          <FileInput size={8} /> Manual
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink font-semibold">{load.brokerName || '—'}</td>
                  <td className="px-5 py-4 text-road font-medium">{formatDate(load.pickupDate)}</td>
                  <td className="px-5 py-4 text-road font-medium">{route}</td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-ink text-sm">
                    {formatCurrency(load.grossAmount)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => { if (confirm('Remove this load?')) onRemove(load.id); }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-steel hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Remove load"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout (visible on mobile only) */}
      <div className="md:hidden space-y-3">
        {loads.map((load) => {
          const isExtracted = load.source === 'extract';
          const route = load.originCity && load.destinationCity
            ? `${load.originCity}, ${load.originState} → ${load.destinationCity}, ${load.destinationState}`
            : '—';

          return (
            <div key={load.id} className="bg-white border border-steel/10 rounded-xl p-4 shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-ink text-sm">
                    {load.loadNumber || '—'}
                  </span>
                  {isExtracted ? (
                    <span className="flex items-center gap-0.5 text-[9px] font-extrabold bg-teal-50 border border-teal-200 text-teal-700 px-1.5 py-0.5 rounded-full">
                      <Sparkles size={8} /> AI
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[9px] font-extrabold bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full">
                      <FileInput size={8} /> Manual
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { if (confirm('Remove this load?')) onRemove(load.id); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-steel hover:text-red-600 hover:bg-red-50 transition-all"
                  title="Remove load"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                <div>
                  <span className="text-steel font-medium">Broker</span>
                  <div className="text-ink font-semibold">{load.brokerName || '—'}</div>
                </div>
                <div className="text-right">
                  <span className="text-steel font-medium">Gross Pay</span>
                  <div className="text-ink font-bold font-mono">{formatCurrency(load.grossAmount)}</div>
                </div>
                <div>
                  <span className="text-steel font-medium">Pickup</span>
                  <div className="text-road font-medium">{formatDate(load.pickupDate)}</div>
                </div>
                <div className="text-right">
                  <span className="text-steel font-medium">Route</span>
                  <div className="text-road font-medium text-xs truncate">{route}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
