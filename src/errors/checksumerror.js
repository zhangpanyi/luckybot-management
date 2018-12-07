class ChecksumError extends Error {
  constructor () {
    super()
    this.name = 'ChecksumError'
    this.message = 'Invalid checksum'
  }
}

export default ChecksumError
