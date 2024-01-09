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
		// const registration = await navigator.serviceWorker.register("sw.js");
		// setReg(registration);
		// return registration;

		const registration = await navigator.serviceWorker.getRegistration();
		setReg(registration ?? null);
		return;
	}

	async function requestPermission() {
		const permission = await Notification.requestPermission();

		if (permission !== "granted") {
			throw new Error("Notification permission not granted");
		}
	}

	// const sendNotification = async () => {
	// 	if (Notification.permission === "granted") {
	// 		showNotification(notification.value);
	// 	} else {
	// 		if (Notification.permission !== "denied") {
	// 			const permission = await Notification.requestPermission();

	// 			if (permission === "granted") {
	// 				showNotification(notification.value);
	// 			}
	// 		}
	// 	}
	// };

	// const showNotification = body => {
	//   const title = 'What PWA Can Do Today';

	//   const payload = {
	//     body
	//   };

	//   if ('showNotification' in reg) {
	//     reg.showNotification(title, payload);
	//   }
	//   else {
	//     new Notification(title, payload);
	//   }
	// }

	useEffect(() => {
		checkPermission();
		registerSW();
		requestPermission();
	}, []);

	console.log(reg);

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
