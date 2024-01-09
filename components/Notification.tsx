"use client";

import { useEffect, useState } from "react";

const Notification2 = () => {
	const [reg, setReg] = useState<ServiceWorkerRegistration | null>();
	const [notifPerimission, setNotifPermission] = useState<
		"granted" | "denied" | "default" | null
	>("default");

	function checkPermission() {
		if (!("serviceWorker" in navigator)) {
			throw new Error("No support for service worker");
		}

		if (!("Notification" in window)) {
			throw new Error("No support for Notification API in your device");
		}
	}

	async function registerSW() {
		const registration = await navigator.serviceWorker.register(
			"service-worker.js"
		);
		setReg(registration);
		return registration;
	}

	async function requestPermission() {
		const permission = await Notification.requestPermission();

		setNotifPermission(permission);
		if (permission !== "granted") {
			throw new Error("Notification permission not granted");
		} else {
			reg?.showNotification("Notifications have been enabled");
		}
	}

	useEffect(() => {
		checkPermission();
		registerSW();
	}, []);

	return (
		<div className="grid place-items-center h-dvh">
			{notifPerimission === "default" || notifPerimission === "denied" ? (
				<button
					className="bg-gray-300 px-4 py-2 rounded hover:opacity-80 transition"
					onClick={() => requestPermission()}
				>
					Allow Notifications
				</button>
			) : (
				<button
					className="bg-gray-300 px-4 py-2 rounded hover:opacity-80 transition"
					onClick={() => reg?.showNotification("Hello World")}
				>
					Send Notification
				</button>
			)}
		</div>
	);
};

export default Notification2;
