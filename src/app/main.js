import Vue from 'vue'
import router from '@app/plugins/router.js'
import '@app/plugins/bootstrap-vue.js'
import VSApp from '@app/components/VSApp.vue'

const init = () => {
  // Generate list of user-provided components
  let components = []
  const ctxs = require.context('@public/components/', true, /\.vue$/i)
  ctxs
    .keys()
    .forEach(filename => {
      const module = ctxs(filename).default
      components.push(module)
    })

  // Initialize VS app
  new Vue({
    el: '#vs-app',
    render: h => h(VSApp, {
      props: { components, }
    }),
    router,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
