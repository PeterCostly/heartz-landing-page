/**
 * Application routing configuration for HEARTz.
 * Defined according to DOMAIN_HEARTZ_APP_HANDOFF_2026-09-23.md
 * and 07_ANTIGRAVITY_LINKS_AND_COPY_HANDOFF.md.
 * 
 * Production always targets the custom app domain. Local previews may override
 * it with PUBLIC_APP_URL when testing another app origin.
 */

export const APP_ROUTES = {
  home: '/',
  converter: '/converter',
  frequencyLab: '/frequency-lab',
  guided: '/guided',
  library: '/library',
  learn: '/learn',
  login: '/login',
  signup: '/signup',
} as const;

export type AppRouteKey = keyof typeof APP_ROUTES;

export const DEFAULT_APP_ORIGIN = 'https://app.heartz.app';

export function getAppOrigin(): string {
  const origin = import.meta.env.DEV
    ? import.meta.env.PUBLIC_APP_URL || DEFAULT_APP_ORIGIN
    : DEFAULT_APP_ORIGIN;
  return origin.replace(/\/+$/, '');
}

export function getAppUrl(route: AppRouteKey = 'home'): string {
  const origin = getAppOrigin();
  const path = APP_ROUTES[route] || '/';
  return `${origin}${path}`;
}
