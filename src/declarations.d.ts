// react-simple-maps@3 唔自帶 TypeScript types,呢度做一個最小 shim。
declare module 'react-simple-maps' {
  import type { ComponentType, ReactNode, SVGProps } from 'react';

  export interface GeographyShape {
    rsmKey: string;
    properties: { name: string; [key: string]: unknown };
    [key: string]: unknown;
  }

  export const ComposableMap: ComponentType<{
    projection?: string;
    projectionConfig?: { scale?: number; center?: [number, number] };
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: ReactNode;
  }>;

  export const ZoomableGroup: ComponentType<{
    zoom?: number;
    center?: [number, number];
    minZoom?: number;
    maxZoom?: number;
    onMoveEnd?: (pos: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
  }>;

  export const Geographies: ComponentType<{
    geography: unknown;
    children: (args: { geographies: GeographyShape[] }) => ReactNode;
  }>;

  export const Geography: ComponentType<{
    geography: GeographyShape;
    style?: {
      default?: SVGProps<SVGPathElement>['style'] & Record<string, unknown>;
      hover?: Record<string, unknown>;
      pressed?: Record<string, unknown>;
    };
    onClick?: (event: React.MouseEvent) => void;
  }>;

  export const Marker: ComponentType<{
    coordinates: [number, number];
    onClick?: (event: React.MouseEvent) => void;
    children?: ReactNode;
  }>;
}
