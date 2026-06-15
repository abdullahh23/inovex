import { useAppSettings } from '../contexts/DataContext';
import { SettingsPage } from './SettingsPage';

export function SettingsRoute() {
  const { company, carrier, savedCarriers, saveAll, addSavedCarrier, removeSavedCarrier, loadSavedCarrier } = useAppSettings();

  return (
    <SettingsPage
      company={company}
      carrier={carrier}
      savedCarriers={savedCarriers ?? []}
      onSave={saveAll}
      onAddCarrier={addSavedCarrier}
      onRemoveCarrier={removeSavedCarrier}
      onLoadCarrier={loadSavedCarrier}
    />
  );
}
