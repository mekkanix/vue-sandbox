export const isValidPropName = (name) => {
  return name !== null ? name.toString().search(/[a-z]/i) !== -1 : false
}

export const isValidCodeValue = (value) => {
  // NOTE: Use this code basis if custom validation processes/errors are needed.
  // For now, simple `JSON.parse` error handling makes the trick for generic error management.
  // ("Don't reinvent the wheel, huh?")
  // ==========
  /* const stringDelimiters = value.match(/"|'/g)
  const validString = !!(stringDelimiters && stringDelimiters.length === 2)
  const validBoolean = ['true', 'false',].includes(value)
  const validNumber = !isNaN(parseInt(value))
  console.log(value, validString, validBoolean, validNumber);
  return validString || validBoolean || validNumber */

  try {
    JSON.parse(value)
    return true
  } catch (e) {
    return false
  }
}
