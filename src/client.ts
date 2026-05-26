 import path from 'path';
import { fileURLToPath } from 'url';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));
const personProto = grpc.loadPackageDefinition(packageDefinition);

// Create the client
const client = new (personProto.AddressBookService as grpc.ServiceClientConstructor)(
    'localhost:50051',
    grpc.credentials.createInsecure()
) as any;

// Test AddPerson
client.addPerson({ name: 'Bob', age: 25 }, (err: any, response: any) => {
    if (err) {
        console.error('Error adding person:', err);
    } else {
        console.log('AddPerson Response:', response);
    }

    // Test GetPersonByName
    client.getPersonByName({ name: 'Bob' }, (err: any, response: any) => {
        if (err) {
            console.error('Error getting person:', err);
        } else {
            console.log('GetPersonByName Response:', response);
        }
    });
});
