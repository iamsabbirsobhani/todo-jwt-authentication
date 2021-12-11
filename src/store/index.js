import { createStore } from 'vuex'
import { auth } from './auth.module'
export default createStore({
  state: {
    name: null,
  },
  mutations: {
    setName(state, payload) {
      state.name = payload
    }
  },
  actions: {

  },
  modules: {
    auth,
  }
})
