import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    credentials: {},
    signedIn: false,
    profileExists: false,
    profile: {},
    API_URL: {
      development: "http://localhost:6080",
      staging: "http://localhost:6080",
      production: "http://localhost:6080",
    }
  },
  mutations: {
    setProfile(state, payload){
      delete(payload.DeletedAt)
      state.profile = payload
    },
    setProfileExists(state, payload){
      state.profileExists = payload
    },
    setCredentials(state, payload){
      state.credentials = payload
    },
    setSignedIn(state, payload){
      state.signedIn = payload
    },
  },
  actions: {
    setProfile(context, payload){
      context.commit('setProfile', payload)
    },
    setProfileExists(context, payload){
      context.commit('setProfileExists', payload)
    },
    setCredentials(context, payload){
      context.commit('setCredentials', payload)
    },
    setSignedIn(context, payload){
      context.commit('setSignedIn', payload)
    },
  },
  modules: {
  }
})
