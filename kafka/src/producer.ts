import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-app',
    brokers: ['localhost:9092']
})

const producer = kafka.producer();

export const startProducer = async () => {
    await producer.connect();

    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'hello world from producer' }
        ]
    })
    await producer.disconnect();
}

if (import.meta.main) {
    startProducer().catch(console.error)
}