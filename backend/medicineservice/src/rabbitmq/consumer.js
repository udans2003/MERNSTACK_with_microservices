import medicineRepository from "../repositories/medicinerepository.js";
import {
    connectRabbitMQ
} from "./rabbitmqconnection.js";

const QUEUE_NAME = "medicine_queue";

export const startConsumer = async () => {

    try {

        const channel = await connectRabbitMQ();

        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        console.log(
            `Waiting for messages from ${QUEUE_NAME}...`
        );

        channel.consume(
            QUEUE_NAME,
            async (message) => {

                if (message === null) {
                    return;
                }

                try {

                    const data = JSON.parse(
                        message.content.toString()
                    );

                    const medicineCode =
                        data.medicineCode;

                    const quantity =
                        Number(data.quantity);

                    if (
                        !medicineCode ||
                        !Number.isFinite(quantity) ||
                        quantity <= 0
                    ) {
                        throw new Error(
                            "Invalid medicine message payload"
                        );
                    }

                    console.log(
                        "Message received:"
                    );

                    console.log(data);

                    const updatedMedicine =
                        await medicineRepository
                            .decrementStockByCode(
                                medicineCode,
                                quantity
                            );

                    if (!updatedMedicine) {

                        console.warn(
                            `Medicine not updated for ${medicineCode}. It may not exist or stock is too low.`
                        );

                        channel.nack(
                            message,
                            false,
                            false
                        );

                        return;
                    }

                    console.log(
                        `Updated stock for ${medicineCode}: ${updatedMedicine.stock}`
                    );

                    channel.ack(message);

                } catch (error) {

                    console.error(
                        "Failed to process medicine message:",
                        error.message
                    );

                    channel.nack(
                        message,
                        false,
                        false
                    );
                }
            }
        );

    } catch (error) {

        console.error(
            "RabbitMQ Consumer Error:",
            error.message
        );

        throw error;
    }
};