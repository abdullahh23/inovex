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
      <div className="text-center py-14 text-steel text-sm bg-lane/60 rounded-lg border border-dashed border-steel/20">
        <div className="text-base mb-1">No active loads</div>
        <div className="text-xs text-steel/60">Upload a rate confirmation or enter a load manually to get started.</div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-steel bg-lane border-b border-gray-200">
              <th className="px-5 py-3.5 text-left">Load Info</th>
              <th className="px-5 py-3.5 text-left">Broker</th>
              <th className="px-5 py-3.5 text-left">Pickup Date</th>
              <th className="px-5 py-3.5 text-left">Route</th>
              <th className="px-5 py-3.5 text-right">Gross Pay</th>
              <th className="px-5 py-3.5 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loads.map((load) => {
              const isExtracted = load.source === 'extract';
              const route = load.originCity && load.destinationCity
                ? `${load.originCity}, ${load.originState} → ${load.destinationCity}, ${load.destinationState}`
                : '—';

              return (
                <tr key={load.id} className="hover:bg-blue-50/40 transition-colors duration-100">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-ink text-sm">
                        {load.loadNumber || '—'}
                      </span>
                      {isExtracted ? (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold bg-blue-50 border border-blue-200 text-blue-700 px-1.5 py-0.5 rounded" title="Auto-extracted via AI">
                          <Sparkles size={8} /> AI
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold bg-gray-100 border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded" title="Manually entered">
                          <FileInput size={8} /> Manual
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink font-medium">{load.brokerName || '—'}</td>
                  <td className="px-5 py-3.5 text-road text-sm">{formatDate(load.pickupDate)}</td>
                  <td className="px-5 py-3.5 text-road text-sm">{route}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-ink text-sm">
                    {formatCurrency(load.grossAmount)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => { if (confirm('Remove this load?')) onRemove(load.id); }}
                      className="w-7 h-7 rounded flex items-center justify-center text-steel hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove load"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-2.5">
        {loads.map((load) => {
          const isExtracted = load.source === 'extract';
          const route = load.originCity && load.destinationCity
            ? `${load.originCity}, ${load.originState} → ${load.destinationCity}, ${load.destinationState}`
            : '—';

          return (
            <div key={load.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-ink text-sm">
                    {load.loadNumber || '—'}
                  </span>
                  {isExtracted ? (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold bg-blue-50 border border-blue-200 text-blue-700 px-1.5 py-0.5 rounded">
                      <Sparkles size={8} /> AI
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold bg-gray-100 border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                      <FileInput size={8} /> Manual
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { if (confirm('Remove this load?')) onRemove(load.id); }}
                  className="w-7 h-7 rounded flex items-center justify-center text-steel hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <div>
                  <div className="text-[10px] font-semibold text-steel uppercase tracking-wider mb-0.5">Broker</div>
                  <div className="text-ink font-medium">{load.brokerName || '—'}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-steel uppercase tracking-wider mb-0.5">Gross Pay</div>
                  <div className="text-ink font-semibold font-mono">{formatCurrency(load.grossAmount)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-steel uppercase tracking-wider mb-0.5">Pickup</div>
                  <div className="text-road">{formatDate(load.pickupDate)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-steel uppercase tracking-wider mb-0.5">Route</div>
                  <div className="text-road truncate">{route}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
