import { useObjectUrl } from '../../hooks/useObjectUrl';

interface Props {
  photoId?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

// 由 photoId 顯示圖片;未有圖時顯示佔位
export function Photo({ photoId, alt = '', className, onClick }: Props) {
  const url = useObjectUrl(photoId);
  if (!url) {
    return (
      <div className={`photo-placeholder ${className ?? ''}`} onClick={onClick}>
        <span>📷</span>
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      className={`photo-img ${className ?? ''}`}
      onClick={onClick}
      loading="lazy"
    />
  );
}
