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
      <mt-cell is-link @click.native="backup">
        <div slot="title">
          <i :class="['indexicon', 'icon-' + 'pull-down']"></i>
          <span>备份数据</span>
        </div>
      </mt-cell>
    </div>
  </section>
</template>

<script>
import Methods from '@/services/methods'
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
  },

  methods: {
    async backup () {
      let result = await Methods.backup()
      if (result.ok) {
        const url = window.URL.createObjectURL(new Blob([result.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'backup.db')
        document.body.appendChild(link)
        link.click()
      }
    }
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
