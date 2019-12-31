import api from '../../api/dashboard'

const state = {}
const mutations = {}

const actions = {
  getWarehousingNo (context, params) {
    return api.getWarehousingNo()
  }
}

export default {
  state,
  mutations,
  actions
}
