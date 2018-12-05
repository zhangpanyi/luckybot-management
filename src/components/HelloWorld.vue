<template>
  <section class="page-main">
    <div>
      <div class="page-title" v-text="title"></div>
      <mt-cell v-for="item in navs"
        :key=item
        :to="item.path"
        is-link
      >
        <div slot="title">
          <i :class="['indexicon', 'icon-' + item.icon]"></i>
          <span>{{ item.name }}</span>
        </div>
      </mt-cell>
    </div>
  </section>
</template>

<script>
import NavConfig from '@/nav.config.json'

export default {
  name: 'HelloWorld',

  data: function () {
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
<style scoped>
  .page-main {
    padding-bottom: 50px;
  }

  .page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }

  .indexicon {
    font-size: 22px;
    color: #26a2ff;
    display: inline-block;
    width: 30px;
    vertical-align: middle;
  }
</style>
