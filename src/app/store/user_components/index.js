import getters from './getters.js'
import mutations from './mutations.js'

const state = () => ({
  userComponents: [],
})

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
