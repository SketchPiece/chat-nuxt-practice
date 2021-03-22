export const state = () => ({
  user: {},
  messages: [],
  users: []
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_DATA(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_NEW_MESSAGE(state, message) {
    state.messages.push(message);
  },
  SOCKET_UPDATE_USERS(state, users) {
    state.users = users;
  }
};
