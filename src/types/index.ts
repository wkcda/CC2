// 共用資料模型 — 全部資料只存喺本機瀏覽器 (LOCAL PRIVACY MODE)

export interface PhotoMeta {
  id: string;            // uuid;真正嘅圖片 Blob 另外存喺 IDB key `photo:<id>`
  caption?: string;
  addedAt: string;       // ISO
}

export type HistoryAction =
  | 'created'
  | 'edited'
  | 'photo_added'
  | 'photo_removed'
  | 'favorited'
  | 'unfavorited';

export interface HistoryEntry {
  id: string;
  at: string;            // ISO timestamp
  action: HistoryAction;
  summary: string;       // 顯示喺「歷史」分頁
}

export interface Coords {
  lng: number;
  lat: number;
}

export interface Place {
  id: string;
  name: string;          // 城市 / 地點名,例如「京都」
  country: string;       // 對應國家名 (英文,例如 "Japan" / "China")
  coords: Coords;
  date: string;          // 到訪日期 ISO (YYYY-MM-DD)
  note: string;          // 回憶文字
  photoIds: string[];    // -> PhotoMeta id;Blob 存喺 IDB
  favorite: boolean;     // 地點收藏
  history: HistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CoverPhoto {
  photoId?: string;
  title: string;
  subtitle: string;
  content: string;
}

export type MemoryView = 'timeline' | 'city';

export interface CoupleSettings {
  partnerA: string;
  partnerB: string;
  anniversaryDate: string;   // ISO YYYY-MM-DD -> 在一起日數 + 解鎖碼
  unlockCode: string;        // 4 位數;預設 = 紀念日嘅 MMDD
  adminPassword: string;     // 簡單明文 (本機軟性保護,非真正驗證)
  loginCover: CoverPhoto;    // 鎖屏封面
  homeCover: CoverPhoto;     // 地圖首頁封面
  defaultMemoryView: MemoryView;
  targetCountries: number;   // 進度分母,例如「已點亮 2 / N」
}

export interface BackupBundle {
  version: 1;
  exportedAt: string;
  settings: CoupleSettings;
  places: Place[];
  photos: { id: string; dataUrl: string }[];
}
