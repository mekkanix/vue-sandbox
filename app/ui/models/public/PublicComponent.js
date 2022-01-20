export default class PublicComponent {
  scriptName = null
  scriptUrl = null
  _compiledObject = null
  _$script = null
  name = null

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
      this._$script.onload = () => {
        // TODO: VSPC -> webpack-generated library name; use constant to store this value
        if (VSPC) {
          this._compiledObject = VSPC
          this.name = VSPC.name
        }
      }
      document.head.append(this._$script)
    }
  }
}
