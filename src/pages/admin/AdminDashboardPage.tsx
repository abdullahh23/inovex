import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, FileText, UserCheck, RefreshCw } from 'lucide-react';
import { fetchAdminStats } from '../../lib/invoices';

function StatCard({ label, value, icon: Icon, delay }: { label: string; value: number; icon: typeof Users; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="bg-white border border-steel/10 rounded-2xl p-6 shadow-card hover:shadow-panel transition-all duration-300 flex items-start gap-4"
    >
      <div className="w-12 h-12 bg-lane border border-steel/5 rounded-xl flex items-center justify-center text-signal shrink-0 shadow-xxs">
        <Icon size={22} />
      </div>
      <div>
        <div className="text-xxs font-bold text-steel uppercase tracking-widest">{label}</div>
        <div className="text-3xl font-extrabold text-ink mt-1">{value.toLocaleString()}</div>
      </div>
    </motion.div>
  );
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalLoads: 0, totalInvoices: 0 });
  const [loading, setLoading] = useState(true);

  const loadStats = () => {
    setLoading(true);
    fetchAdminStats()
      .then(setStats)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink font-outfit">Admin Dashboard</h1>
          <p className="text-steel text-sm mt-0.5">Platform overview and user statistics</p>
        </div>
        <button
          onClick={loadStats}
          className="p-2 text-steel hover:text-signal hover:bg-lane rounded-xl transition-all"
          title="Refresh statistics"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-steel text-xs font-semibold">Loading platform statistics...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Registrations" value={stats.totalUsers} icon={Users} delay={0} />
          <StatCard label="Active Accounts" value={stats.activeUsers} icon={UserCheck} delay={0.05} />
          <StatCard label="Weekly Loads" value={stats.totalLoads} icon={Package} delay={0.1} />
          <StatCard label="Total Invoices" value={stats.totalInvoices} icon={FileText} delay={0.15} />
        </div>
      )}
    </div>
  );
}
