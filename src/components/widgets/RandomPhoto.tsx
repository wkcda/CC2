import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../AppContext';
import { Photo } from '../place/Photo';
import { formatDate } from '../../lib/date';

export function RandomPhoto() {
  const { places } = useApp();

  // 攤平所有 (photoId, place) 配對
  const pool = useMemo(
    () =>
      places.flatMap((p) =>
        p.photoIds.map((photoId) => ({ photoId, place: p })),
      ),
    [places],
  );

  const [idx, setIdx] = useState(0);

  const shuffle = () => {
    if (pool.length > 0) setIdx(Math.floor(Math.random() * pool.length));
  };

  useEffect(() => {
    shuffle();
    const t = setInterval(shuffle, 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length]);

  const current = pool[idx];

  return (
    <div className="widget">
      <div className="widget-head">
        <span>隨機相框</span>
        <button className="icon-btn" onClick={shuffle} aria-label="換一張">
          ↻
        </button>
      </div>
      {current ? (
        <>
          <Photo
            photoId={current.photoId}
            className="frame-photo"
            alt={current.place.name}
          />
          <div className="frame-cap">
            <span className="dot" /> {current.place.name}
            <span className="muted small"> · {formatDate(current.place.date)}</span>
          </div>
          {current.place.note && (
            <p className="muted small frame-note">{current.place.note}</p>
          )}
        </>
      ) : (
        <p className="muted small">上載第一張相片,就會喺呢度隨機回放 ♥</p>
      )}
    </div>
  );
}
