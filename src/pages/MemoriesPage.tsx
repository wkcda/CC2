import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Tabs } from '../components/common/Tabs';
import { Photo } from '../components/place/Photo';
import { formatDate, groupByMonth } from '../lib/date';
import type { MemoryView, Place } from '../types';

export function MemoriesPage() {
  const { places, settings } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState<MemoryView>(settings.defaultMemoryView);

  const cityCount = new Set(places.map((p) => p.name)).size;

  const timelineGroups = groupByMonth(places, (p) => p.date);
  const byCountry = new Map<string, Place[]>();
  places.forEach((p) => {
    const list = byCountry.get(p.country) ?? [];
    list.push(p);
    byCountry.set(p.country, list);
  });

  const Card = ({ p }: { p: Place }) => (
    <div className="memory-card">
      <Photo photoId={p.photoIds[0]} className="memory-thumb" alt={p.name} />
      <div className="memory-body">
        <div className="memory-card-head">
          <strong>{p.name}</strong>
          <span className="muted small">{formatDate(p.date)}</span>
        </div>
        <p className="memory-note">{p.note || '（仲未寫低回憶）'}</p>
        <button
          className="link-btn"
          onClick={() => navigate(`/map?place=${p.id}`)}
        >
          📍 回到地圖
        </button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2 className="page-title">回憶記錄</h2>
          <p className="muted small">
            {view === 'timeline' ? '按時間從新到舊排列' : '按城市分組'} ·{' '}
            {places.length} 條 · {cityCount} 城
          </p>
        </div>
        <Tabs
          active={view}
          onChange={setView}
          tabs={[
            { key: 'city', label: '城市' },
            { key: 'timeline', label: '時間線' },
          ]}
        />
      </div>

      {places.length === 0 && (
        <p className="muted">仲未有回憶,去地圖新增第一個地點啦 ♥</p>
      )}

      {view === 'timeline' &&
        timelineGroups.map((g) => (
          <section key={g.label} className="timeline-group">
            <h3 className="timeline-label">
              <span className="dot" /> {g.label}
            </h3>
            <div className="memory-grid">
              {g.items.map((p) => (
                <Card key={p.id} p={p} />
              ))}
            </div>
          </section>
        ))}

      {view === 'city' &&
        [...byCountry.entries()].map(([country, list]) => (
          <section key={country} className="timeline-group">
            <h3 className="timeline-label">
              <span className="dot" /> {country}
            </h3>
            <div className="memory-grid">
              {list.map((p) => (
                <Card key={p.id} p={p} />
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
