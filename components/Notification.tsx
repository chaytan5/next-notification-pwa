"use client";

import { urlBase64ToUint8Array } from "@/lib/utils";
import { useEffect, useState } from "react";

const event = new Event("push");
window.dispatchEvent(event);

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

		console.log(permission);
		setNotifPermission(permission);
		if (permission !== "granted") {
			throw new Error("Notification permission not granted");
		} else {
			reg?.showNotification("Notifications have been enabled");
		}
	}

	const saveSubscription = async (subscription: any) => {
		console.log(JSON.stringify(subscription));
		const response = await fetch(
			"http://localhost:3000/api/save-subscription",
			{
				method: "post",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(subscription),
			}
		);

		return response.json();
	};

	async function activateSubscription() {
		console.log("here in activate");
		const registration = await navigator.serviceWorker.ready;
		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				"BEY8-HDPGU44GHHbF95zfqovsjwJrTD4g9G-X85Vvj25BqknU2wEyzoxsNoKc09u0a9aaLf5-C5y_NHrVI9Ytec"
			),
		});
		console.log(subscription);

		const response = await saveSubscription(subscription);
		console.log(response);
	}

	useEffect(() => {
		console.log("here");

		window.addEventListener("push", async (e) => {
			const registration = await navigator.serviceWorker.ready;
			console.log(registration);
			registration?.showNotification("Wohoo!!");
		});
	}, []);

	useEffect(() => {
		checkPermission();
		registerSW();
	}, []);

	return (
		<div className="grid place-items-center h-dvh">
			{notifPerimission === "default" || notifPerimission === "denied" ? (
				<button
					className="bg-gray-300 px-4 py-2 rounded hover:opacity-80 transition"
					onClick={() => {
						requestPermission();
						activateSubscription();
					}}
				>
					Allow Notifications
				</button>
			) : (
				<button
					className="bg-gray-300 px-4 py-2 rounded hover:opacity-80 transition"
					onClick={() => {
						reg?.showNotification("Hello World");
					}}
				>
					Send Notification
				</button>
			)}
		</div>
	);
};

export default Notification2;
