import express from "express";
import cors from "cors";

import { connectDB } from "./src/config/db.js";
import prescriptionRoutes from "./src/routes/prescriptionRoute.js";
import { connectRabbitMQ } from "./src/rabbitmq/rabbitmqConnection.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // // Connect to RabbitMQ
        await connectRabbitMQ();

        // Prescription routes
        app.use("/api/prescriptions", prescriptionRoutes);

        // Start server
        app.listen(PORT, () => {
            console.log(
                `Prescription Service running on port ${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "Failed to start Prescription Service:",
            error.message
        );

        process.exit(1);
    }
};

startServer();