<template>
  <div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false" class="mint-popup">
      <h1 align="center">身份认证</h1>
      <p>请输入动态验证码:</p>
      <mt-field :value="code" v-model="code" :attr="{maxlength: 6}"></mt-field>
      <p v-if="tips">
        <font color="#FF0000">* {{ message }}</font>
      </p>
      <div align="center" class="mint-popup-button">
        <mt-button size="normal" type="primary" @click.native="handleClick" :disabled="disabled">提交</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import AuthService from '@/services/auth'

export default {
  data () {
    return {
      code: '',
      tips: false,
      message: '',
      disabled: false
    }
  },

  props: ['popupVisible'],

  computed: {
    getSession () {
      return this.$store.getters['network/session']
    }
  },

  watch: {
    getSession (val) {
      this.$emit('update', !(val && val.length > 0))
    }
  },

  methods: {
    async handleClick (event) {
      this.tips = false
      if (this.code.length !== 6) {
        this.tips = true
        this.message = '无效验证码'
        return
      }

      for (let i = 0; i < this.code.length; i++) {
        if (this.code[i] < '0' || this.code[i] > '9') {
          this.tips = true
          this.message = '无效验证码'
          return
        }
      }

      this.disabled = true
      this.$store.dispatch('network/setCode', this.code)
      let result = await AuthService.auth(this.code)
      if (!result.ok) {
        this.tips = true
        this.message = '认证失败'
        this.disabled = false
        return
      }
      this.disabled = false
      this.$store.dispatch('network/setSession', result.data.session_id)
    }
  }
}
</script>

<style scoped>
  .mint-popup {
    min-width: 480px;
    border-radius: 8px;
    padding: 10px;
    transform: translate(-50%, -50%);
    background-color:gainsboro;
  }

  .mint-popup-button {
    margin-top: 15px;
  }
</style>
