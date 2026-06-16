import { useState, useCallback, useEffect } from 'react';
import type { CompanySettings, CarrierSettings, SavedCarrier } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const defaultCompany: CompanySettings = {
  companyName: '',
  companyAddress: '',
  companyPhone: '',
  companyEmail: '',
  paymentInstructions: '',
  zelle: '',
  payoneer: '',
  bankInformation: '',
  cashApp: '',
  accountHolderName: '',
  dispatchPercentage: 10,
  templateId: 'classic',
  companyLogo: '',
  companyHeaderText: '',
};

const defaultCarrier: CarrierSettings = {
  carrierName: '',
  carrierAddress: '',
  mcNumber: '',
  carrierPhone: '',
};

export function useSettings() {
  const { user } = useAuth();
  const [company, setCompanyState] = useState<CompanySettings>(defaultCompany);
  const [carrier, setCarrierState] = useState<CarrierSettings>(defaultCarrier);
  const [savedCarriers, setSavedCarriers] = useState<SavedCarrier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCompanyState(defaultCompany);
      setCarrierState(defaultCarrier);
      setSavedCarriers([]);
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('user_settings').select('company, carrier, saved_carriers').eq('user_id', user.id).single();
      if (data) {
        setCompanyState({ ...defaultCompany, ...(data.company as CompanySettings) });
        setCarrierState({ ...defaultCarrier, ...(data.carrier as CarrierSettings) });
        setSavedCarriers((data as any).saved_carriers ?? []);
      }
      setLoading(false);
    })();
  }, [user]);

  const persist = useCallback(async (comp: CompanySettings, carr: CarrierSettings, carriers?: SavedCarrier[]) => {
    if (!user) return;
    await supabase.from('user_settings').upsert({
      user_id: user.id,
      company: comp,
      carrier: carr,
      saved_carriers: carriers ?? savedCarriers,
      updated_at: new Date().toISOString(),
    });
  }, [user, savedCarriers]);

  const saveCompany = useCallback(async (settings: CompanySettings) => {
    setCompanyState(settings);
    await persist(settings, carrier);
  }, [carrier, persist]);

  const saveCarrier = useCallback(async (settings: CarrierSettings) => {
    setCarrierState(settings);
    await persist(company, settings);
  }, [company, persist]);

  const saveAll = useCallback(async (comp: CompanySettings, carr: CarrierSettings) => {
    setCompanyState(comp);
    setCarrierState(carr);
    await persist(comp, carr);
  }, [persist]);

  const addSavedCarrier = useCallback(async (carr: CarrierSettings) => {
    const newCarrier: SavedCarrier = {
      id: crypto.randomUUID(),
      ...carr,
    };
    const updated = [...savedCarriers, newCarrier];
    setSavedCarriers(updated);
    await persist(company, carrier, updated);
  }, [company, carrier, savedCarriers, persist]);

  const removeSavedCarrier = useCallback(async (id: string) => {
    const updated = savedCarriers.filter(c => c.id !== id);
    setSavedCarriers(updated);
    await persist(company, carrier, updated);
  }, [company, carrier, savedCarriers, persist]);

  const loadSavedCarrier = useCallback((id: string) => {
    const found = savedCarriers.find(c => c.id === id);
    if (found) {
      const { id: _, ...carrierData } = found;
      setCarrierState(carrierData);
    }
  }, [savedCarriers]);

  return { company, carrier, savedCarriers, loading, saveCompany, saveCarrier, saveAll, addSavedCarrier, removeSavedCarrier, loadSavedCarrier };
}
