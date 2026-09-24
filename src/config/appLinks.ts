/**
 * Application routing configuration for HEARTz.
 * Defined according to DOMAIN_HEARTZ_APP_HANDOFF_2026-09-23.md
 * and 07_ANTIGRAVITY_LINKS_AND_COPY_HANDOFF.md.
 * 
 * Configurable application origin via PUBLIC_APP_URL.
 * Default fallback to tested workers.dev origin until custom domain app.heartz.app is fully active.
 */

export const APP_ROUTES = {
  home: '/',
  converter: '/converter',
  frequencyLab: '/frequency-lab',
  guided: '/guided',
  library: '/library',
  learn: '/learn',
} as const;

export type AppRouteKey = keyof typeof APP_ROUTES;

export const DEFAULT_APP_ORIGIN = 'https://heartz.pk-1ca.workers.dev';

export function getAppOrigin(): string {
  const metaEnv = typeof import.meta !== 'undefined' && (import.meta as any).env;
  const procEnv = typeof globalThis !== 'undefined' && (globalThis as any).process?.env;
  const envUrl = metaEnv?.PUBLIC_APP_URL || procEnv?.PUBLIC_APP_URL || DEFAULT_APP_ORIGIN;

  return String(envUrl).replace(/\/+$/, '');
}

export function getAppUrl(route: AppRouteKey = 'home'): string {
  const origin = getAppOrigin();
  const path = APP_ROUTES[route] || '/';
  return `${origin}${path}`;
}
