import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, type Profile } from '../lib/supabase';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role?: 'user' | 'admin' }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  resendVerification: () => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
  isPending: boolean;
  isSuspended: boolean;
  canUpload: boolean;
  canUploadFile: boolean;
  canAddManual: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error || !data) return null;
  return data as Profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const { data: { session: s } } = await supabase.auth.getSession();
    if (!s?.user) {
      setProfile(null);
      return;
    }
    const p = await fetchProfile(s.user.id);
    if (p?.is_disabled) {
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
      return;
    }
    setProfile(p);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        fetchProfile(s.user.id).then(p => {
          if (p?.is_disabled) {
            supabase.auth.signOut();
            setProfile(null);
          } else {
            setProfile(p);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
        fetchProfile(s.user.id).then(p => {
          if (p?.is_disabled) {
            supabase.auth.signOut();
            setProfile(null);
          } else {
            setProfile(p);
          }
        });
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone: phone || '' } },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.user) {
      const p = await fetchProfile(data.user.id);
      if (p?.is_disabled) {
        await supabase.auth.signOut();
        return { error: 'Your account has been disabled. Contact support.' };
      }
      setProfile(p);
      return { error: null, role: p?.role };
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  };

  const resendVerification = async () => {
    if (!session?.user?.email) return { error: 'No email on file' };
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: session.user.email,
    });
    return { error: error?.message ?? null };
  };

  // Default to 'approved' — new users no longer need admin approval
  const userStatus = profile?.status || 'approved';
  const isAdminUser = profile?.role === 'admin' && !profile?.is_disabled;
  const isPending = !isAdminUser && userStatus === 'pending';
  const isSuspended = !isAdminUser && userStatus === 'suspended';
  const isApproved = isAdminUser || userStatus === 'approved';
  const limit = profile?.monthly_upload_limit ?? 0;
  const used = profile?.uploads_used ?? 0;
  const quotaExceeded = isApproved && limit > 0 && used >= limit;

  // Split limits
  const manualLimit = profile?.manual_load_limit ?? 15;
  const manualUsed = profile?.manual_loads_used ?? 0;
  const fileLimit = profile?.file_upload_limit ?? 20;
  const fileUsed = profile?.file_uploads_used ?? 0;
  const manualQuotaExceeded = isApproved && manualLimit > 0 && manualUsed >= manualLimit;
  const fileQuotaExceeded = isApproved && fileLimit > 0 && fileUsed >= fileLimit;

  const canUploadFile = isApproved && !fileQuotaExceeded && !profile?.is_disabled;
  const canAddManual = isApproved && !manualQuotaExceeded && !profile?.is_disabled;
  const canUpload = canUploadFile || canAddManual;

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resendVerification,
    refreshProfile,
    isAdmin: profile?.role === 'admin' && !profile?.is_disabled,
    isPending: !!isPending,
    isSuspended: !!isSuspended,
    canUpload: !!canUpload,
    canUploadFile: !!canUploadFile,
    canAddManual: !!canAddManual,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
