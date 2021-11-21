import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentChatRoom: null,
    currentChatUser: null,
    isPrivate: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
    },
    SET_CHAT_ROOM(state, room) {
      state.currentChatRoom = room;
    },
    SET_CHAT_USER(state, user) {
      state.currentChatUser = user;
    },
    SET_PRIVATE(state, isPrivate) {
      state.isPrivate = isPrivate;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setRoom({ commit }, room) {
      commit("SET_CHAT_ROOM", room);
    },
    setChatUser({ commit }, user) {
      commit("SET_CHAT_USER", user);
    },
    setPrivate({ commit }, isPrivate) {
      commit("SET_PRIVATE", isPrivate);
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
    currentChatRoom: (state) => state.currentChatRoom,
    currentChatUser: (state) => state.currentChatUser,
    isPrivate: (state) => state.isPrivate,
  },
});
export default store;
