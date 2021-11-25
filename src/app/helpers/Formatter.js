import { NATIVE2STR_TYPES_MAP, STR2HTML_FORM_TYPES_MAP, } from '@app/constants/Types.js'

export const formatComponentPath = (cPath, rev = false) => {
  if (!rev) {
    cPath = cPath.replace('/', '-')
    cPath = cPath.substr(0, cPath.indexOf('.vue'))
    return cPath
  } else {
    return `${cPath.replace('-', '/')}.vue`
  }
}

export const formatFromNativeType = (type) => {
  for (const [typeName, nType] of Object.entries(NATIVE2STR_TYPES_MAP)) {
    if (type === nType) {
      return typeName
    }
  }
  return undefined
}

export const formatFromStrType = (type) => {
  for (const [typeName, nType] of Object.entries(STR2HTML_FORM_TYPES_MAP)) {
    if (type === nType) {
      return typeName
    }
  }
  return undefined
}

export const convertPropObjectToArray = (obj) => {
  let fmtValue = []
  for (const [name, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value)) { // Object
      const row = {
        name,
        type: '$object',
        raw: value,
        value: convertPropObjectToArray(value),
      }
      fmtValue.push(row)
    } else if (typeof value === 'object' && Array.isArray(value)) { // Array
    //   // ...
    } else { // Primitive
      fmtValue.push({
        name,
        type: typeof value,
        value,
      })
    }
  }
  return fmtValue
}