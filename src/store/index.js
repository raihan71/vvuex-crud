import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { HTTP, service } from './../configs'

Vue.use(Vuex);
Vue.use(VueAxios, HTTP);

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    GET_USER(state,users){
      state.users = users;
    },
  },
  actions: {
    getUsers({ commit }){
      return HTTP.get(service.crud.list)
          .then(resp => resp.data.data)
          .then(users => {
            commit('GET_USER', users);
            return true;
          });
    },
    createUser({ dispatch }, payload){
      return HTTP.post(service.crud.create, payload)
          .then(resp => resp.data)
          .then(() => {
            dispatch('getUsers');
            return true;
          }).catch(err => {
            return err.message;
          });
    },
    updateUser({dispatch }, payload){
      return HTTP.post(service.crud.update, payload)
          .then(resp => resp.data)
          .then(() => {
            dispatch('getUsers');
            return true;
          }).catch(err => {
            return err.message;
          });
    },
    deleteUser({dispatch }, payload){
      return HTTP.post(service.crud.delete, payload)
          .then(resp => resp.data)
          .then(() => {
             dispatch('getUsers');
             return true;
          }).catch(err => {
            return err.message;
          });
    }
  },
  modules: {
  }
});
