import { createContext, useContext, type ReactNode } from 'react';
import { usePlaces } from './hooks/usePlaces';
import { useSettings } from './hooks/useSettings';

type PlacesApi = ReturnType<typeof usePlaces>;
type SettingsApi = ReturnType<typeof useSettings>;

interface AppContextValue extends PlacesApi {
  settings: SettingsApi['settings'];
  settingsLoading: SettingsApi['loading'];
  saveSettings: SettingsApi['save'];
  refreshSettings: SettingsApi['refresh'];
  admin: SettingsApi['admin'];
  enableAdmin: SettingsApi['enableAdmin'];
  disableAdmin: SettingsApi['disableAdmin'];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const placesApi = usePlaces();
  const settingsApi = useSettings();

  const value: AppContextValue = {
    ...placesApi,
    settings: settingsApi.settings,
    settingsLoading: settingsApi.loading,
    saveSettings: settingsApi.save,
    refreshSettings: settingsApi.refresh,
    admin: settingsApi.admin,
    enableAdmin: settingsApi.enableAdmin,
    disableAdmin: settingsApi.disableAdmin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp 必須喺 AppProvider 入面用');
  return ctx;
}
