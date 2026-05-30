import { useState } from 'react';
import { useApp } from '../AppContext';
import { setUnlocked } from '../data/settings';

interface Props {
  onUnlock: () => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'del'];

export function LockScreen({ onUnlock }: Props) {
  const { settings } = useApp();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const press = (k: string) => {
    setError(false);
    if (k === 'clear') return setCode('');
    if (k === 'del') return setCode((c) => c.slice(0, -1));
    if (code.length >= 4) return;

    const next = code + k;
    setCode(next);
    if (next.length === 4) {
      if (next === settings.unlockCode) {
        setUnlocked(true);
        setTimeout(onUnlock, 150);
      } else {
        setError(true);
        setTimeout(() => setCode(''), 500);
      }
    }
  };

  return (
    <div className="lock-screen">
      <div className="lock-card">
        <div className="lock-heart">♥</div>
        <h1 className="lock-title">{settings.loginCover.title}</h1>
        <p className="muted small lock-sub">{settings.loginCover.subtitle}</p>

        <div className={`code-dots ${error ? 'shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`dot-cell ${i < code.length ? 'filled' : ''}`} />
          ))}
        </div>

        <div className="keypad">
          {KEYS.map((k) => (
            <button
              key={k}
              className={`key ${k === 'clear' || k === 'del' ? 'key-fn' : ''}`}
              onClick={() => press(k)}
            >
              {k === 'clear' ? '清空' : k === 'del' ? '⌫' : k}
            </button>
          ))}
        </div>

        <p className="muted small lock-hint">
          提示:解鎖碼預設係紀念日嘅月日 (MMDD)
        </p>
      </div>
    </div>
  );
}
