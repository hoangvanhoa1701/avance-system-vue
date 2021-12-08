// import store from '@/store'
import actions from './auth.actions'
import getters from './auth.getters'
import mutations from './auth.mutations'

// Initial state
const state = {
  user: {},
  loading: false,
  status: '',
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}
