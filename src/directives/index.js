import numberFormat from './number-format'

// 指令集合
const directives =  {
    focus: {
        mounted: (el) => el.focus()
    },
    ...numberFormat
}

export default function install(app) {
    const directiveNames = Object.keys(directives)
    directiveNames.forEach(directiveName => {
        app.directive(directiveName, directives[directiveName])
    })
}