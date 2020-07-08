import * as api from "../../../api";

const actions = {
  REGISTER({ dispatch, state }, { name, email, password }) {
    return api.user.create(name, email, password)
      .then(data => {
      })
  },
  LOGIN ({ commit }, { email, password }) {
    return api.auth.login(email, password)
      .then(({ id, token }) => {
        commit('SET_USER_ID',id)
        commit('LOGIN',token)
      })
  },
  GET_PROFILE({ commit }, {id}) {
    return api.user.fetch(id)
      .then(data => {
        commit('SET_PROFILE', data)
      })
  }
}

const mutations = {
  SET_USER_ID (state, id) {
    state.userId = id
    localStorage.setItem('userId', id)
  },
  LOGIN (state, token) {
    if(!token) return
    state.token = token
    localStorage.setItem('token', token)
    api.setAuthInHeader(token)
  },
  LOGOUT (state) {
    state.token = null
    state.userId = ''
    delete localStorage.token
    delete localStorage.vuex
    api.setAuthInHeader(null)
  },
  SET_PROFILE (state, profile) {
    state.userProfile = profile
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
