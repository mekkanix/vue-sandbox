import axios from 'axios'

export default {
  fetchPublicComponents({ commit }) {
    axios
      .get('/api/public/components')
      .then(response => {
        commit('setPublicComponents', response.data)
      })
  }
}
