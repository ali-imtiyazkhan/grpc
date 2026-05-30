import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test-group',
    brokers: ['localhost:9092']
})


const consumer = kafka.consumer({
    groupId: 'test-group'
})

export const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic: 'test-topic',
        fromBeginning: false
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
}


if (import.meta.main) {
    await startConsumer().catch(console.error)
}
