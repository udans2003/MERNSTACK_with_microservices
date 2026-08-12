import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import medicineroute from "./src/routes/medicineroute.js"
import { connectDB } from "./src/config/db.js"
import { startConsumer } from "./src/rabbitmq/consumer.js"

const app = express()

app.use(express.json())
app.use(cors());

app.use("/api/medicines", medicineroute)

const startServer = async () => {
    try {
        await connectDB();
        await startConsumer();

        app.listen(3000, () => {
            console.log("server started successfully");
        });
    } catch (error) {
        console.error("Failed to start Medicine Service:", error.message);
        process.exit(1);
    }
};

startServer();
