import type { BackupBundle } from '../types';
import { getPlaces, savePlaces } from './storage';
import { getSettings, saveSettings } from './settings';
import {
  getPhotoBlob,
  setPhotoBlob,
  blobToDataUrl,
  dataUrlToBlob,
} from './photos';
import { idbKeys, idbDel } from './db';

export async function exportBackup(): Promise<BackupBundle> {
  const [places, settings] = await Promise.all([getPlaces(), getSettings()]);
  const photoIds = new Set<string>();
  places.forEach((p) => p.photoIds.forEach((id) => photoIds.add(id)));
  if (settings.loginCover.photoId) photoIds.add(settings.loginCover.photoId);
  if (settings.homeCover.photoId) photoIds.add(settings.homeCover.photoId);

  const photos: BackupBundle['photos'] = [];
  for (const id of photoIds) {
    const blob = await getPhotoBlob(id);
    if (blob) photos.push({ id, dataUrl: await blobToDataUrl(blob) });
  }

  return { version: 1, exportedAt: new Date().toISOString(), settings, places, photos };
}

export function downloadBackup(bundle: BackupBundle): void {
  const blob = new Blob([JSON.stringify(bundle, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `map-of-us-backup-${bundle.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(
  bundle: BackupBundle,
  mode: 'merge' | 'replace',
): Promise<void> {
  if (bundle.version !== 1) throw new Error('不支援嘅備份版本');

  for (const photo of bundle.photos) {
    await setPhotoBlob(photo.id, await dataUrlToBlob(photo.dataUrl));
  }

  if (mode === 'replace') {
    await savePlaces(bundle.places);
    await saveSettings(bundle.settings);
  } else {
    const existing = await getPlaces();
    const byId = new Map(existing.map((p) => [p.id, p]));
    bundle.places.forEach((p) => byId.set(p.id, p));
    await savePlaces([...byId.values()]);
    // merge 模式只還原資料,設定保持唔變
  }
}

export async function clearAllData(): Promise<void> {
  const allKeys = await idbKeys();
  await Promise.all(allKeys.map((k) => idbDel(String(k))));
}
