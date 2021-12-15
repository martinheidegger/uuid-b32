export type Variant = 'RFC3548' | 'RFC4648' | 'RFC4648-HEX' | 'Crockford';
export function decode(uuid: string, variant?: Variant): string;
export function encode(uuidB32?: string | { buffer: ArrayBuffer } | ArrayBuffer, variant?: Variant): string;
