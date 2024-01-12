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
import { connect } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription.model";

// const filePath = "subscriptions.json";
// const rawData = fs.readFileSync(filePath, "utf-8");
// const subscriptions = JSON.parse(rawData);

connect();

webPush.setVapidDetails(
	"mailto:hey@example.com",
	process.env.PUBLIC_KEY!,
	process.env.PRIVATE_KEY!
);

export async function POST(request: NextRequest) {
	try {
		const { message, title, id } = await request.json();

		const subscription = await Subscription.findOne({ id });

		if (!subscription) {
			return NextResponse.json({
				message: "Subscribe to notifications first",
				status: "Error",
			});
		}

		const payload = JSON.stringify({ title, message });

		webPush
			.sendNotification(subscription, payload)
			.catch((error) => {
				return NextResponse.json({ data: { success: false } });
			})
			.then((value) => {
				return NextResponse.json({ data: { success: true } });
			})
			.finally(() => NextResponse.json({ data: { success: true } }));

		return NextResponse.json({
			message: "Notif sent successfully",
			status: "Success",
		});
	} catch (error) {
		console.log(error);
	}
}
