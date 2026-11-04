import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Severity } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSeverityBadgeClass(severity: Severity) {
  switch (severity) {
    case 'critical':
      return 'bg-red-50 text-[#C94C4C] border border-red-200';
    case 'warning':
      return 'bg-amber-50 text-[#D99019] border border-amber-200';
    case 'suggestion':
      return 'bg-blue-50 text-[#4C6EF5] border border-blue-200';
    default:
      return 'bg-slate-100 text-[#69778F] border border-slate-200';
  }
}

export function getCategoryBadgeClass(category: string) {
  switch (category) {
    case 'claim':
      return 'bg-purple-50 text-purple-700 border border-purple-200';
    case 'terminology':
      return 'bg-orange-50 text-orange-700 border border-orange-200';
    case 'tone':
      return 'bg-sky-50 text-sky-700 border border-sky-200';
    case 'visual':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
    case 'accessibility':
      return 'bg-teal-50 text-teal-700 border border-teal-200';
    default:
      return 'bg-slate-50 text-slate-700 border border-slate-200';
  }
}

// Deterministic WCAG Relative Luminance and Contrast Calculator
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}
