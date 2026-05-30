import { useEffect, useState } from 'react';
import { idbGet, idbSet, uid, nowIso } from '../data/db';
import { useApp } from '../AppContext';
import { formatDate } from '../lib/date';

interface Capsule {
  id: string;
  title: string;
  message: string;
  openDate: string; // YYYY-MM-DD
  createdAt: string;
}

const CAPSULES_KEY = 'capsules';

export function TimeCapsulePage() {
  const { admin } = useApp();
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [openDate, setOpenDate] = useState('');

  useEffect(() => {
    void idbGet<Capsule[]>(CAPSULES_KEY).then((c) => setCapsules(c ?? []));
  }, []);

  const persist = async (next: Capsule[]) => {
    setCapsules(next);
    await idbSet(CAPSULES_KEY, next);
  };

  const add = async () => {
    if (!title.trim() || !openDate) {
      alert('請填寫標題同開啟日期。');
      return;
    }
    const c: Capsule = {
      id: uid(),
      title: title.trim(),
      message: message.trim(),
      openDate,
      createdAt: nowIso(),
    };
    await persist([c, ...capsules]);
    setTitle('');
    setMessage('');
    setOpenDate('');
  };

  const remove = async (id: string) => {
    if (!confirm('刪除呢個時光寶盒?')) return;
    await persist(capsules.filter((c) => c.id !== id));
  };

  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <div className="page">
      <h2 className="page-title">時光寶盒</h2>
      <p className="muted small">
        寫低一封信,設定一個未來嘅日子先可以打開 🎁
      </p>

      {admin && (
        <div className="widget" style={{ maxWidth: 520, marginBottom: 20 }}>
          <div className="widget-head">
            <span>新增時光寶盒</span>
          </div>
          <div className="form">
            <label className="field">
              <span>標題</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="field">
              <span>內容</span>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <label className="field">
              <span>開啟日期</span>
              <input
                type="date"
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
              />
            </label>
            <div className="row-end">
              <button className="btn btn-primary" onClick={add}>
                封存
              </button>
            </div>
          </div>
        </div>
      )}

      {capsules.length === 0 && <p className="muted">仲未有時光寶盒。</p>}

      <div className="memory-grid">
        {capsules.map((c) => {
          const locked = c.openDate > todayIso;
          return (
            <div key={c.id} className={`capsule ${locked ? 'capsule-locked' : ''}`}>
              <div className="capsule-head">
                <strong>{c.title}</strong>
                {admin && (
                  <button className="icon-btn" onClick={() => remove(c.id)}>
                    ✕
                  </button>
                )}
              </div>
              {locked ? (
                <div className="capsule-locked-body">
                  🔒 {formatDate(c.openDate)} 先可以打開
                </div>
              ) : (
                <p className="memory-note">{c.message || '（無內容）'}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
