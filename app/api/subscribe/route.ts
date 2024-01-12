import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import * as fs from "node:fs";

webPush.setVapidDetails(
	"mailto:hey@example.com",
	process.env.PUBLIC_KEY!,
	process.env.PRIVATE_KEY!
);

const filePath = "subscriptions.json";
const rawData = fs.readFileSync(filePath, "utf-8");
const subscriptions = JSON.parse(rawData);

export async function POST(request: NextRequest) {
	try {
		const { subscription, id } = await request.json();

		console.log(subscription);
		subscriptions[id] = subscription;

		const updatedData = JSON.stringify(subscriptions, null, 2);

		// Write the updated content back to the file
		fs.writeFileSync(filePath, updatedData);

		return NextResponse.json({
			message: "Saved successfully",
			status: "Success",
		});
	} catch (error) {
		console.log(error);
	}
}
