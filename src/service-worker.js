/* eslint-env serviceworker */
import { manifest, version } from '@parcel/service-worker'

async function install () {
  const cache = await caches.open(version)
  await cache.addAll([...new Set(manifest)])
}
self.addEventListener('install', (e) => e.waitUntil(install()))

async function activate () {
  const keys = await caches.keys()
  await Promise.all(
    keys.map((key) => key !== version && caches.delete(key))
  )
}
self.addEventListener('activate', (e) => e.waitUntil(activate()))

async function fetchResponse (e) {
  const r = await caches.match(e.request)
  if (r) { return r }

  const response = await fetch(e.request)
  return response
}
self.addEventListener('fetch', (e) => {
  e.respondWith(fetchResponse(e))
})
