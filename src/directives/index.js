import numberForm from './numberForm'

// 指令集合
const directives =  {
    focus: {
        mounted: (el) => el.focus()
    },
    ...numberForm
}

export default function install(app) {
    const directiveNames = Object.keys(directives)
    directiveNames.forEach(directiveName => {
        app.directive(directiveName, directives[directiveName])
    })
}