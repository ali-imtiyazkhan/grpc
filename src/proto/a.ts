import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AddressBookServiceClient as _AddressBookServiceClient, AddressBookServiceDefinition as _AddressBookServiceDefinition } from './AddressBookService';
import type { GetPersonByNameRequest as _GetPersonByNameRequest, GetPersonByNameRequest__Output as _GetPersonByNameRequest__Output } from './GetPersonByNameRequest';
import type { GetPersonByNameResponse as _GetPersonByNameResponse, GetPersonByNameResponse__Output as _GetPersonByNameResponse__Output } from './GetPersonByNameResponse';
import type { Person as _Person, Person__Output as _Person__Output } from './Person';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AddressBookService: SubtypeConstructor<typeof grpc.Client, _AddressBookServiceClient> & { service: _AddressBookServiceDefinition }
  GetPersonByNameRequest: MessageTypeDefinition<_GetPersonByNameRequest, _GetPersonByNameRequest__Output>
  GetPersonByNameResponse: MessageTypeDefinition<_GetPersonByNameResponse, _GetPersonByNameResponse__Output>
  Person: MessageTypeDefinition<_Person, _Person__Output>
}

