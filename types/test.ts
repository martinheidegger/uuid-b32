import { decode, encode, Variant } from 'uuid-b32';

const t: string = decode('some uuid');
const t2: string = encode('some uuid');
encode(new Uint8Array());
encode(new Uint8Array(), 'Crockford');
decode('str', 'Crockford');
