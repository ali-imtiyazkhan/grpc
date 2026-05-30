import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-app',
    brokers: ['localhost:9092']
})

const producer = kafka.producer();

const run = async () => {
    await producer.connect();

    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'hello world from producer' }
        ]
    })
    await producer.disconnect();
}

run().catch(console.error)