<template>
  <div id="app">
    <router-view/>
    <popup :popupVisible="popupVisible" @update="updatePopupVisible"/>
  </div>
</template>

<script>
import Popup from '@/components/Popup'

export default {
  name: 'App',
  components: { Popup },

  data () {
    return {
      popupVisible: false
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
    this.$store.dispatch('network/setServer', 'http://127.0.0.1:18080')
    this.$store.dispatch('network/setCode', localStorage.getItem('network/code'))
    this.$store.dispatch('network/setSession', localStorage.getItem('network/session'))
  }
}
</script>

<style>
  html, body {
    background-color: #fafafa;
    -webkit-overflow-scrolling: touch;
    user-select: none;
  }

  a {
    color: inherit;
  }
</style>
