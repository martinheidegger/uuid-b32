const uuid = require('uuid')

const temp = new Uint8Array(16)

function getBytes (input) {
  if (input === null || input === undefined) {
    uuid.v4({}, temp)
    return temp.buffer
  }
  if (input.buffer instanceof ArrayBuffer) {
    return input.buffer
  }
  if (input instanceof ArrayBuffer) {
    return input
  }
  return uuid.parse(input).buffer
}

let b32e
function encode (id, variant = 'Crockford') {
  const bytes = getBytes(id)
  if (b32e === undefined) {
    b32e = require('base32-encode')
  }
  return b32e(bytes, variant)
}

let b32d
function decode (str, variant = 'Crockford') {
  if (b32d === undefined) {
    b32d = require('base32-decode')
  }
  const bytes = b32d(str, variant)
  return uuid.stringify(new Uint8Array(bytes))
}

module.exports = {
  encode,
  decode
}
