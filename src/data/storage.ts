import type { Place, HistoryEntry, HistoryAction } from '../types';
import { idbGet, idbSet, uid, nowIso } from './db';

const PLACES_KEY = 'places';

export async function getPlaces(): Promise<Place[]> {
  return (await idbGet<Place[]>(PLACES_KEY)) ?? [];
}

export async function savePlaces(places: Place[]): Promise<void> {
  await idbSet(PLACES_KEY, places);
}

export function makeHistory(action: HistoryAction, summary: string): HistoryEntry {
  return { id: uid(), at: nowIso(), action, summary };
}

export type PlaceDraft = Pick<
  Place,
  'name' | 'country' | 'coords' | 'date' | 'note' | 'photoIds' | 'favorite'
>;

export async function createPlace(draft: PlaceDraft): Promise<Place> {
  const places = await getPlaces();
  const place: Place = {
    id: uid(),
    ...draft,
    history: [makeHistory('created', `新增地點「${draft.name}」`)],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  await savePlaces([place, ...places]);
  return place;
}

export async function updatePlace(
  id: string,
  patch: Partial<PlaceDraft>,
  history: HistoryEntry[] = [],
): Promise<Place | undefined> {
  const places = await getPlaces();
  let updated: Place | undefined;
  const next = places.map((p) => {
    if (p.id !== id) return p;
    updated = {
      ...p,
      ...patch,
      history: [...history, ...p.history],
      updatedAt: nowIso(),
    };
    return updated;
  });
  await savePlaces(next);
  return updated;
}

export async function deletePlace(id: string): Promise<void> {
  const places = await getPlaces();
  await savePlaces(places.filter((p) => p.id !== id));
}
