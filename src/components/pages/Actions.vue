<template>
  <div>
    <div class="page-title">操作记录</div>
    <mt-field class="field" label="Telegram ID" v-model="userid" :value="userid" :attr="{maxlength: 10}">
      <mt-button type="default" size="small" @click.native="queryAccount">查询</mt-button>
    </mt-field>
    <div v-if="visible">
      <p v-if="!hasActions">没有找到该用户的操作记录</p>
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

// 发红包
const ReasonGive = 1
// 系统发放
const ReasonSystem = 2
// 领取红包
const ReasonReceive = 3
// 退还红包
const ReasonGiveBack = 4
// 充值
const ReasonDeposit = 5
// 提现
const ReasonWithdraw = 6
// 提现成功
const ReasonWithdrawSuccess = 7
// 提现失败
const ReasonWithdrawFailure = 8

export default {
  data () {
    return {
      sum: 1,
      page: 1,
      count: 10,
      userid: '',
      visible: false,
      result: []
    }
  },

  computed: {
    hasActions () {
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

    // 格式化操作记录
    formatActions (actions) {
      let result = []
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i]
        const timestamp = moment.unix(action.timestamp).format('YYYY-MM-DD HH:mm:ss')
        switch (action.reason) {
          // 发放红包
          case ReasonGive:
            result.push(`* ${timestamp} 您发放了红包${action.ref_lucky_money_id}, 花费 ${action.locked} ${action.symbol}`)
            break
          // 系统发放
          case ReasonSystem:
            result.push(`* ${timestamp} 系统为您充值了 ${action.balance} ${action.symbol}，请注意查收`)
            break
          // 领取红包
          case ReasonReceive:
            result.push(`* ${timestamp} 您领取了 ${action.ref_user_name}(${action.ref_user_id}) 发放的红包${action.ref_lucky_money_id}, 获得 ${action.balance} ${action.symbol}`)
            break
          // 退还红包
          case ReasonGiveBack:
            result.push(`* ${timestamp} 您创建的红包${action.ref_lucky_money_id}已过期, 退还剩余金额 ${action.locked} ${action.symbol}`)
            break
          // 充值代币
          case ReasonDeposit:
            result.push(`* ${timestamp} 您充值 ${action.balance} ${action.symbol} 已确认, 区块高度: ${action.ref_block_height}, TxID: ${action.ref_tx_id}`)
            break
          // 正在提现
          case ReasonWithdraw:
            result.push(`* ${timestamp} "您申请提现 ${action.locked} ${action.symbol} 到${action.name}地址 ${action.ref_address} 正在转账中, 手续费 ${action.fee} ${action.symbol}`)
            break
          // 提现失败
          case ReasonWithdrawSuccess:
            result.push(`* ${timestamp} "您申请提现 ${Math.abs(action.locked)} ${action.symbol} 到${action.name}地址 ${action.ref_address} 转账失败。资金已退还，请查收`)
            break
          // 提现成功
          case ReasonWithdrawFailure:
            result.push(`* ${timestamp} "您申请提现 ${Math.abs(action.locked)} ${action.symbol} 到${action.name}地址 ${action.ref_address} 已经转账, TxID：${action.ref_tx_id}`)
            break
        }
      }
      return result
    },

    // 查询账号操作记录
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
      let result = await Methods.getActions(
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
      this.result = this.formatActions(result.data.actions)
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
