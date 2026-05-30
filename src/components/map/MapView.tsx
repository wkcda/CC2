import { useRef, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import type { Place } from '../../types';
import {
  countries,
  PROJECTION_CONFIG,
  MAP_WIDTH,
  MAP_HEIGHT,
  screenToLngLat,
} from '../../lib/geo';

interface Props {
  places: Place[];
  addMode: boolean;
  onSelectPlace: (place: Place) => void;
  onAddAt: (lng: number, lat: number) => void;
  focusId?: string;
}

const BASE_FILL = '#f3ece9';
const LIT_FILL = '#f6c9d4';
const STROKE = '#e3d6d2';

export function MapView({
  places,
  addMode,
  onSelectPlace,
  onAddAt,
  focusId,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<[number, number]>(
    PROJECTION_CONFIG.center,
  );
  const [zoom, setZoom] = useState(1);

  const litCountries = new Set(places.map((p) => p.country));

  const handleMapClick = (e: React.MouseEvent) => {
    if (!addMode) return;
    const svg = wrapRef.current?.querySelector('svg');
    if (!svg) return;
    const lngLat = screenToLngLat(
      svg as SVGSVGElement,
      e.clientX,
      e.clientY,
      center,
      zoom,
    );
    if (lngLat) onAddAt(lngLat[0], lngLat[1]);
  };

  return (
    <div
      ref={wrapRef}
      className={`map-wrap ${addMode ? 'map-add-mode' : ''}`}
      onClick={handleMapClick}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: PROJECTION_CONFIG.scale,
          center: PROJECTION_CONFIG.center,
        }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={0.6}
          maxZoom={12}
          onMoveEnd={({ coordinates, zoom: z }) => {
            setCenter(coordinates as [number, number]);
            setZoom(z);
          }}
        >
          <Geographies geography={countries}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const lit = litCountries.has(geo.properties.name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: lit ? LIT_FILL : BASE_FILL,
                        stroke: STROKE,
                        strokeWidth: 0.4,
                        outline: 'none',
                      },
                      hover: {
                        fill: lit ? '#f2b6c5' : '#ece2de',
                        outline: 'none',
                      },
                      pressed: { fill: '#f2b6c5', outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {places.map((p) => (
            <Marker
              key={p.id}
              coordinates={[p.coords.lng, p.coords.lat]}
              onClick={(e) => {
                e.stopPropagation();
                if (!addMode) onSelectPlace(p);
              }}
            >
              <g
                className={`pin ${focusId === p.id ? 'pin-focus' : ''}`}
                transform="translate(-7, -14)"
              >
                <path
                  d="M7 0C3.1 0 0 3.1 0 7c0 5 7 11 7 11s7-6 7-11C14 3.1 10.9 0 7 0z"
                  fill={p.favorite ? '#e8638a' : '#f2849f'}
                  stroke="#fff"
                  strokeWidth={1}
                />
                <circle cx="7" cy="7" r="2.6" fill="#fff" />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <div className="map-zoom-ctrl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setZoom((z) => Math.min(12, z * 1.5))}>＋</button>
        <button onClick={() => setZoom((z) => Math.max(0.6, z / 1.5))}>－</button>
        <button
          onClick={() => {
            setZoom(1);
            setCenter(PROJECTION_CONFIG.center);
          }}
        >
          ↺
        </button>
      </div>

      {addMode && (
        <div className="map-add-hint" onClick={(e) => e.stopPropagation()}>
          🖱️ 喺地圖上 click 一個位置嚟新增地點
        </div>
      )}
    </div>
  );
}
