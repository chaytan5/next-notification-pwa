import dynamic from "next/dynamic";

import Notification from "@/components/Notification";

const DynamicNotification = dynamic(() => import("@/components/Notification"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

// import { useState } from "react";

// async function notifyUser(
// 	notificationText = "Thanks for enabling notifications!"
// ) {
// 	if (!("Notification" in window)) {
// 		alert("Browser does not support notifications.");
// 	} else if (window.Notification.permission === "granted") {
// 		const notification = new Notification(notificationText);
// 	} else if (window.Notification.permission !== "denied") {
// 		await window.Notification.requestPermission().then((permission) => {
// 			if (permission === "granted") {
// 				const notification = new Notification(notificationText);
// 			}
// 		});
// 	}
// }

export default function Home() {
	return (
		<main>
			<DynamicNotification />
		</main>
	);
}
