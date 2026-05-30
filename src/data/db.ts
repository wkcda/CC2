import { get, set, del, keys, createStore } from 'idb-keyval';

// 自訂 IndexedDB store,所有資料都放呢度
export const store = createStore('couple-map-db', 'kv');

export const idbGet = <T>(key: string) => get<T>(key, store);
export const idbSet = (key: string, value: unknown) => set(key, value, store);
export const idbDel = (key: string) => del(key, store);
export const idbKeys = () => keys(store);

export const uid = (): string =>
  (crypto.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

export const nowIso = () => new Date().toISOString();
