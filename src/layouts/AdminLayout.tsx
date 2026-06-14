import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Truck, LayoutDashboard, Users, LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export function AdminLayout() {
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    navigate('/login');
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-signal text-white shadow-sm shadow-signal/20 font-semibold'
        : 'text-steel hover:text-ink hover:bg-lane'
    }`;

  const userInitial = profile?.email?.charAt(0).toUpperCase() || 'A';

  return (
    <div className="min-h-screen flex bg-lane font-sans text-ink">
      {/* Sidebar */}
      <aside className="hidden md:block w-60 bg-white border-r border-steel/10 shadow-sm relative no-print shrink-0">
        <div className="h-full flex flex-col fixed top-0 bottom-0 left-0 w-60">
          
          {/* Header */}
          <div className="p-4 border-b border-steel/10 flex items-center gap-3">
            <div className="w-9 h-9 bg-ink rounded-xl flex items-center justify-center shadow-sm">
              <Truck size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-ink leading-tight">Admin Portal</span>
              <span className="text-[10px] text-steel font-semibold uppercase tracking-wider">Load to Cash</span>
            </div>
          </div>

          {/* Links */}
          <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
            <NavLink to="/admin" end className={navClass}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink to="/admin/users" className={navClass}>
              <Users size={18} /> Users
            </NavLink>
            
            {/* Link back to Main App */}
            <div className="pt-4 mt-4 border-t border-steel/10">
              <NavLink to="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-signal hover:bg-signal/5 hover:text-signal/90 transition-all">
                <ArrowLeft size={14} /> Back to Dashboard
              </NavLink>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-steel/10 space-y-3 bg-lane/50">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-ink/10 border border-ink/20 text-ink flex items-center justify-center font-bold text-xs shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-ink truncate">Administrator</div>
                <div className="text-[10px] text-steel truncate" title={profile?.email}>{profile?.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-steel hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-steel/10 px-4 flex items-center justify-between z-30 no-print">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
              <Truck size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm text-ink uppercase tracking-wider">Admin Panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-steel hover:text-red-600 hover:bg-lane rounded-xl transition-all"
            title="Log Out"
          >
            <LogOut size={20} />
          </button>
        </div>

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full pt-20 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
