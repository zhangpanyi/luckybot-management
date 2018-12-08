import NodeService from '@/services/node'

class PublishService {
  async publicNotice (message) {
    try {
      const response = await NodeService.post('broadcast', {
        message: message.toString(),
        tonce: Math.floor(Date.now() / 1000)
      })
      return {ok: true, data: response}
    } catch (error) {
      return {ok: false, error: error.message}
    }
  }
}

export default new PublishService()
