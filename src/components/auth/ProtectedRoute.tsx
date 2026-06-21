import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactNode } from 'react';
import { ShieldOff, Mail } from 'lucide-react';

export function VerifyEmailRoute({ children }: { children: ReactNode }) {
  // Email verification removed — redirect straight to dashboard
  return <Navigate to="/dashboard" replace />;
}


export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lane">
        <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Suspended users see a block page instead of dashboard
  if (profile?.status === 'suspended' || profile?.is_disabled) {
    return (
      <div className="min-h-screen bg-lane flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-steel/10 p-10 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldOff size={32} className="text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-ink font-outfit mb-2">Account Suspended</h1>
            <p className="text-steel text-sm leading-relaxed">
              Your account has been suspended by an administrator. You cannot access the dashboard at this time.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-left">
            <Mail size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-bold text-sm">Contact Support for Approval</p>
              <p className="text-amber-700 text-xs mt-1">
                Please reach out to our support team to resolve your account status.
              </p>
              <a
                href="mailto:support@loadtocash.online"
                className="inline-block mt-2 text-xs font-bold text-amber-700 underline hover:text-amber-900"
              >
                support@loadtocash.online
              </a>
            </div>
          </div>
          <button
            onClick={() => { window.location.href = '/login'; }}
            className="w-full py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAdmin, loading, session } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lane">
        <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}

export function AuthRoute({ children }: { children: ReactNode }) {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lane">
        <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If already logged in → redirect to dashboard (no email check needed)
  if (session?.user) {
    return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
}
