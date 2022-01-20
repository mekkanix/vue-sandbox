/*!
 * VueSandbox v1.0.0-beta.2
 * (c) 2021-2021 Mekkanix
 * Released under the MIT License.
 */

import Vue from 'vue'
import router from '@ui/plugins/router.js'
import store from '@ui/plugins/vuex.js'
import '@ui/plugins/bootstrap-vue.js'
import VSApp from '@ui/components/VSApp.vue'

const init = () => {
  // // Generate list of user-provided components
  // let components = []
  // const ctxs = require.context('@public/components/', true, /\.vue$/i)
  // ctxs
  //   .keys()
  //   .forEach(filepath => {
  //     const module = {
  //       component: ctxs(filepath).default,
  //       filepath: filepath.substr(2),
  //     }
  //     components.push(module)
  //   })

  // Initialize VS app
  new Vue({
    el: '#vs-app',
    render: h => h(VSApp),
    router,
    store,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
