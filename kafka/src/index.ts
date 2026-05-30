import express from "express"
import { startProducer } from "./producer"
import { startConsumer } from "./consumer"

const app = express();

startConsumer().catch((err) => {
    console.error("Failed to start Kafka Consumer:", err);
});

app.get("/produce", async (req, res) => {
    try {
        await startProducer();
        res.send({ status: "success", message: "Message produced successfully to 'test-topic'" });
    } catch (err) {
        console.error("Failed to produce message:", err);
        res.status(500).send({ status: "error", message: "Failed to produce message" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("Kafka Consumer is listening for messages...");
    console.log("To produce a message, visit: http://localhost:3000/produce");
})