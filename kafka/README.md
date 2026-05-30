# Kafka TypeScript Demo

A simple, lightweight Kafka integration using TypeScript, `kafkajs`, and the **Bun** runtime. This project contains configurations for running Kafka in Docker and implementing basic consumer, producer, and Express server scripts.

---

## 🛠️ Prerequisites

Ensure you have the following installed:
* [Docker & Docker Compose](https://www.docker.com/)
* [Bun Runtime](https://bun.sh/) (v1.3.14 or later)

---

## 🚀 Getting Started

### 1. Start Kafka Broker

The project includes a `docker-compose.yaml` configured to run KRaft-based Kafka (Bitnami image) on port `9092`. Start the broker using:

```bash
docker-compose up -d
```

To stop the broker:
```bash
docker-compose down
```

### 2. Install Dependencies

Install the project dependencies using Bun:

```bash
bun install
```

### 3. Run the Applications

You can run the different components of the demo using the script commands defined in `package.json` or by calling the files directly:

* **Start the Express Server:**
  ```bash
  bun run start
  # Or: bun run src/index.ts
  ```
  *(Starts the Express server on `http://localhost:3000` and automatically starts the background Kafka consumer)*

* **Run the Consumer (standalone):**
  ```bash
  bun run consumer
  # Or: bun run src/consumer.ts
  ```
  *(Listens for messages on `test-topic`)*

* **Run the Producer (standalone):**
  ```bash
  bun run producer
  # Or: bun run src/producer.ts
  ```
  *(Publishes a message to `test-topic`)*

---

## 💻 Working with Kafka CLI (Optional)

If you want to manually interact with the Kafka broker inside the running Docker container, use the following commands.

> [!NOTE]
> Since we use the Bitnami Kafka image, utility scripts are located in `/opt/bitnami/kafka/bin/`.

### 1. Access the Kafka Container
```bash
docker exec -it kafka bash
```

### 2. Create a Topic
*(Note: Auto-topic creation is enabled by default in the docker-compose settings, but you can create topics manually.)*
```bash
/opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic test-topic --partitions 1 --replication-factor 1
```

### 3. Start a Console Producer
Send manual messages from your command line:
```bash
/opt/bitnami/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic test-topic
```

### 4. Start a Console Consumer
Listen to messages from the beginning:
```bash
/opt/bitnami/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test-topic --from-beginning
```

---

## 📂 Project Structure

* [docker-compose.yaml](file:///d:/grpc/kafka/docker-compose.yaml) - Kafka service config.
* [src/index.ts](file:///d:/grpc/kafka/src/index.ts) - A simple Express starter.
* [src/producer.ts](file:///d:/grpc/kafka/src/producer.ts) - Simple producer using `kafkajs`.
* [src/consumer.ts](file:///d:/grpc/kafka/src/consumer.ts) - Simple consumer using `kafkajs`.

