import PublicComponent from '@ui/models/public/PublicComponent.js'

export default {
  setPublicComponents (state, payload) {
    const components = payload.map(apiComponent => new PublicComponent(
      apiComponent.scriptFilename,
      apiComponent.scriptUrl
    ))
    state.components = components
  },
}
