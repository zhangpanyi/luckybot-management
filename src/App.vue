<template>
  <div id="app">
    <router-link class="page-back" v-if="visible" :to="'/'">
      <i class="mintui mintui-back"></i>
    </router-link>
    <router-view/>
    <popup :popupVisible="popupVisible" @update="updatePopupVisible"/>
  </div>
</template>

<script>
import Popup from '@/components/popup/Popup'

export default {
  name: 'App',
  components: { Popup },

  data () {
    return {
      popupVisible: false
    }
  },

  computed: {
    visible () {
      return ['/'].indexOf(this.$route.path) < 0
    }
  },

  methods: {
    updatePopupVisible (val) {
      this.popupVisible = val
    }
  },

  async created () {
    const session = localStorage.getItem('network/session')
    this.popupVisible = !(session && session.length > 0)
    this.$store.dispatch('network/setServer', 'http://127.0.0.1:18127')
    this.$store.dispatch('network/setCode', localStorage.getItem('network/code'))
    this.$store.dispatch('network/setSession', localStorage.getItem('network/session'))
    this.$store.dispatch('network/setExpireAt', localStorage.getItem('network/expire_at'))
  },

  async mounted () {
    const timestamp = Math.floor(Date.now() / 1000)
    const expireAt = parseInt(localStorage.getItem('network/expire_at'))
    this.updatePopupVisible(isNaN(expireAt) || expireAt >= timestamp)
  }
}
</script>

<style>
  html, body {
    background-color: #fafafad7;
    -webkit-overflow-scrolling: touch;
    user-select: none;
  }

  a {
    color: inherit;
  }

  .page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }

  .page-back {
    display: inline-block;
    position: absolute;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>
