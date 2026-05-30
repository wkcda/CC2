import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Photo } from '../components/place/Photo';
import { formatDate } from '../lib/date';

export function SavedPlacesPage() {
  const { places } = useApp();
  const navigate = useNavigate();
  const saved = places.filter((p) => p.favorite);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h2 className="page-title">地點收藏</h2>
          <p className="muted small">標咗 ♥ 嘅地方 · {saved.length} 個</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <p className="muted">仲未有收藏。喺地點加上 ♥ 就會出現喺呢度。</p>
      ) : (
        <div className="memory-grid">
          {saved.map((p) => (
            <div key={p.id} className="memory-card">
              <Photo photoId={p.photoIds[0]} className="memory-thumb" alt={p.name} />
              <div className="memory-body">
                <div className="memory-card-head">
                  <strong>♥ {p.name}</strong>
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
          ))}
        </div>
      )}
    </div>
  );
}
