import NodeService from '@/services/node'

class DepositService {
  async deposit (userID, amount) {
    try {
      const response = await NodeService.post('deposit', {
        user_id: parseInt(userID),
        amount: amount.toString(),
        tonce: Math.floor(Date.now() / 1000)
      })
      return {ok: true, data: response}
    } catch (error) {
      return {ok: false, error: error.message}
    }
  }
}

export default new DepositService()
