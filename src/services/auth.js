import store from '@/store'
import NodeService from '@/services/node'

class AuthService {
  async auth (code) {
    store.dispatch('network/setCode', code)
    const response = await NodeService.post('auth', {
      code: code,
      tonce: Math.floor(Date.now() / 1000)
    })
    return response
  }
}

export default new AuthService()
