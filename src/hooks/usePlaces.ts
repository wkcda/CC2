import { useCallback, useEffect, useState } from 'react';
import type { Place } from '../types';
import {
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  type PlaceDraft,
} from '../data/storage';
import type { HistoryEntry } from '../types';

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setPlaces(await getPlaces());
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const add = useCallback(
    async (draft: PlaceDraft) => {
      const p = await createPlace(draft);
      await refresh();
      return p;
    },
    [refresh],
  );

  const update = useCallback(
    async (id: string, patch: Partial<PlaceDraft>, history?: HistoryEntry[]) => {
      const p = await updatePlace(id, patch, history);
      await refresh();
      return p;
    },
    [refresh],
  );

  const remove = useCallback(
    async (id: string) => {
      await deletePlace(id);
      await refresh();
    },
    [refresh],
  );

  return { places, loading, refresh, add, update, remove };
}
