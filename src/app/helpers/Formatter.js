export const formatComponentPath = cPath => {
  cPath = cPath.replace('/', '-')
  cPath = cPath.substr(0, cPath.indexOf('.vue'))
  return cPath.replace('/', '-')
}
