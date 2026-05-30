# 我們的地圖 · Map of Us

一個只屬於兩個人的旅行回憶網站 — 用**地圖 + 相片 + 日子**記錄你同另一半一起去過的地方。
靈感來自「Map of Us」,功能類似但 UI 之後可以再用設計工具改善。

> 🔒 **本地私密模式 (LOCAL PRIVACY MODE)**:所有資料(地點、相片、文字)只存喺你部機嘅
> 瀏覽器 (IndexedDB),唔會上傳去任何伺服器。換機 / 換瀏覽器前,記得喺「設定」匯出 JSON 備份。

## 功能

- **地圖** — 可縮放嘅東亞 / 東南亞地圖(香港、中國、日本、東南亞)。去過嘅國家會「點亮」,
  每個地點有一個心形圖釘。開啟「＋ 新增地點」後,直接 click 地圖就會自動填入座標同國家。
- **地點卡** — 回憶 / 相簿 / 歷史三個分頁,記低日期、文字同相片。
- **回憶記錄** — 按時間線(年月)或城市分組,可一鍵「回到地圖」。
- **地點收藏** — 標咗 ♥ 嘅地方集中喺一頁。
- **紀念日** — 「我們在一起 N 天」計數同里程碑 (100 / 365 / 520 / 1314 …)。
- **時光寶盒** — 寫封信,設定未來日子先可以打開。
- **鎖屏** — 4 位數解鎖碼(預設係紀念日嘅 MMDD)。
- **設定 / 管理員模式** — 用密碼開啟先可以新增 / 修改 / 刪除;可改情侶稱呼、紀念日、封面文字,
  以及匯出 / 匯入 / 清除本地資料。

## 預設密碼

- 解鎖碼:`1223`(紀念日 2025-12-23 嘅月日)
- 管理員密碼:`love`

兩個都可以喺「設定」頁度改。

## 開發

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 打包到 dist/(純靜態,可放 GitHub Pages / Netlify)
```

## 部署上 GitHub Pages

已內置自動部署:每次 push 上 `claude/couple-travel-map-site-S8gno`,GitHub Actions 就會
build 同部署。你只需要喺 GitHub 做一次設定:

1. **Settings → Pages → Build and deployment → Source** 揀 **GitHub Actions**。
2. (免費版 Pages 需要 repo 係 **public**;repo 私密要 GitHub Pro。)
3. 等 **Actions** 分頁嘅 workflow 跑完(綠剔),網址會係:
   `https://<你嘅 GitHub 名>.github.io/cc2/`

> 🔐 **關於私隱**:就算網址公開,你嘅相片同回憶都唔會外洩 —— 所有資料只存喺你自己部機嘅
> 瀏覽器,陌生人入嚟只會見到一個空白 App,再加上有鎖屏。
>
> ⚠️ 如果改咗 repo 名,記得同步改 `vite.config.ts` 入面個 `base`(`/<repo 名>/`)。

## 技術

React + Vite + TypeScript · `react-simple-maps` (d3-geo 向量地圖,無需 API key) ·
`idb-keyval` (IndexedDB) · 世界地圖資料來自 `world-atlas` (countries-50m,已內嵌離線使用)。
