import { DateTime } from 'luxon'
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

export const parsePrimitiveValue = (value, type) => {
  switch (type) {
    case 'boolean':
      return Boolean(value)
    case 'string':
      return value
    case 'number':
      return parseInt(value)
    case 'date':
      const dt = DateTime.fromISO(value)
      return dt.toISO()
  }
  return value
}

export const formatPrimitiveValueToCode = (value, type) => {
  switch (type) {
    case 'string':
      return `"${value}"`
    case 'boolean':
    case 'number':
      return value.toString()
    case 'date':
      const dt = DateTime.fromISO(value)
      return dt.toISO()
  }
  return value
}

export const convertPropObjectToArray = (obj) => {
  let fmtValue = []
  for (const [name, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value)) { // Object
      const row = {
        name,
        type: '$object',
        rawValue: value,
        value: convertPropObjectToArray(value),
      }
      fmtValue.push(row)
    } else if (typeof value === 'object' && Array.isArray(value)) { // Array
    //   // ...
    } else { // Primitive
      fmtValue.push({
        name,
        type: typeof value,
        rawValue: value,
        value: parsePrimitiveValue(value, typeof value),
      })
    }
  }
  return fmtValue
}

export const convertPropArrayToObject = (arr) => {
  return arr
}
