import { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { codeFromAnniversary } from '../lib/date';
import {
  exportBackup,
  downloadBackup,
  importBackup,
  clearAllData,
} from '../data/backup';
import type { BackupBundle, CoupleSettings } from '../types';

export function SettingsPage() {
  const {
    settings,
    saveSettings,
    admin,
    enableAdmin,
    disableAdmin,
    refresh,
    refreshSettings,
  } = useApp();

  const [draft, setDraft] = useState<CoupleSettings>(settings);
  const [pw, setPw] = useState('');
  const [usage, setUsage] = useState<string>('');
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(settings), [settings]);

  useEffect(() => {
    navigator.storage?.estimate?.().then((e) => {
      const used = ((e.usage ?? 0) / 1024 / 1024).toFixed(1);
      const quota = ((e.quota ?? 0) / 1024 / 1024).toFixed(0);
      setUsage(`${used} MB / ${quota} MB`);
    });
  }, []);

  const set = <K extends keyof CoupleSettings>(k: K, v: CoupleSettings[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const onSave = async () => {
    await saveSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const onExport = async () => {
    downloadBackup(await exportBackup());
  };

  const onImport = async (file: File, mode: 'merge' | 'replace') => {
    const text = await file.text();
    const bundle = JSON.parse(text) as BackupBundle;
    await importBackup(bundle, mode);
    await refresh();
    await refreshSettings();
    alert('匯入完成 ✓');
  };

  const onClear = async () => {
    if (!confirm('確定清除所有本地資料?此操作無法復原!')) return;
    await clearAllData();
    await refresh();
    await refreshSettings();
    alert('已清除所有資料。');
  };

  return (
    <div className="page">
      <h2 className="page-title">設定</h2>
      <p className="muted small">管理本地資料同目前項目狀態。</p>

      {/* 管理員模式 */}
      <section className="settings-card">
        <h3 className="section-title">管理員模式</h3>
        {admin ? (
          <div className="row-between">
            <span className="muted">已開啟 — 可以新增、修改、刪除。</span>
            <button className="btn" onClick={disableAdmin}>
              關閉
            </button>
          </div>
        ) : (
          <div className="row-between">
            <span className="muted">未開啟,修改同刪除操作已鎖定。</span>
            <div className="row">
              <input
                type="password"
                placeholder="管理員密碼"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!enableAdmin(pw)) alert('密碼錯誤');
                  setPw('');
                }}
              >
                開啟
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 情侶設定 */}
      <section className="settings-card">
        <h3 className="section-title">我們</h3>
        <div className="form">
          <div className="field-row">
            <label className="field">
              <span>稱呼 A</span>
              <input
                value={draft.partnerA}
                onChange={(e) => set('partnerA', e.target.value)}
                disabled={!admin}
              />
            </label>
            <label className="field">
              <span>稱呼 B</span>
              <input
                value={draft.partnerB}
                onChange={(e) => set('partnerB', e.target.value)}
                disabled={!admin}
              />
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <span>紀念日</span>
              <input
                type="date"
                value={draft.anniversaryDate}
                onChange={(e) => {
                  const v = e.target.value;
                  setDraft((d) => ({
                    ...d,
                    anniversaryDate: v,
                    unlockCode: codeFromAnniversary(v),
                  }));
                }}
                disabled={!admin}
              />
            </label>
            <label className="field">
              <span>解鎖碼 (4 位)</span>
              <input
                value={draft.unlockCode}
                maxLength={4}
                onChange={(e) =>
                  set('unlockCode', e.target.value.replace(/\D/g, ''))
                }
                disabled={!admin}
              />
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <span>管理員密碼</span>
              <input
                value={draft.adminPassword}
                onChange={(e) => set('adminPassword', e.target.value)}
                disabled={!admin}
              />
            </label>
            <label className="field">
              <span>進度目標 (國家數)</span>
              <input
                type="number"
                value={draft.targetCountries}
                onChange={(e) =>
                  set('targetCountries', Math.max(1, +e.target.value || 1))
                }
                disabled={!admin}
              />
            </label>
          </div>

          <h4 className="muted small" style={{ margin: '6px 0 0' }}>
            首頁封面文字
          </h4>
          <div className="field-row">
            <label className="field">
              <span>標題</span>
              <input
                value={draft.homeCover.title}
                onChange={(e) =>
                  set('homeCover', { ...draft.homeCover, title: e.target.value })
                }
                disabled={!admin}
              />
            </label>
            <label className="field">
              <span>副標題</span>
              <input
                value={draft.homeCover.subtitle}
                onChange={(e) =>
                  set('homeCover', {
                    ...draft.homeCover,
                    subtitle: e.target.value,
                  })
                }
                disabled={!admin}
              />
            </label>
          </div>
          <label className="field">
            <span>封面說明</span>
            <input
              value={draft.homeCover.content}
              onChange={(e) =>
                set('homeCover', { ...draft.homeCover, content: e.target.value })
              }
              disabled={!admin}
            />
          </label>

          {admin && (
            <div className="row-end">
              <button className="btn btn-primary" onClick={onSave}>
                {saved ? '已儲存 ✓' : '儲存設定'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 資料管理 */}
      <section className="settings-card">
        <h3 className="section-title">本地資料</h3>
        <p className="muted small">
          所有資料只存喺呢部機嘅瀏覽器 (IndexedDB)。換機 / 換瀏覽器前記得匯出備份。
        </p>
        {usage && <p className="muted small">已用空間:約 {usage}</p>}
        <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
          <button className="btn" onClick={onExport}>
            ⬇ 匯出備份 (JSON)
          </button>
          <label className="btn">
            ⬆ 匯入 (合併)
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) =>
                e.target.files?.[0] && onImport(e.target.files[0], 'merge')
              }
            />
          </label>
          <label className="btn">
            ⬆ 匯入 (覆蓋)
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) =>
                e.target.files?.[0] && onImport(e.target.files[0], 'replace')
              }
            />
          </label>
          {admin && (
            <button className="btn btn-danger" onClick={onClear}>
              🗑 清除所有資料
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
