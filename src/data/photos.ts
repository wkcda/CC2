import type { PhotoMeta } from '../types';
import { idbGet, idbSet, idbDel, uid, nowIso } from './db';

const photoKey = (id: string) => `photo:${id}`;
const urlCache = new Map<string, string>();

const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.82;

// 用 canvas 縮細圖片,慳 IndexedDB 空間
async function downscale(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/')) return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;

  let { width, height } = bitmap;
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
  width = Math.round(width * scale);
  height = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
  );
  return blob ?? file;
}

export async function addPhoto(file: File): Promise<PhotoMeta> {
  const id = uid();
  const blob = await downscale(file);
  await idbSet(photoKey(id), blob);
  return { id, addedAt: nowIso() };
}

export async function getPhotoBlob(id: string): Promise<Blob | undefined> {
  return idbGet<Blob>(photoKey(id));
}

export async function getPhotoUrl(id: string): Promise<string | undefined> {
  const cached = urlCache.get(id);
  if (cached) return cached;
  const blob = await getPhotoBlob(id);
  if (!blob) return undefined;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}

export async function removePhoto(id: string): Promise<void> {
  const cached = urlCache.get(id);
  if (cached) {
    URL.revokeObjectURL(cached);
    urlCache.delete(id);
  }
  await idbDel(photoKey(id));
}

// 匯出用:Blob -> dataURL
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// 匯入用:dataURL -> Blob
export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return res.blob();
}

export async function setPhotoBlob(id: string, blob: Blob): Promise<void> {
  await idbSet(photoKey(id), blob);
}
