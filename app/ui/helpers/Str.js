export const random = (len = 8) => {
  let text = ''
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < len; i += 1) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
  }
  return text
}
