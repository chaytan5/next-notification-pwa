import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import * as fs from "node:fs";
import { connect } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription.model";

connect();

export async function POST(request: NextRequest) {
	try {
		const { subscription, id } = await request.json();

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
