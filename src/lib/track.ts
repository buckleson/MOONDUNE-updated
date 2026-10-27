type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

/**
 * Conversion events, pushed to `window.dataLayer` when a tag manager is installed.
 * No-op otherwise, so no third-party script ships with the site.
 */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  ;(window as DataLayerWindow).dataLayer?.push({ event, ...params })
}
