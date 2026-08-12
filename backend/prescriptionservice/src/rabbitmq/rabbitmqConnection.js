import amqp from "amqplib";

let connection;
let channel;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(
            "amqp://localhost:5672"
        );

        connection.on("error", (error) => {
            console.error(
                "RabbitMQ connection error:",
                error.message
            );
        });

        connection.on("close", () => {
            console.warn("RabbitMQ connection closed");
            channel = undefined;
            connection = undefined;
        });

        channel = await connection.createChannel();

        channel.on("error", (error) => {
            console.error(
                "RabbitMQ channel error:",
                error.message
            );
        });

        channel.on("close", () => {
            console.warn("RabbitMQ channel closed");
            channel = undefined;
        });

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

export const getChannel = () => {
    if (!channel) {
        throw new Error(
            "RabbitMQ channel is not initialized"
        );
    }

    return channel;
};