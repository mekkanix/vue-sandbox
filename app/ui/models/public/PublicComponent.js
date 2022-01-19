export default class PublicComponent {
  scriptFilename = null
  scriptUrl = null
  compiledComponent = null
  _$script = null

  constructor (scriptFilename, scriptUrl) {
    this.scriptFilename = scriptFilename
    this.scriptUrl = scriptUrl
    this._initInstanciation()
  }

  _initInstanciation() {
    if (this.scriptUrl) {
      this._$script = document.createElement('script')
      this._$script.setAttribute('type', 'text/javascript')
      this._$script.setAttribute('id', this.scriptFilename.replace('/', '-'))
      this._$script.setAttribute('src', this.scriptUrl)
      console.log(document.head.append(this._$script))
    }
  }
}
