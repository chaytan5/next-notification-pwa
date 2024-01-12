import { defaultCache } from "@serwist/next/browser";
import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";

declare const self: ServiceWorkerGlobalScope & {
	// Change this attribute's name to your `injectionPoint`.
	__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

// Anything random.
const revision = crypto.randomUUID();

self.addEventListener("push", function (event) {
	if (event.data) {
		const data = event.data.json();
		const options = {
			body: data.message,
			icon: "icons/icon-72x72.png",
			vibrate: [100, 50, 100],
		};
		event.waitUntil(self.registration.showNotification(data.title, options));
	}
});

console.log("this is running!");

installSerwist({
	importScripts: [],
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: defaultCache,
});
