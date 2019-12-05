let state = {
  moduleName: ''
}

let mutations = {
  updateModuleName(state, data) {
    state.moduleName = data
  }
}

let actions = {}

export default {
  namespace: true,
  state,
  actions,
  mutations
}
