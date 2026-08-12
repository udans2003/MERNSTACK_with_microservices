import mongoose from "mongoose";

const mongodbURI = "mongodb+srv://admin:12345@cluster0.kvmvkmy.mongodb.net/?appName=Cluster0";

export const connectDB = async () => {
	try {
		await mongoose.connect(mongodbURI);
		console.log("Mongodb Connected Successfuly");
	} catch (error) {
		console.error("MongoDB connection failed:", error.message);
		process.exit(1);
	}
};
