import { useCallback, useEffect, useState } from 'react';
import type { CoupleSettings } from '../types';
import {
  getSettings,
  saveSettings,
  DEFAULT_SETTINGS,
  isAdmin,
  setAdmin,
} from '../data/settings';

export function useSettings() {
  const [settings, setSettings] = useState<CoupleSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [admin, setAdminState] = useState(isAdmin());

  const refresh = useCallback(async () => {
    setSettings(await getSettings());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const save = useCallback(async (next: CoupleSettings) => {
    await saveSettings(next);
    setSettings(next);
  }, []);

  const enableAdmin = useCallback(
    (password: string) => {
      if (password === settings.adminPassword) {
        setAdmin(true);
        setAdminState(true);
        return true;
      }
      return false;
    },
    [settings.adminPassword],
  );

  const disableAdmin = useCallback(() => {
    setAdmin(false);
    setAdminState(false);
  }, []);

  return { settings, loading, save, refresh, admin, enableAdmin, disableAdmin };
}
