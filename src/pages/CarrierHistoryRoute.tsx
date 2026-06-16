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
    } catch (e) {
      console.error('Failed to load carrier history:', e);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleToggleStatus = async (invoiceId: string, newStatus: 'paid' | 'unpaid') => {
    await toggleInvoiceStatus(invoiceId, newStatus);
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv));
  };

  const handleDelete = async (invoiceId: string) => {
    await deleteInvoice(invoiceId);
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
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
