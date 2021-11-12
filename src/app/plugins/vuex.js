import Vue from 'vue'
import Vuex from 'vuex'
import user_components from '@app/store/user_components/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user_components,
  },
})

export default store
