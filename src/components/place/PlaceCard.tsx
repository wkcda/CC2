import { useState } from 'react';
import type { Place } from '../../types';
import { Modal } from '../common/Modal';
import { Tabs } from '../common/Tabs';
import { PhotoGrid } from './PhotoGrid';
import { Photo } from './Photo';
import { PlaceForm } from './PlaceForm';
import { formatDate } from '../../lib/date';
import { useApp } from '../../AppContext';

type Tab = 'memory' | 'album' | 'history';

interface Props {
  place: Place;
  onClose: () => void;
}

export function PlaceCard({ place, onClose }: Props) {
  const { admin } = useApp();
  const [tab, setTab] = useState<Tab>('memory');
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Modal open onClose={onClose} title={`編輯 · ${place.name}`} width={520}>
        <PlaceForm place={place} onDone={onClose} />
      </Modal>
    );
  }

  return (
    <Modal open onClose={onClose} width={460}>
      <div className="place-card-head">
        <div>
          <h3 className="place-title">
            <span className="dot" /> {place.name}
          </h3>
          <p className="muted small">
            {place.country} · {formatDate(place.date)}
          </p>
        </div>
        {admin ? (
          <button className="btn btn-sm" onClick={() => setEditing(true)}>
            編輯
          </button>
        ) : (
          <span className="muted small">🔒 管理員鎖定</span>
        )}
      </div>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { key: 'memory', label: '回憶' },
          { key: 'album', label: '相簿' },
          { key: 'history', label: '歷史' },
        ]}
      />

      <div className="place-card-body">
        {tab === 'memory' && (
          <div>
            {place.photoIds[0] && (
              <Photo
                photoId={place.photoIds[0]}
                className="hero-photo"
                alt={place.name}
              />
            )}
            <p className="note">{place.note || '（仲未寫低回憶）'}</p>
          </div>
        )}

        {tab === 'album' && <PhotoGrid photoIds={place.photoIds} />}

        {tab === 'history' && (
          <ul className="history-list">
            {place.history.map((h) => (
              <li key={h.id}>
                <span className="muted small">
                  {new Date(h.at).toLocaleString('zh-HK')}
                </span>
                <span>{h.summary}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
