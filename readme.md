# Convert uuid to and from base32

UUID's for legacy reasons are usually encoded as hex strings like: `5b9e4740-5d4c-11ec-a260-8f8d5ea1937c`.
This encoding is quite long and not very human friendly. Using this util you can convert them using
`base32` encoding, which looks like this `BEF4EG2X9G8YS8K0HY6NX8CKFG`.

## JavaScript API

```javascript
const { encode, decode } = require('uuid-b32')

// create a base32 encoded uuidv4
const uuidCrockfordEncoded = encode()
const uuidRFC4648Encoded = encode(null, 'RFC4648')

// convert back to uuid
const uuid =
    decode(uuidCrockfordEncoded) ||
    decode(uuidRFC4648Encoded, 'RFC4648')

// convert exisiting uuid to base32
encode(uuid)
```

## Command Line Usage

You can also use it simply as a command line tool: `npx uuid-b32`

```
Generate or convert a uuid to/from base32 encoding

Usage: uuid-b32 (--uuid [uuid]) (--variant [variant]) (--b32 [uuid]) (--uuid-v1) (--uuid-v4)

    --variant ....... use base32 variant, supported variants: RFC3548, RFC4648, RFC4648-HEX, Crockford (default)
    --uuid .......... convert input uuid instead of generating new one
    --b32 ........... convert input base32 encoded uuid to uuid
    --uuid-v1 ....... when creating a new uuid, use uuid-v1 variant
    --uuid-v4 ....... when creating a new uuid, use uuid-v4 variant (default)
    -v, --version ... print the version
    -h, --help ...... print this help

Create a base32 uuid:

uuid-b32

Input using stdin is supported

echo <uuid> | uuid-b32 --uuid
echo <b32>  | uuid-b32 --b32
```

# License

[MIT](./LICENSE)
