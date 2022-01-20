export default class PublicComponent {
  scriptName = null
  scriptUrl = null
  compiledComponent = null
  _$script = null

  constructor (scriptName, scriptUrl) {
    this.scriptName = scriptName
    this.scriptUrl = scriptUrl
    this._initInstanciation()
  }

  _initInstanciation() {
    if (this.scriptUrl) {
      this._$script = document.createElement('script')
      this._$script.setAttribute('type', 'text/javascript')
      this._$script.setAttribute('id', this.scriptName.replace('/', '-'))
      this._$script.setAttribute('src', this.scriptUrl)
      console.log(this._$script);
      document.head.append(this._$script)
    }
  }
}
