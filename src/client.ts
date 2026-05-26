import path from 'path';
import { fileURLToPath } from 'url';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { ProtoGrpcType } from './proto/a.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));
const personProto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

// Create the client
const client = new personProto.AddressBookService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Test AddPerson
client.AddPerson({ name: 'Bob', age: 25 }, (err: any, response: any) => {
    if (err) {
        console.error('Error adding person:', err);
    } else {
        console.log('AddPerson Response:', response);
    }

    // Test GetPersonByName
    client.GetPersonByName({ name: 'Bob' }, (err: any, response: any) => {
        if (err) {
            console.error('Error getting person:', err);
        } else {
            console.log('GetPersonByName Response:', response);
        }
    });
});
