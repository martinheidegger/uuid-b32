const test = require('tape')
const uuid = require('uuid')
const uuidB32 = require('.')

test('b32 generation', async t => {
  const encoded = uuidB32.encode()
  t.match(encoded, /^[0-9A-Z]{26}$/)
})

test('b32 from random array', async t => {
  const justRandomString = Buffer.from('7a8ae56f840428bab5c636200f0c4097', 'hex')
  const encoded = uuidB32.encode(justRandomString)
  const encoded2 = uuidB32.encode(justRandomString)
  t.equals(encoded, encoded2)
  t.throws(() => uuidB32.decode(encoded), 'uuid flag is wrong')
})

test('uuid versions', async t => {
  for (const [version, id] of Object.entries({
    v1: uuid.v1(),
    v3: uuid.v3('Hello, World!', uuid.v1()),
    v4: uuid.v4(),
    v5: uuid.v5('Hello, World!', uuid.v1())
  })) {
    const encoded = uuidB32.encode(id)
    const decoded = uuidB32.decode(encoded)
    t.deepEquals(decoded, id, `uuid#${version}: ${id}`)
  }
})

test('b32 de/encoding variants', async t => {
  const id = '233b3a90-5d4a-11ec-9ae1-2bef75fb4358'
  for (const [variant, expected] of Object.entries({
    RFC3548: 'EM5TVEC5JII6ZGXBFPXXL62DLA======',
    RFC4648: 'EM5TVEC5JII6ZGXBFPXXL62DLA======',
    'RFC4648-HEX': '4CTJL42T988UP6N15FNNBUQ3B0======',
    Crockford: '4CXKN42X988YS6Q15FQQBYT3B0'
  })) {
    const encoded = uuidB32.encode(id, variant)
    t.equals(encoded, expected, `${variant} encoding of ${id} to be ${expected} == ${encoded}`)
  }
})

test('input types', async t => {
  const inputId = '233b3a90-5d4a-11ec-9ae1-2bef75fb4358'
  for (const [type, id] of Object.entries({
    String: inputId,
    Uint8Array: uuid.parse(inputId),
    ArrayBuffer: uuid.parse(inputId).buffer,
    Uint32Array: new Uint32Array(uuid.parse(inputId).buffer)
  })) {
    const encoded = uuidB32.encode(id)
    const decoded = uuidB32.decode(encoded)
    t.equals(decoded, inputId, `${type}: ${id}(${encoded}) -> ${decoded}`)
  }
})
