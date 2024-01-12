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

// Function to write the array to a file
export const writeArrayToFile = (filePath: any, dataArray: any) => {
	const data = JSON.stringify(dataArray, null, 2);
	fs.writeFileSync(filePath, data, "utf8");
};
