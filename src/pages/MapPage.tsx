import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../AppContext';
import { MapView } from '../components/map/MapView';
import { PlaceCard } from '../components/place/PlaceCard';
import { PlaceForm } from '../components/place/PlaceForm';
import { Modal } from '../components/common/Modal';
import { ProgressStats } from '../components/widgets/ProgressStats';
import { AnniversaryWidget } from '../components/widgets/AnniversaryWidget';
import { RandomPhoto } from '../components/widgets/RandomPhoto';
import { countryAt } from '../lib/geo';
import type { Place } from '../types';

export function MapPage() {
  const { places, admin } = useApp();
  const [params, setParams] = useSearchParams();
  const [addMode, setAddMode] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);
  const [pending, setPending] = useState<{
    coords: { lng: number; lat: number };
    country: string;
  } | null>(null);

  // 由「回憶記錄」深層連結 ?place=<id> 開啟地點卡
  const focusId = params.get('place') ?? undefined;
  useEffect(() => {
    if (focusId) {
      const p = places.find((x) => x.id === focusId);
      if (p) setSelected(p);
    }
  }, [focusId, places]);

  const handleAddAt = (lng: number, lat: number) => {
    setPending({
      coords: { lng: +lng.toFixed(5), lat: +lat.toFixed(5) },
      country: countryAt(lng, lat) ?? '',
    });
    setAddMode(false);
  };

  const closeCard = () => {
    setSelected(null);
    if (focusId) {
      params.delete('place');
      setParams(params, { replace: true });
    }
  };

  return (
    <div className="map-page">
      <div className="map-main">
        <div className="map-toolbar">
          <h2 className="page-title">地圖</h2>
          {admin && (
            <button
              className={`btn ${addMode ? 'btn-active' : 'btn-primary'}`}
              onClick={() => setAddMode((v) => !v)}
            >
              {addMode ? '取消新增' : '＋ 新增地點'}
            </button>
          )}
        </div>

        <MapView
          places={places}
          addMode={addMode}
          onSelectPlace={setSelected}
          onAddAt={handleAddAt}
          focusId={focusId}
        />
      </div>

      <div className="map-sidebar">
        <ProgressStats />
        <AnniversaryWidget />
        <RandomPhoto />
      </div>

      {selected && <PlaceCard place={selected} onClose={closeCard} />}

      {pending && (
        <Modal open onClose={() => setPending(null)} title="新增地點" width={520}>
          <PlaceForm
            initialCoords={pending.coords}
            initialCountry={pending.country}
            onDone={() => setPending(null)}
          />
        </Modal>
      )}
    </div>
  );
}
