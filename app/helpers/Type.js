import { NATIVE2STR_TYPES_MAP } from '@/constants/Types.js'

export const isOfPrimitiveType = (value) => {
  for (const [, type] of Object.entries(NATIVE2STR_TYPES_MAP)) {
    if (value === type) {
      return true
    }
  }
  return false
}
