<template>
  <div>
    <div class="page-title">操作记录</div>
    <mt-field class="field" label="Telegram ID" v-model="userid" :value="userid" :attr="{maxlength: 10}">
      <mt-button class="button" type="default" size="small" @click.native="queryAccount">查询</mt-button>
    </mt-field>
    <div>
      <mt-cell
        v-for="(item, index) in result"
        :key=index
        :title="item"
      >
      </mt-cell>
    </div>
  </div>
</template>

<script>
import Utils from '@/scripts/utils'
import { Toast, Indicator } from 'mint-ui'
import ActionsService from '@/services/actions'

export default {
  data () {
    return {
      userid: '',
      result: []
    }
  },

  methods: {
    async queryAccount (event) {
      if (!Utils.validateTelegramID(this.userid)) {
        Toast({
          message: 'Telegram ID 输入有误',
          position: 'top'
        })
        return
      }

      Indicator.open()
      let result = await ActionsService.getActions(this.userid, 0, 10)
      Indicator.close()
      if (!result.ok) {
        Toast({
          message: '获取用户操作记录失败，请重试',
          position: 'top'
        })
        return
      }

      if (result.data.sum === 0) {
        Toast({
          message: '没有找到该用户的操作记录',
          position: 'top'
        })
        return
      }

      console.info(result)
    }
  }
}
</script>
