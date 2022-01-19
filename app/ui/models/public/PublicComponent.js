export default class PublicComponent {
  scriptFilename = null
  scriptUrl = null

  constructor (scriptFilename, scriptUrl) {
    this.scriptFilename = scriptFilename
    this.scriptUrl = scriptUrl
    this._initInstanciation()
  }

  _initInstanciation() {
    
  }
}
