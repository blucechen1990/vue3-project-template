import positiveFormat from './positive-num-precision'
import numberFormat from './format-to-number'

// 指令集合
const directives = {
  ...positiveFormat,
  ...numberFormat
}

export default function install(app) {
  const directiveNames = Object.keys(directives)
  directiveNames.forEach((directiveName) => {
    app.directive(directiveName, directives[directiveName])
  })
}
