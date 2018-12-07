import NodeService from '@/services/node'

class GetBalanceService {
  async getBalance (userID) {
    try {
      const response = await NodeService.post('balance', {
        user_id: userID,
        tonce: Math.floor(Date.now() / 1000)
      })
      return {ok: true, data: response}
    } catch (error) {
      return {ok: false, error: error.message}
    }
  }
}

export default new GetBalanceService()
