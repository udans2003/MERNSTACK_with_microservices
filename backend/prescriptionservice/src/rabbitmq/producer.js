import amqp from "amqplib";
import { getChannel } from "./rabbitmqConnection.js";

const QUEUE_NAME = "medicine_queue";
const RABBITMQ_URL = "amqp://localhost:5672";

export const publishMedicineEvent = async (message) => {
    try {
        const channel = getChannel();

        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(message)),
            {
                persistent: true
            }
        );

        console.log("Prescription Service sent:");
        console.log(message);

    } catch (error) {
        console.error("Producer error:", error);
        throw error;
    }
};