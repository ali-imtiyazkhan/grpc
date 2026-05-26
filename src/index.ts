import path from 'path';
import { fileURLToPath } from 'url';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadPackageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'))

const personProto = grpc.loadPackageDefinition(loadPackageDefinition)

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

// @ts-expect-error
function getPersonByName (call, callback) {
    console.log(call);
    let person = {
        name : call.request.name,
    };
    callback(null, person);
}

// @ts-expect-error
function addPerson (call, callback) {
    console.log(call);
    let person = {
        name : call.request.name,
        age : call.request.age
    };
    Person.push(person);
    callback(null, person);
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService as grpc.ServiceClientConstructor).service, {
    addPerson : addPerson,
    getPersonByName : getPersonByName
});

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server running on 0.0.0.0:50051");
});


 
