import { useState } from 'react';
import type { Place } from '../../types';
import type { PlaceDraft } from '../../data/storage';
import { makeHistory } from '../../data/storage';
import { addPhoto, removePhoto } from '../../data/photos';
import { countryAt } from '../../lib/geo';
import { PhotoGrid } from './PhotoGrid';
import { useApp } from '../../AppContext';

interface Props {
  // 編輯現有地點
  place?: Place;
  // 由地圖 click 帶入嘅初始座標 / 國家
  initialCoords?: { lng: number; lat: number };
  initialCountry?: string;
  onDone: () => void;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

export function PlaceForm({ place, initialCoords, initialCountry, onDone }: Props) {
  const { add, update, remove } = useApp();
  const [name, setName] = useState(place?.name ?? '');
  const [country, setCountry] = useState(
    place?.country ?? initialCountry ?? '',
  );
  const [lng, setLng] = useState(
    String(place?.coords.lng ?? initialCoords?.lng ?? ''),
  );
  const [lat, setLat] = useState(
    String(place?.coords.lat ?? initialCoords?.lat ?? ''),
  );
  const [date, setDate] = useState(place?.date ?? todayIso());
  const [note, setNote] = useState(place?.note ?? '');
  const [favorite, setFavorite] = useState(place?.favorite ?? false);
  const [photoIds, setPhotoIds] = useState<string[]>(place?.photoIds ?? []);
  const [busy, setBusy] = useState(false);

  const refreshCountry = () => {
    const lo = parseFloat(lng);
    const la = parseFloat(lat);
    if (!isNaN(lo) && !isNaN(la)) {
      const c = countryAt(lo, la);
      if (c) setCountry(c);
    }
  };

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const metas = await Promise.all([...files].map((f) => addPhoto(f)));
    setPhotoIds((prev) => [...prev, ...metas.map((m) => m.id)]);
    setBusy(false);
  };

  const onRemovePhoto = async (id: string) => {
    await removePhoto(id);
    setPhotoIds((prev) => prev.filter((p) => p !== id));
  };

  const submit = async () => {
    const lo = parseFloat(lng);
    const la = parseFloat(lat);
    if (!name.trim() || isNaN(lo) || isNaN(la)) {
      alert('請填寫地點名稱同有效嘅經緯度。');
      return;
    }
    const draft: PlaceDraft = {
      name: name.trim(),
      country: country.trim() || countryAt(lo, la) || '未知',
      coords: { lng: lo, lat: la },
      date,
      note: note.trim(),
      photoIds,
      favorite,
    };

    if (place) {
      const history = [makeHistory('edited', `更新咗「${draft.name}」`)];
      await update(place.id, draft, history);
    } else {
      await add(draft);
    }
    onDone();
  };

  const onDelete = async () => {
    if (!place) return;
    if (!confirm(`確定刪除「${place.name}」?此操作無法復原。`)) return;
    await Promise.all(place.photoIds.map((id) => removePhoto(id)));
    await remove(place.id);
    onDone();
  };

  return (
    <div className="form">
      <label className="field">
        <span>地點名稱</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如:京都、青島"
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>到訪日期</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="field">
          <span>國家 / 地區</span>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="自動偵測"
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>經度 Lng</span>
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            onBlur={refreshCountry}
            placeholder="114.17"
          />
        </label>
        <label className="field">
          <span>緯度 Lat</span>
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            onBlur={refreshCountry}
            placeholder="22.28"
          />
        </label>
      </div>
      <p className="muted small">
        提示:喺地圖按「+ 新增地點」後直接 click 地圖,就會自動填入座標。
      </p>

      <label className="field">
        <span>回憶</span>
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="記低呢一日發生咗咩……"
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
        />
        <span>♥ 加入地點收藏</span>
      </label>

      <div className="field">
        <span>相片</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onUpload(e.target.files)}
        />
        {busy && <p className="muted small">處理相片中…</p>}
        <div style={{ marginTop: 8 }}>
          <PhotoGrid photoIds={photoIds} onRemove={onRemovePhoto} />
        </div>
      </div>

      <div className="row-end" style={{ marginTop: 12 }}>
        {place && (
          <button className="btn btn-danger" onClick={onDelete}>
            刪除
          </button>
        )}
        <button className="btn" onClick={onDone}>
          取消
        </button>
        <button className="btn btn-primary" onClick={submit} disabled={busy}>
          {place ? '儲存' : '新增'}
        </button>
      </div>
    </div>
  );
}
