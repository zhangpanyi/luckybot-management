<template>
  <div>
    <div class="page-title">红包列表</div>
    <mt-field class="field" label="Telegram ID" v-model="userid" :value="userid" :attr="{maxlength: 10}">
      <mt-button type="default" size="small" @click.native="queryAccount">查询</mt-button>
    </mt-field>
    <div v-if="visible">
      <p v-if="!hasLuckymoney">没有找到该用户的操作记录</p>
      <div v-else>
        <div>
          <mt-cell
            v-for="(item, index) in result"
            :key=index
            :title=item
          >
          </mt-cell>
        </div>

        <div class="button-group" align="center">
          <mt-button size="small" @click.native="previousPage">上一页</mt-button>
          &#12288;{{ page }}/{{ sum }}&#12288;
          <mt-button size="small" @click.native="nextPage">下一页</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Utils from '@/scripts/utils'
import Methods from '@/services/methods'
import { Toast, Indicator } from 'mint-ui'

export default {
  data () {
    return {
      sum: 1,
      page: 1,
      count: 10,
      userid: '',
      visible: true,
      result: []
    }
  },

  computed: {
    hasLuckymoney () {
      return this.result.length > 0
    }
  },

  methods: {
    // 下一页
    async nextPage (event) {
      if (this.page < this.sum) {
        this.count++
        await this.queryAccount(undefined)
      }
    },

    // 上一页
    async previousPage (event) {
      if (this.page > 1) {
        this.count--
        await this.queryAccount(undefined)
      }
    },

    // 格式化信息
    formatLuckymoney (array) {
      let result = []
      for (let i = 0; i < array.length; i++) {
        let type = '普通红包'
        const luckymoney = array[i]
        let amount = luckymoney.amount
        if (luckymoney.lucky) {
          type = '随机红包'
        } else {
          amount = parseFloat(luckymoney.amount) * luckymoney.number
        }
        const timestamp = moment.unix(luckymoney.timestamp).format('YYYY-MM-DD HH:mm:ss')
        result.push(`* ${timestamp} [${type}] ID: ${luckymoney.id}, 红包数量: ${luckymoney.number}, \
          领取数量: ${luckymoney.count}, 总金额: ${amount} ${luckymoney.asset}, 领取金额: ${luckymoney.received} ${luckymoney.asset}`)
      }
      return result
    },

    // 查询账号
    async queryAccount (event) {
      this.visible = false
      if (!Utils.validateTelegramID(this.userid)) {
        Toast({
          message: 'Telegram ID 输入有误',
          position: 'top'
        })
        return
      }

      Indicator.open()
      let result = await Methods.getLuckymoney(
        this.userid, (this.page - 1) * this.count, this.count)
      Indicator.close()
      if (!result.ok) {
        Toast({
          message: '获取用户操作记录失败，请重试',
          position: 'top'
        })
        return
      }

      this.sum = parseInt(result.data.sum / this.count)
      if (this.sum === 0 && result.data.sum > 0) {
        this.sum = 1
      }
      this.visible = true
      this.result = this.formatLuckymoney(result.data.result)
    }
  }
}
</script>

<style scoped>
  .field {
    background-color:gainsboro;
  }
  .button-group {
    margin-top: 10px
  }
</style>
