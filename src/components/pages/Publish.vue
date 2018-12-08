<template>
  <div>
    <div class="page-title">发布公告</div>
    <mt-field label="公告内容" type="textarea" rows="4" v-model="message" :value="message"></mt-field>
    <div align="center">
      <mt-button class="button" type="primary" @click.native="publishNotice">发布</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import PublishService from '@/services/publish'

export default {
  data () {
    return {
      message: ''
    }
  },

  methods: {
    async publishNotice (event) {
      if (this.message.length === 0 || this.message.length > 256) {
        Toast({
          message: '消息长度必须大于0并且小于256字节',
          position: 'top'
        })
        return
      }

      Indicator.open()
      let result = await PublishService.publicNotice(this.message)
      Indicator.close()
      if (!result.ok) {
        Toast({
          message: '发布公告失败，请重试',
          position: 'top'
        })
        return
      }

      Toast({
        message: '发布公告成功',
        position: 'top'
      })
    }
  }
}
</script>

<style scoped>
  .button {
    margin-top: 10px
  }
</style>
