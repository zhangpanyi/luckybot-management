import axios from 'axios'
import crc32 from 'crc-32'
import crypto from 'crypto'
import store from '@/store'

import AuthError from '@/errors/autherror'
import ChecksumError from '@/errors/checksumerror'

class NodeService {
  async post (url, src) {
    // 是否过期
    const timestamp = Math.floor(Date.now() / 1000)
    if (url !== 'auth') {
      const expireAt = store.getters['network/expire_at']
      if (isNaN(expireAt) || timestamp >= expireAt) {
        store.dispatch('network/setSession', undefined)
        return Promise.reject(new AuthError())
      }
    }

    // 构造消息
    let key = this.genKey()
    const server = store.getters['network/server']
    const result = this.encrypt(key, key, JSON.stringify(src))
    const message = {
      'data': result[0],
      'checksum': result[1],
      'session': store.getters['network/session']
    }

    // 发请请求
    let response
    try {
      response = await axios.post(
        `${server}/admin/${url}`,
        JSON.stringify(message),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          validateStatus: function (status) {
            return true
          }
        }
      )
    } catch (error) {
      return Promise.reject(new Error(error))
    }

    // 是否识别
    if (!response.data.ack) {
      store.dispatch('network/setSession', undefined)
      return Promise.reject(new AuthError())
    }
    store.dispatch('network/setExpireAt', timestamp * 5 * 60)

    // 解密消息
    let rawdata, checksum
    [rawdata, checksum] = this.decrypt(key, key, response.data.data)
    if (checksum !== response.data.checksum) {
      return Promise.reject(new ChecksumError())
    }
    if (!rawdata.ok) {
      return Promise.reject(new Error(`Error POST ${url} : ${rawdata.error}`))
    }
    return rawdata.result
  }

  async download (url, src) {
    // 是否过期
    const timestamp = Math.floor(Date.now() / 1000)
    const expireAt = store.getters['network/expire_at']
    if (isNaN(expireAt) || timestamp >= expireAt) {
      store.dispatch('network/setSession', undefined)
      return Promise.reject(new AuthError())
    }

    // 构造消息
    let key = this.genKey()
    const server = store.getters['network/server']
    const result = this.encrypt(key, key, JSON.stringify(src))

    const message = {
      'data': result[0],
      'checksum': result[1],
      'session': store.getters['network/session']
    }

    // 发请请求
    let response
    try {
      response = await axios.post(
        `${server}/admin/${url}`,
        JSON.stringify(message),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType: 'blob',
          validateStatus: function (status) {
            return true
          }
        }
      )
    } catch (error) {
      return Promise.reject(new Error(error))
    }

    if (response.status === 401) {
      store.dispatch('network/setSession', undefined)
      return Promise.reject(new AuthError())
    } else if (response.status !== 200) {
      return Promise.reject(new Error(`Error POST ${url} : status ${response.status}`))
    }

    store.dispatch('network/setExpireAt', timestamp * 5 * 60)
    return response.data
  }

  // 生成密钥
  genKey () {
    let keys = []
    let code = store.getters['network/code']
    for (let i = 0; i < 16; i++) {
      if (i < code.length) {
        keys.push(code[i])
        continue
      }
      keys.push('0')
    }
    return keys.join('')
  }

  // 加密数据
  encrypt (key, iv, data) {
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    let crypted = cipher.update(data, 'utf8', 'binary')
    crypted += cipher.final('binary')
    let checksum = crc32.bstr(crypted) >>> 0
    crypted = Buffer.from(crypted, 'binary').toString('base64')
    return [crypted, checksum]
  }

  // 解密数据
  decrypt (key, iv, crypted) {
    crypted = Buffer.from(crypted, 'base64').toString('binary')
    let checksum = crc32.bstr(crypted) >>> 0
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    let decoded = decipher.update(crypted, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    return [JSON.parse(decoded), checksum]
  }
}

export default new NodeService()
