import type { CoupleSettings } from '../types';
import { idbGet, idbSet } from './db';

const SETTINGS_KEY = 'settings';
const SESSION_UNLOCK = 'couple-map:unlocked';
const ADMIN_FLAG = 'couple-map:admin';

export const DEFAULT_SETTINGS: CoupleSettings = {
  partnerA: '我',
  partnerB: '你',
  anniversaryDate: '2022-02-22',
  unlockCode: '0222',
  adminPassword: 'love',
  loginCover: {
    title: '輸入紀念日',
    subtitle: '一層只屬於我哋嘅地圖門,密碼藏喺開始嗰一天。',
    content: '',
  },
  homeCover: {
    title: '我們的地圖',
    subtitle: '只屬於兩個人的回憶',
    content: '在地圖嘅每個角落,都有我哋一起走過的故事 ♥',
  },
  defaultMemoryView: 'timeline',
  targetCountries: 10,
};

export async function getSettings(): Promise<CoupleSettings> {
  const saved = await idbGet<Partial<CoupleSettings>>(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...saved };
}

export async function saveSettings(settings: CoupleSettings): Promise<void> {
  await idbSet(SETTINGS_KEY, settings);
}

// ── 鎖屏 session 狀態 (今次 session 有效) ──
export const isUnlocked = () => sessionStorage.getItem(SESSION_UNLOCK) === '1';
export const setUnlocked = (v: boolean) =>
  v
    ? sessionStorage.setItem(SESSION_UNLOCK, '1')
    : sessionStorage.removeItem(SESSION_UNLOCK);

// ── 管理員模式 (今次 session 有效) ──
export const isAdmin = () => sessionStorage.getItem(ADMIN_FLAG) === '1';
export const setAdmin = (v: boolean) =>
  v
    ? sessionStorage.setItem(ADMIN_FLAG, '1')
    : sessionStorage.removeItem(ADMIN_FLAG);
