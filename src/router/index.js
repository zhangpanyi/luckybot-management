import Vue from 'vue'
import Router from 'vue-router'
import NavConfig from '@/nav.config.json'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const registerRoute = (config) => {
  let route = []
  for (let i = 0; i < config.length; i++) {
    let page = config[i]
    route.push({
      name: page.name,
      path: page.path,
      component: require(`@/components/pages${page.path}`).default,
      meta: {
        title: page.title || page.name,
        description: page.description
      }
    })
  }
  return route
}

let routes = registerRoute(NavConfig)
routes.push({
  path: '/',
  name: 'HelloWorld',
  component: HelloWorld,
  meta: {
    title: '管理后台'
  }
})

export default new Router({
  routes: routes
})
