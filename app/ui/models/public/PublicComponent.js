export default class PublicComponent {
  relPath = null
  scriptName = null
  scriptUrl = null
  vCompName = null
  compiledObject = null
  _elScript = null

  constructor (relPath, scriptName, scriptUrl) {
    this.relPath = relPath
    this.scriptName = scriptName
    this.scriptUrl = scriptUrl
    this._initInstanciation()
  }

  _initInstanciation() {
    if (this.scriptUrl) {
      this._elScript = document.createElement('script')
      this._elScript.setAttribute('type', 'text/javascript')
      this._elScript.setAttribute('id', this.scriptName)
      this._elScript.setAttribute('src', this.scriptUrl)
      this._elScript.onload = () => {
        let vspcLib = null
        try {
          vspcLib = eval(`VSPC__${this.scriptName}`) // needed to retrieve VComp object from dynamic value
        } catch (e) {
          console.error(e)
        }
        if (vspcLib) {
          this.compiledObject = vspcLib
          this.vCompName = vspcLib.name
        }
      }
      document.head.append(this._elScript)
    }
  }
}
