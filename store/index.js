export const actions = {
  addNotification({ commit }, notification) {
    commit('addNotification', notification);
  },
};

export const state = () => ({
  user: null,
  notifications: [],
});


export const getters = {
  notifications(state) {
    return state.notifications;
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  addNotification(state, notification) {
    state.notifications.push(notification);
  },
};

export default {
  actions,
  state,
  getters,
  mutations,
};
