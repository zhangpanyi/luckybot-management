import NodeService from '@/services/node'

class AuthService {
  async auth (code) {
    try {
      const response = await NodeService.post('auth', {
        code: code,
        tonce: Math.floor(Date.now() / 1000)
      })
      return {ok: true, data: response}
    } catch (error) {
      return {ok: false, error: error.message}
    }
  }
}

export default new AuthService()
