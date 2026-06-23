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

function amountSizeClass(amount: number): string {
  const formatted = formatCurrency(amount);
  if (formatted.length >= 13) return 'text-base sm:text-lg';
  if (formatted.length >= 11) return 'text-lg sm:text-xl';
  if (formatted.length >= 9)  return 'text-xl sm:text-2xl';
  return 'text-2xl sm:text-3xl';
}

export function TotalsBar({ totalGrossRevenue, dispatchFee, dispatchPercentage, loadCount, totalPaid, totalUnpaid }: TotalsBarProps) {
  const showPaymentStats = totalPaid !== undefined || totalUnpaid !== undefined;

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 ${showPaymentStats ? 'lg:grid-cols-5' : ''} gap-3`}>

      {/* Weekly Loads */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold text-steel uppercase tracking-widest mb-1">Weekly Loads</div>
          <div className="text-2xl sm:text-3xl font-bold text-ink">{loadCount}</div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Truck size={18} className="text-signal" />
        </div>
      </div>

      {/* Gross Revenue */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold text-steel uppercase tracking-widest mb-1">Gross Revenue</div>
          <div className={`${amountSizeClass(totalGrossRevenue)} font-bold text-ink break-all`}>{formatCurrency(totalGrossRevenue)}</div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <DollarSign size={18} className="text-signal" />
        </div>
      </div>

      {/* Dispatch Fee — primary accent card */}
      <div
        className="rounded-lg p-4 sm:p-5 flex items-center justify-between gap-3 col-span-2 sm:col-span-1 text-white shadow-card"
        style={{ background: '#1d55b0' }}
      >
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Dispatch Fee ({dispatchPercentage}%)
          </div>
          <div className={`${amountSizeClass(dispatchFee)} font-bold break-all`}>{formatCurrency(dispatchFee)}</div>
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <Percent size={18} className="text-white" />
        </div>
      </div>

      {/* Total Paid */}
      {showPaymentStats && (
        <div className="bg-white border border-emerald-200 rounded-lg p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest mb-1">Total Paid</div>
            <div className={`${amountSizeClass(totalPaid ?? 0)} font-bold text-emerald-700 break-all`}>{formatCurrency(totalPaid ?? 0)}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
        </div>
      )}

      {/* Total Unpaid */}
      {showPaymentStats && (
        <div className="bg-white border border-red-200 rounded-lg p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-red-600 uppercase tracking-widest mb-1">Total Unpaid</div>
            <div className={`${amountSizeClass(totalUnpaid ?? 0)} font-bold text-red-700 break-all`}>{formatCurrency(totalUnpaid ?? 0)}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
            <TrendingDown size={18} className="text-red-500" />
          </div>
        </div>
      )}
    </div>
  );
}
