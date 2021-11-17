import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentChatRoom: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
    },
    SET_CHAT_ROOM(state, room) {
      state.currentChatRoom = room;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setRoom({ commit }, room) {
      commit("SET_CHAT_ROOM", room);
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
    currentChatRoom: (state) => state.currentChatRoom,
  },
});
export default store;
