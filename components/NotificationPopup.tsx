"use client";

import { useState } from "react";

async function notifyUser(
	notificationText = "Thanks for enabling notifications!"
) {
	if (!("Notificaion" in window)) {
		alert("Browser does not support notifications.");
	} else if (Notification.permission === "granted") {
		const notification = new Notification(notificationText);
	} else if (Notification.permission !== "denied") {
		await Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				const notification = new Notification(notificationText);
			}
		});
	}
}

const NotificationPopup = () => {
	const [userResponded, setUserResponded] = useState(false);

	const condition = !(Notification.permission === "granted") && !userResponded;

	return condition ? (
		<div>NotificationPop</div>
	) : Notification.permission === "granted" ? (
		<div>granted</div>
	) : (
		<h1>Notifications disabled</h1>
	);
};

export default NotificationPopup;
