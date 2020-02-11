import Vue from 'vue'
import Vuex from 'vuex'

export const strict = false

export const state = () => ({
  user: null,
  userinfo: null,
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setUserInfo (state, payload) {
    state.userinfo = payload
  },
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setUserInfo ({ commit }, payload) {
    commit('setUserInfo', payload)
  },
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}
