import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost:5672";

let connection;
let channel;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);

        channel = await connection.createChannel();

        console.log("Connected to RabbitMQ");

        return channel;

    } catch (error) {
        console.error(
            "RabbitMQ connection failed:",
            error.message
        );

        throw error;
    }
};

export const getRabbitMQChannel = () => {
    if (!channel) {
        throw new Error(
            "RabbitMQ channel is not initialized"
        );
    }

    return channel;
};