import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
})

const producer = kafka.producer();
const consumer = kafka.consumer({
    groupId: 'test-group'
})


const run = async () => {
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'hello from inside the kafka producer' }
        ]
    })
    await producer.disconnect();
}

await consumer.connect();

await consumer.subscribe({
    topic:'test-topic',
    fromBeginning : false
})


await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            topic,
            value: message.value?.toString(),
            offset: message.offset
        })
    }
})


run().catch(console.error)