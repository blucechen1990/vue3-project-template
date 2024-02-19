import LoadMore from './LoadMore/index.vue'


const comps = {
    LoadMore,
}

function installGlobalComponents(app) {
    Object.keys(comps).forEach(CompName => {
        app.component(CompName, comps[CompName])
    })
}

export default installGlobalComponents