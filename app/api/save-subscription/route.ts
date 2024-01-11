import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import * as fs from "node:fs";

// Function to read the array from a file
export const readArrayFromFile = (filePath: any) => {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		return JSON.parse(data);
	} catch (error) {
		// If the file doesn't exist or is empty, return an empty array
		return [];
	}
};

const filePath = "data.json";
let dataArray = readArrayFromFile(filePath);

// Function to write the array to a file
export const writeArrayToFile = (filePath: any, dataArray: any) => {
	const data = JSON.stringify(dataArray, null, 2);
	fs.writeFileSync(filePath, data, "utf8");
};

connect();

const apiKeys = {
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
	"mailto:harshilia@gmail.com",
	apiKeys.publicKey!,
	apiKeys.privateKey!
);

export async function POST(request: NextRequest) {
	try {
		// Write the updated array back to the file

		// Now dataArray contains the provided data
		dataArray.push(await request.json());

		writeArrayToFile(filePath, dataArray);

		console.log(dataArray);

		return NextResponse.json({
			message: "Saved successfully",
			status: "Success",
		});
	} catch (error) {
		console.log(error);
	}
}

export async function GET(request: NextRequest) {
	try {
		console.log("here in get req");
		console.log(dataArray);
		webpush.sendNotification(dataArray[0], "Hey there!");

		return NextResponse.json({
			message: "Message sent to push service",
			status: "Success",
		});
	} catch (error: any) {
		console.log(error.message);
	}
}
