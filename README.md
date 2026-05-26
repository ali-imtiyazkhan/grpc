# gRPC Node.js TypeScript Example

A simple example of setting up a gRPC server using Node.js and TypeScript.

## Prerequisites

- Node.js
- Yarn (or npm)

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Build the TypeScript code:
   ```bash
   yarn build
   ```

3. Start the server:
   ```bash
   yarn start
   ```

The server will run on `0.0.0.0:50051`.

## Features

- Uses `@grpc/grpc-js` and `@grpc/proto-loader`
- Written in TypeScript with ES Modules
- Implements `AddressBookService` with `AddPerson` and `GetPersonByName` RPCs.
