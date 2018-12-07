class AuthError extends Error {
  constructor () {
    super()
    this.name = 'AuthError'
    this.message = 'Authentication failed'
  }
}

export default AuthError
