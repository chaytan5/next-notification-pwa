"use client";

import { useEffect, useState } from "react";

const Notification2 = () => {
	const [reg, setReg] = useState<ServiceWorkerRegistration | null>(null);
	function checkPermission() {
		if (!("serviceWorker" in navigator)) {
			throw new Error("No support for service worker");
		}

		if (!("Notification" in window)) {
			throw new Error("No support for Notification API");
		}
	}

	async function registerSW() {
		const registration = await navigator.serviceWorker.register("sw.js");
		setReg(registration);
		return registration;
	}

	async function requestPermission() {
		const permission = await Notification.requestPermission();

		if (permission !== "granted") {
			throw new Error("Notification permission not granted");
		}
	}

	useEffect(() => {
		checkPermission();
		registerSW();
		requestPermission();
	}, []);

	return (
		<div className="grid place-items-center h-dvh">
			<button
				className="bg-gray-300 px-4 py-2 rounded hover:opacity-80 transition"
				onClick={() => reg?.showNotification("Hello World")}
			>
				Send Notification
			</button>
		</div>
	);
};

export default Notification2;
