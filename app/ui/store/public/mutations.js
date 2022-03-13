import PComponent from '@ui/models/public/PublicComponent.js'

export default {
  setPublicComponents (state, payload) {
    const components = payload.map(apiComponent => new PComponent(
      apiComponent.relPath,
      apiComponent.scriptName,
      apiComponent.scriptUrl
    ))
    state.components = components
  },
}
