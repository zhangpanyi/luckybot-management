<template>
  <div>
    <div class="page-title">账号信息</div>
    <mt-field class="field" label="Telegram ID" v-model="userid" :value="userid" :attr="{maxlength: 10}">
      <mt-button class="button" type="default" size="small" @click.native="queryAccount">查询</mt-button>
    </mt-field>
    <div v-if="show">
      <mt-cell
        v-for="(item, index) in result"
        :key=index
        :title="item.title"
        :value="item.value"
      >
      </mt-cell>
      <mt-field label="充值金额：" v-model="amount" :value="amount">
        <mt-button class="button" type="default" size="small" @click.native="depositCurrency">充值</mt-button>
      </mt-field>
    </div>
  </div>
</template>

<script>
import Utils from '@/scripts/utils'
import Methods from '@/services/methods'
import { Toast, Indicator } from 'mint-ui'

export default {
  data () {
    return {
      userid: '',
      amount: '0',
      show: false,
      result: [
        {
          title: 'ID：',
          value: '0'
        },
        {
          title: '可用金额：',
          value: '0'
        },
        {
          title: '锁定金额：',
          value: '0'
        }
      ]
    }
  },

  methods: {
    // 查询账号
    async queryAccount (event) {
      if (!Utils.validateTelegramID(this.userid)) {
        Toast({
          message: 'Telegram ID 输入有误',
          position: 'top'
        })
        return
      }

      Indicator.open()
      const result = await Methods.getBalance(parseInt(this.userid))
      Indicator.close()
      if (!result.ok) {
        Toast({
          message: '获取账号信息失败',
          position: 'top'
        })
        this.show = false
        return
      }

      this.show = true
      this.result[0].value = this.userid
      this.result[1].value = result.data.amount
      this.result[2].value = result.data.locked
    },

    // 赠送代币
    async depositCurrency (event) {
      let amount = parseFloat(this.amount)
      if (isNaN(amount) || amount <= 0) {
        Toast({
          message: '充值金额输入有误',
          position: 'top'
        })
        return
      }

      Indicator.open()
      let userid = this.result[0].value
      let result = await Methods.deposit(userid, amount)
      Indicator.close()
      if (!result.ok) {
        Toast({
          message: '充值失败，请重试',
          position: 'top'
        })
        return
      }

      Toast({
        message: '充值成功',
        position: 'top'
      })

      this.show = true
      this.amount = '0'
      this.queryAccount()
    }
  }
}
</script>

<style scoped>
  .field {
    background-color:gainsboro;
  }
  .button {
    margin-left: 8px
  }
</style>
