import { Photo } from './Photo';

interface Props {
  photoIds: string[];
  onRemove?: (id: string) => void;
}

export function PhotoGrid({ photoIds, onRemove }: Props) {
  if (photoIds.length === 0) {
    return <p className="muted">仲未有相片。</p>;
  }
  return (
    <div className="photo-grid">
      {photoIds.map((id) => (
        <div key={id} className="photo-grid-item">
          <Photo photoId={id} />
          {onRemove && (
            <button
              className="photo-del"
              onClick={() => onRemove(id)}
              aria-label="刪除相片"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
