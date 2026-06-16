import { formatCurrency } from '../lib/calc';
import { Truck, DollarSign, Percent, TrendingUp, TrendingDown } from 'lucide-react';

interface TotalsBarProps {
  totalGrossRevenue: number;
  dispatchFee: number;
  dispatchPercentage: number;
  loadCount: number;
  totalPaid?: number;
  totalUnpaid?: number;
}

export function TotalsBar({ totalGrossRevenue, dispatchFee, dispatchPercentage, loadCount, totalPaid, totalUnpaid }: TotalsBarProps) {
  const showPaymentStats = totalPaid !== undefined || totalUnpaid !== undefined;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 ${showPaymentStats ? 'lg:grid-cols-5' : ''} gap-4`}>
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

      {/* Total Paid Card */}
      {showPaymentStats && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-card hover:shadow-panel transition-all duration-300 flex items-center justify-between">
          <div>
            <div className="text-xxs font-bold text-emerald-700 uppercase tracking-widest mb-1.5">Total Paid</div>
            <div className="text-3xl font-extrabold text-emerald-700">{formatCurrency(totalPaid ?? 0)}</div>
          </div>
          <div className="w-11 h-11 bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp size={18} />
          </div>
        </div>
      )}

      {/* Total Unpaid Card */}
      {showPaymentStats && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-card hover:shadow-panel transition-all duration-300 flex items-center justify-between">
          <div>
            <div className="text-xxs font-bold text-red-700 uppercase tracking-widest mb-1.5">Total Unpaid</div>
            <div className="text-3xl font-extrabold text-red-700">{formatCurrency(totalUnpaid ?? 0)}</div>
          </div>
          <div className="w-11 h-11 bg-red-100 border border-red-200 rounded-xl flex items-center justify-center text-red-500 shrink-0">
            <TrendingDown size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
