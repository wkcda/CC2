import beijingPhoto from '../assets/seed-beijing.jpg';
import { getPlaces, savePlaces, makeHistory } from './storage';
import { addPhoto } from './photos';
import { idbGet, idbSet, uid, nowIso } from './db';
import type { Place } from '../types';

const SEED_FLAG = 'seeded:v1';

// 預設地點(第一次打開、未有任何資料時自動建立一次)。
// 之後使用者自己加/刪都唔會被覆蓋,因為有 SEED_FLAG 記住已經種過。
async function buildBeijing(): Promise<Place> {
  // 將打包入嚟嘅相片 fetch 返做 File,再經 addPhoto 縮圖存 IndexedDB
  const res = await fetch(beijingPhoto);
  const blob = await res.blob();
  const file = new File([blob], 'beijing.jpg', { type: blob.type || 'image/jpeg' });
  const meta = await addPhoto(file);

  return {
    id: uid(),
    name: '北京',
    country: 'China',
    coords: { lng: 116.4, lat: 39.9 }, // 故宮 / 北京市中心
    date: '2025-12-26',
    note: '12月26日,一齊去咗北京 ❄️ 故宮好靚。',
    photoIds: [meta.id],
    favorite: true,
    history: [makeHistory('created', '預設地點「北京」')],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
}

export async function ensureSeed(): Promise<void> {
  const seeded = await idbGet<boolean>(SEED_FLAG);
  if (seeded) return;

  const existing = await getPlaces();
  // 只有喺完全冇地點時先種,避免覆蓋使用者資料
  if (existing.length === 0) {
    try {
      const beijing = await buildBeijing();
      await savePlaces([beijing]);
    } catch {
      // 種子失敗都唔好阻住 App 啟動
    }
  }
  await idbSet(SEED_FLAG, true);
}
