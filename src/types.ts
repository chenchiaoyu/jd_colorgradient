export interface Shade {
  key: string;
  label: string;
  hex: string;
  depthLabel: string;
}

export interface Palette {
  key: string;
  name: string;
  sub: string;
  hex: string;
  phrase: string;
  mood: string;
  shades: Shade[];
  items: string[];
}

export interface Option {
  key: string;
  name: string;
  sub?: string;
  phrase?: string;
}

export interface GradientState {
  projectName: string;
  previewText: string;
  textColorMode: 'violet_deep' | 'sky_deep' | 'lake_deep' | 'moss_deep' | 'verdant_deep' | 'earth_deep' | 'rose700' | 'rose800' | 'rose900' | 'gray700' | 'gray900';
  color1Group: string;
  color1Shade: string;
  color2Group: string;
  color2Shade: string;
  gradientType: 'linear' | 'radial' | 'conic';
  angle: number;
  radialPercent: number;
  textFontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  textFontFamily: 'serif' | 'sans';
}
