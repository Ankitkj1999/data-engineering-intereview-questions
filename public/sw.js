const CACHE_NAME = "de-questions-v1";
const APP_SHELL = ["/manifest.webmanifest", "/icons/pwa-192.png", "/icons/pwa-512.png"];

self.addEventListener("install", (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
			.then(() => self.clients.claim())
	);
});

// Network-first so docs content never gets stuck stale; cache is only a fallback for offline access.
self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				const copy = response.clone();
				caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
				return response;
			})
			.catch(() => caches.match(event.request))
	);
});
