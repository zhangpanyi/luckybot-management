<template>
  <section class="page-main">
    <div>
      <div class="page-title" v-text="title"></div>
      <mt-cell v-for="(item, index) in navs"
        :key=index
        :to="item.path"
        is-link
      >
        <div slot="title">
          <i :class="['indexicon', 'icon-' + item.icon]"></i>
          <span>{{ item.title }}</span>
        </div>
      </mt-cell>
    </div>
  </section>
</template>

<script>
import NavConfig from '@/nav.config.json'

export default {
  name: 'HelloWorld',

  data () {
    return {
      navs: [],
      title: '管理后台'
    }
  },

  created () {
    this.navs = NavConfig
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .page-main {
    padding-bottom: 50px;
  }

  .indexicon {
    font-size: 22px;
    color: #26a2ff;
    display: inline-block;
    width: 30px;
    vertical-align: middle;
  }
</style>
