import { GradientState } from './types';
import { PALETTES } from './data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorHex(groupKey: string, shadeKey: string): string {
  const palette = PALETTES.find(p => p.key === groupKey) || PALETTES[0];
  const shade = palette.shades.find(s => s.key === shadeKey) || palette.shades[0];
  return shade ? shade.hex : palette.hex;
}

export function generateGradientCSS(state: GradientState): string {
  const c1 = getColorHex(state.color1Group, state.color1Shade);
  const c2 = getColorHex(state.color2Group, state.color2Shade);

  if (state.gradientType === 'linear') {
    return `linear-gradient(${state.angle}deg, ${c1}, ${c2})`;
  } else if (state.gradientType === 'radial') {
    return `radial-gradient(circle at 50% ${state.radialPercent}%, ${c1}, ${c2})`;
  } else {
    return `conic-gradient(from ${state.angle}deg at 50% 50%, ${c1}, ${c2}, ${c1})`;
  }
}
