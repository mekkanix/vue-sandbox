import Vue from 'vue'
import router from '@app/plugins/router.js'
import store from '@app/plugins/vuex.js'
import '@app/plugins/bootstrap-vue.js'
import VSApp from '@app/components/VSApp.vue'

const init = () => {
  // Generate list of user-provided components
  let components = []
  const ctxs = require.context('@public/components/', true, /\.vue$/i)
  ctxs
    .keys()
    .forEach(filepath => {
      const module = {
        component: ctxs(filepath).default,
        filepath: filepath.substr(2),
      }
      components.push(module)
    })

  // Initialize VS app
  new Vue({
    el: '#vs-app',
    render: h => h(VSApp, {
      props: { components, }
    }),
    router,
    store,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
