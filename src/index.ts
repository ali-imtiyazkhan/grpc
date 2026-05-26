import path from 'path';
import { fileURLToPath } from 'url';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { ProtoGrpcType } from './proto/a';
import type { AddressBookServiceHandlers } from './proto/AddressBookService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadPackageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'))

const personProto = grpc.loadPackageDefinition(loadPackageDefinition) as unknown as ProtoGrpcType;

const Person = [
    {
        name : "Aman",
        age : 20
    },
    {
        name : "Ayan",
        age : 19
    }
];

const getPersonByName: AddressBookServiceHandlers['GetPersonByName'] = (call, callback) => {
    console.log(call.request);
    let person = Person.find(p => p.name === call.request.name);
    if (person) {
        callback(null, { person });
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        });
    }
}

const addPerson: AddressBookServiceHandlers['AddPerson'] = (call, callback) => {
    console.log(call.request);
    let person = {
        name : call.request.name || '',
        age : call.request.age || 0
    };
    Person.push(person);
    callback(null, person);
}
const server = new grpc.Server();

server.addService(personProto.AddressBookService.service, {
    AddPerson : addPerson,
    GetPersonByName : getPersonByName
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server running on 0.0.0.0:50051");
});


 
