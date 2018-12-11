import NodeService from '@/services/node'

class Methods {
  // 身份认证
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

  // 充值金额
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

  // 获取余额
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

  // 获取操作记录
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

  // 获取红包信息
  async getLuckymoney (userID, offset, limit) {
    try {
      const response = await NodeService.post('getluckymoney', {
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

  // 发布公告
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

export default new Methods()
