import { NATIVE2STR_TYPES_MAP, NATIVE2HTML_FORM_TYPES_MAP, } from '@app/constants/Types.js'

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
  for (const [typeName, nType] of Object.entries(NATIVE2HTML_FORM_TYPES_MAP)) {
    if (type === nType) {
      return typeName
    }
  }
  return undefined
}
