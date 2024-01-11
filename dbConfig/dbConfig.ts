import mongoose from "mongoose";

export async function connect() {
	try {
		if (process.env.MONGO_URI) {
			mongoose.connect(process.env.MONGO_URI);
			const connection = mongoose.connection;

			connection.on("connected", () => {
				console.log("MongoDB connected succesfully");
			});

			connection.on("error", (error) => {
				console.log(
					"MongoDB connection error. Make sure MongoDB is running " + error
				);
				process.exit();
			});
		} else {
			console.log("ENV file not loaded correctly");
		}
	} catch (error) {
		console.log("Something went wrong");
		console.log(error);
	}
}
