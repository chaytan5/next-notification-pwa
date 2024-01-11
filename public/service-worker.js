console.log("service worker successfully started");

//

self.addEventListener("push", (e) => {
	console.log("hey");
	self.registration.showNotification("Wohoo!!", { body: e.data.text() });
});

// const urlBase64ToUint8Array = (base64String) => {
// 	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
// 	const base64 = (base64String + padding)
// 		.replace(/\-/g, "+")
// 		.replace(/_/g, "/");

// 	const rawData = atob(base64);
// 	const outputArray = new Uint8Array(rawData.length);

// 	for (let i = 0; i < rawData.length; ++i) {
// 		outputArray[i] = rawData.charCodeAt(i);
// 	}

// 	return outputArray;
// };

// const saveSubscription = async (subscription) => {
// 	const response = await fetch("http://localhost:3000/api/save-subscription", {
// 		method: "post",
// 		headers: { "Content-type": "application/json" },
// 		body: JSON.stringify(subscription),
// 	});

// 	return response.json();
// };

// self.addEventListener("activate", async (e) => {
// 	// console.log(first);

// 	console.log("here in activate");
// 	const subscription = await self.registration.pushManager.subscribe({
// 		userVisibleOnly: true,
// 		applicationServerKey: urlBase64ToUint8Array(
// 			"BEY8-HDPGU44GHHbF95zfqovsjwJrTD4g9G-X85Vvj25BqknU2wEyzoxsNoKc09u0a9aaLf5-C5y_NHrVI9Ytec"
// 		),
// 	});
// 	console.log(subscription);

// 	const response = await saveSubscription(subscription);
// 	console.log(response);
// });

//

self.addEventListener("activate", async (e) => {
	const subscription = await self.registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: "",
	});
	console.log(subscription);
});

/**
 * 
 * 
Public Key:
BEY8-HDPGU44GHHbF95zfqovsjwJrTD4g9G-X85Vvj25BqknU2wEyzoxsNoKc09u0a9aaLf5-C5y_NHrVI9Ytec

Private Key:
UkZq9E-kLWs46XX-oxQKGm8EN2wYWF10n8ynEnjfCe4

 */
