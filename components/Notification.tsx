"use client";
import React, { useState } from "react";

async function notifyUser(
	notificationText = "Thanks for enabling notifications!"
) {
	if (!("Notification" in window)) {
		alert("Browser does not support notifications.");
	} else if (window.Notification.permission === "granted") {
		const notification = new window.Notification(notificationText);
	} else if (window.Notification.permission !== "denied") {
		await window.Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				const notification = new window.Notification(notificationText);
			}
		});
	}
}

const Notification = () => {
	const [userResponded, setUserResponded] = useState(false);

	async function enableNotifs() {
		await notifyUser();
		setUserResponded(true);
	}

	function disableNotifs() {
		setUserResponded(true);
	}

	return !(window.Notification.permission === "granted") && !userResponded ? (
		<div className="px-8 py-4 w-fit mx-auto space-y-4">
			<div className="text-xl">Would you like to enable notifications?</div>

			<div className="flex gap-4 justify-center">
				<button
					className="px-4 py-2 rounded border border-slate-50 bg-green-200"
					onClick={() => enableNotifs()}
				>
					Sure!
				</button>
				<button
					className="px-4 py-2 border border-slate-50 bg-red-200 rounded"
					onClick={() => disableNotifs()}
				>
					Nope
				</button>
			</div>
		</div>
	) : window.Notification.permission === "granted" ? (
		<div className="w-full h-dvh grid place-items-center">
			<button
				className="px-8 py-2 bg-gray-200 rounded transition hover:bg-gray-300"
				onClick={() => notifyUser("This is a sample notification")}
			>
				Send Notification
			</button>
		</div>
	) : (
		<h1>Notifications disabled</h1>
	);
};

export default Notification;
