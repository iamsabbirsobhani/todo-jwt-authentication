import { createStore } from 'vuex'
import { auth } from './auth.module'
export default createStore({
  state: {
    name: null,
    registrationSuccessMsg: null,
  },
  mutations: {
    setName(state, payload) {
      state.name = payload
    },
    setRegistrationSuccessMsg(state, payload) {
      state.registrationSuccessMsg = payload
    }
  },
  actions: {

  },
  modules: {
    auth,
  }
})
