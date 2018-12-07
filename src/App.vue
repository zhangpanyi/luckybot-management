<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created () {
    this.$store.dispatch('network/setCode', '')
    this.$store.dispatch('network/setSession', '')
    this.$store.dispatch('network/setServer', 'http://127.0.0.1:18080')
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
