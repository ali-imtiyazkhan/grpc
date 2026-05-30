# kafka

we are going to use kafka in docker.


# install kafka in docker.
```bash
docker-compose -f docker-compose.yaml up -d
```

# and the command for running kafka

## run kafka
```bash
docker exec -it kafka bash
```
## kafka-topics
```bash
kafka-topics --bootstrap-server localhost:9092 --create --topic test-topic --partitions 1 --replication-factor 1
```

## console producer
```bash
kafka-console-producer --bootstrap-server localhost:9092 --topic test-topic
```

# console consumer

```bash
kafka-console-consumer --bootstrap-server localhost:9092 --topic test-topic
```

docker run -d --name kafka -p 9092:9092 apache/kafka:3.7.1
docker ps

docker exec -it [container_id] /bin/bash
cd bin

kafka-topics --bootstrap-server localhost:9092 --create --topic test-topic --partitions 1 --replication-factor 1

kafka-console-producer --bootstrap-server localhost:9092 --topic test-topic

kafka-console-consumer --bootstrap-server localhost:9092 --topic test-topic



## To install dependencies:
```bash
bun install
```

# To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
