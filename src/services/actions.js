import NodeService from '@/services/node'

class ActionsService {
  async getActions (userID, offset, limit) {
    try {
      const response = await NodeService.post('getactions', {
        user_id: parseInt(userID),
        offset: parseInt(offset),
        limit: parseInt(limit),
        tonce: Math.floor(Date.now() / 1000)
      })
      return {ok: true, data: response}
    } catch (error) {
      return {ok: false, error: error.message}
    }
  }
}

export default new ActionsService()
