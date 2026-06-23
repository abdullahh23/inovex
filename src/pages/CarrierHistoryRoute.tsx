import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CarrierHistoryPage } from './CarrierHistoryPage';
import { fetchCarrierHistory, toggleInvoiceStatus, deleteInvoice } from '../lib/invoices';

export function CarrierHistoryRoute() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchCarrierHistory(user.id);
      setInvoices(data);
    } catch {
      // Error is non-critical — page shows empty state
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleToggleStatus = async (invoiceId: string, newStatus: 'paid' | 'unpaid') => {
    // Optimistic update first for instant UI response
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv));
    try {
      await toggleInvoiceStatus(invoiceId, newStatus);
    } catch {
      // Rollback optimistic update on failure
      setInvoices(prev => prev.map(inv =>
        inv.id === invoiceId ? { ...inv, status: newStatus === 'paid' ? 'unpaid' : 'paid' } : inv
      ));
    }
  };

  const handleDelete = async (invoiceId: string) => {
    // Optimistic removal
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    try {
      await deleteInvoice(invoiceId);
    } catch {
      // Restore on failure
      loadData();
    }
  };

  return (
    <CarrierHistoryPage
      invoices={invoices}
      loading={loading}
      onToggleStatus={handleToggleStatus}
      onDelete={handleDelete}
      onRefresh={loadData}
    />
  );
}
