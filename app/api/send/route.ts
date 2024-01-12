// app.post("/send", (req, res) => {
// 	const { message, title, id } = req.body;
// 	const subscription = subscriptions[id];
// 	const payload = JSON.stringify({ title, message });
// 	webPush
// 		.sendNotification(subscription, payload)
// 		.catch((error) => {
// 			return res.status(400).json({ data: { success: false } });
// 		})
// 		.then((value) => {
// 			return res.status(201).json({ data: { success: true } });
// 		});
// });

import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import * as fs from "node:fs";

const filePath = "subscriptions.json";
const rawData = fs.readFileSync(filePath, "utf-8");
const subscriptions = JSON.parse(rawData);

webPush.setVapidDetails(
	"mailto:hey@example.com",
	process.env.PUBLIC_KEY!,
	process.env.PRIVATE_KEY!
);

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const { message, title, id } = await request.json();
		const subscription = subscriptions[id];
		const payload = JSON.stringify({ title, message });
		webPush
			.sendNotification(subscription, payload)
			.catch((error) => {
				return NextResponse.json({ data: { success: false } });
			})
			.then((value) => {
				return NextResponse.json({ data: { success: true } });
			});
	} catch (error) {
		console.log(error);
	}
}