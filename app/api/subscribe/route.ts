import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import * as fs from "node:fs";
import { connect } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription.model";

connect();

webPush.setVapidDetails(
	"mailto:hey@example.com",
	process.env.PUBLIC_KEY!,
	process.env.PRIVATE_KEY!
);

// const filePath = "subscriptions.json";
// const rawData = fs.readFileSync(filePath, "utf-8");
// const subscriptions = JSON.parse(rawData);

export async function POST(request: NextRequest) {
	try {
		const { subscription, id } = await request.json();

		console.log(subscription);

		const subscriptionFromDb = await Subscription.findOne({ id });

		if (subscriptionFromDb) {
			return NextResponse.json({
				message: "Subscription already present",
				status: "Success",
			});
		}

		const newSubscription = new Subscription({
			...subscription,
			id,
		});

		await newSubscription.save();

		return NextResponse.json({
			message: "Saved successfully",
			status: "Success",
		});
	} catch (error) {
		console.log(error);
	}
}
