import { formatCurrency } from '../lib/calc';
import { Truck, DollarSign, Percent } from 'lucide-react';

interface TotalsBarProps {
  totalGrossRevenue: number;
  dispatchFee: number;
  dispatchPercentage: number;
  loadCount: number;
}

export function TotalsBar({ totalGrossRevenue, dispatchFee, dispatchPercentage, loadCount }: TotalsBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Loads Card */}
      <div className="bg-white border border-steel/10 rounded-2xl p-5 shadow-card hover:shadow-panel transition-all duration-300 flex items-center justify-between">
        <div>
          <div className="text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">Weekly Loads</div>
          <div className="text-3xl font-extrabold text-ink">{loadCount}</div>
        </div>
        <div className="w-11 h-11 bg-lane border border-steel/5 rounded-xl flex items-center justify-center text-steel shrink-0">
          <Truck size={20} />
        </div>
      </div>

      {/* Gross Revenue Card */}
      <div className="bg-white border border-steel/10 rounded-2xl p-5 shadow-card hover:shadow-panel transition-all duration-300 flex items-center justify-between">
        <div>
          <div className="text-xxs font-bold text-steel uppercase tracking-widest mb-1.5">Gross Revenue</div>
          <div className="text-3xl font-extrabold text-ink">{formatCurrency(totalGrossRevenue)}</div>
        </div>
        <div className="w-11 h-11 bg-lane border border-steel/5 rounded-xl flex items-center justify-center text-steel shrink-0">
          <DollarSign size={20} />
        </div>
      </div>

      {/* Dispatch Fee Card (Teal Primary Accent) */}
      <div className="bg-signal text-white rounded-2xl p-5 shadow-sm shadow-signal/15 hover:shadow-panel transition-all duration-300 flex items-center justify-between">
        <div>
          <div className="text-xxs font-bold text-white/75 uppercase tracking-widest mb-1.5">Dispatch Fee ({dispatchPercentage}%)</div>
          <div className="text-3xl font-extrabold">{formatCurrency(dispatchFee)}</div>
        </div>
        <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
          <Percent size={18} />
        </div>
      </div>
    </div>
  );
}
