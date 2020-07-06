import * as api from "../../../api";

const actions = {
  REGISTER({ dispatch, state }, { name, email, password }) {
    return api.user.create(name, email, password)
      .then(data => {
      })
  },
  LOGIN ({ commit }, { email, password }) {
    return api.auth.login(email, password)
      .then(({ token }) => commit('LOGIN', token))
  }
}

const mutations = {
  LOGIN (state, token) {
    if(!token) return
    state.token = token
    localStorage.setItem('token', token)
    api.setAuthInHeader(token)
  },
  LOGOUT (state) {
    state.token = null
    delete localStorage.token
    api.setAuthInHeader(null)
  }
}

const getters = {
  isAuth (state) {
    return !!state.token
  }
}

export default {
  actions,
  mutations,
  getters
}
