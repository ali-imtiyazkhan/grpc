import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// import { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';

const loadPackageDefinition = protoLoader.loadSync(path.join(__dirname, 'a.proto'))

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
    addPerson : addPerson
});

server.addService((personProto.GetPersonByNameRequest as grpc.ServiceClientConstructor).service, {
    getPersonByName : getPersonByName
})


server.addService((personProto.GetPersonByNameResponse as grpc.ServiceClientConstructor).service, {
    getPersonByName : getPersonByName
})
server.bindAsync("[IP_ADDRESS]", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("Server running on [IP_ADDRESS]");
});


 
