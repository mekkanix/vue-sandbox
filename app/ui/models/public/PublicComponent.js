export default class PublicComponent {
  relPath = null
  scriptName = null
  scriptUrl = null
  _compiledObject = null
  _$script = null
  vCompName = null

  constructor (relPath, scriptName, scriptUrl) {
    this.relPath = relPath
    this.scriptName = scriptName
    this.scriptUrl = scriptUrl
    this._initInstanciation()
  }

  _initInstanciation() {
    if (this.scriptUrl) {
      this._$script = document.createElement('script')
      this._$script.setAttribute('type', 'text/javascript')
      this._$script.setAttribute('id', this.scriptName)
      this._$script.setAttribute('src', this.scriptUrl)
      this._$script.onload = () => {
        let vspcLib = null
        try {
          vspcLib = eval(`VSPC__${this.scriptName}`) // needed to retrieve VComp object from dynamic value
        } catch (e) {
          console.error(e)
        }
        if (vspcLib) {
          this._compiledObject = vspcLib
          this.vCompName = vspcLib.name
        }
      }
      document.head.append(this._$script)
    }
  }
}
