import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost:5672";
const QUEUE_NAME = "medicine_queue";

const sendMessage = async () => {

    try {

        const connection =
            await amqp.connect(RABBITMQ_URL);

        const channel =
            await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        const message = {
            medicineCode: "MED-001",
            quantity: 2
        };

        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(message)),
            {
                persistent: true
            }
        );

        console.log("Message sent:");
        console.log(message);

        setTimeout(() => {
            connection.close();
        }, 500);

    } catch (error) {

        console.error(
            "RabbitMQ Producer Error:",
            error.message
        );

    }
};

sendMessage();