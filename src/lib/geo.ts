import { geoMercator, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import topo from '../assets/geo/countries-50m.json';

// react-simple-maps 直接食 TopoJSON,但我哋要喺 client 做 point-in-polygon
// (geoContains) 同 click -> 經緯度,所以自己 parse 一份。
type Topology = Parameters<typeof feature>[0];

export const countries: FeatureCollection<Geometry, { name: string }> = feature(
  topo as unknown as Topology,
  // @ts-expect-error topojson objects key 喺 runtime 存在
  (topo as unknown as { objects: { countries: unknown } }).objects.countries,
) as unknown as FeatureCollection<Geometry, { name: string }>;

// ComposableMap 預設 viewBox 尺寸
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 600;

// 地圖投影設定 — 框住東亞 / 東南亞 (香港、中國、日本、東南亞)
export const PROJECTION_CONFIG = {
  scale: 620,
  center: [114, 21] as [number, number],
};

function baseProjection() {
  return geoMercator()
    .scale(PROJECTION_CONFIG.scale)
    .center(PROJECTION_CONFIG.center)
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
}

/**
 * 將一個 click (螢幕座標) 換算成 [lng, lat],已考慮 ZoomableGroup 嘅
 * 平移 (center) 同縮放 (zoom)。
 */
export function screenToLngLat(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
  center: [number, number],
  zoom: number,
): [number, number] | null {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const loc = pt.matrixTransform(ctm.inverse()); // 換算到 viewBox (800x600) 座標

  const P = baseProjection();
  const pc = P(center);
  if (!pc) return null;
  const px = pc[0] + (loc.x - MAP_WIDTH / 2) / zoom;
  const py = pc[1] + (loc.y - MAP_HEIGHT / 2) / zoom;
  const inv = P.invert?.([px, py]);
  return inv ? [inv[0], inv[1]] : null;
}

// 用經緯度搵返係邊個國家 (auto 填 country 欄位)
export function countryAt(lng: number, lat: number): string | null {
  const hit = countries.features.find((f) =>
    geoContains(f as Feature, [lng, lat]),
  );
  return hit?.properties?.name ?? null;
}
