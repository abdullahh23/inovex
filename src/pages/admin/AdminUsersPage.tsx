import { useEffect, useState } from 'react';
import { fetchAdminUsers, setUserDisabled } from '../../lib/invoices';
import { Users, AlertCircle, RefreshCw } from 'lucide-react';

type AdminUser = Awaited<ReturnType<typeof fetchAdminUsers>>[number];

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchAdminUsers()
      .then(setUsers)
      .catch(e => setError(e instanceof Error ? e.message : 'Failed to load user list.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toggleDisabled = async (user: AdminUser) => {
    try {
      await setUserDisabled(user.id, !user.is_disabled);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink font-outfit">User Accounts</h1>
          <p className="text-steel text-sm mt-0.5">Manage dispatch platform accounts and permissions.</p>
        </div>
        <button
          onClick={load}
          className="p-2 text-steel hover:text-signal hover:bg-lane rounded-xl transition-all"
          title="Refresh User Data"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl shadow-sm animate-fade-in">
          <AlertCircle size={16} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto rounded-2xl border border-steel/10 bg-white shadow-card">
        {loading ? (
          <div className="p-12 text-center text-steel text-xs font-semibold">Loading platform users...</div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-lane/50 border-b border-steel/10 text-steel text-[11px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4 text-left">Email Address</th>
                <th className="px-5 py-4 text-left">Full Name</th>
                <th className="px-5 py-4 text-left">Role</th>
                <th className="px-5 py-4 text-right">Loads</th>
                <th className="px-5 py-4 text-right">Invoices</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-right">Account Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel/5">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-lane/30 transition-all">
                  <td className="px-5 py-4 font-semibold text-ink text-xs">{u.email}</td>
                  <td className="px-5 py-4 text-road font-medium">{u.full_name || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                      u.role === 'admin' 
                        ? 'bg-purple-50 border-purple-200 text-purple-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-semibold text-road">{u.loadCount}</td>
                  <td className="px-5 py-4 text-right font-mono font-semibold text-road">{u.invoiceCount}</td>
                  
                  {/* Status Indicator */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.is_disabled
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.is_disabled ? 'bg-red-500' : 'bg-green-500'}`} />
                      {u.is_disabled ? 'Disabled' : 'Active'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => toggleDisabled(u)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all border ${
                        u.is_disabled
                          ? 'bg-signal/5 text-signal border-signal/20 hover:bg-signal hover:text-white'
                          : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      {u.is_disabled ? 'Enable Account' : 'Disable Account'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
