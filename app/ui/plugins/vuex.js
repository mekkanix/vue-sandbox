import Vue from 'vue'
import Vuex from 'vuex'
import public_ from '@ui/store/public/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    public: public_,
  },
})

export default store
