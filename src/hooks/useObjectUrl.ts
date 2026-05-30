import { useEffect, useState } from 'react';
import { getPhotoUrl } from '../data/photos';

// 由 photoId 攞返可顯示嘅 object URL
export function useObjectUrl(photoId: string | undefined): string | undefined {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let active = true;
    if (!photoId) {
      setUrl(undefined);
      return;
    }
    void getPhotoUrl(photoId).then((u) => {
      if (active) setUrl(u);
    });
    return () => {
      active = false;
    };
  }, [photoId]);

  return url;
}
