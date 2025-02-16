import {CONSTANTS} from "@/utils/constant";
import {API_NOTIFICATION} from "~/api/notification";

const actions = {
  async apiGetAllNotification({commit, state}, payload) {
    try {
      let {data} = await this.$axios.post(`${API_NOTIFICATION.apiNotification}/find-all`, payload)
      // let {data} = await this.$axios.post("http://localhost:8007/api/v1.0/notifications/find-all", payload)
      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  addNotification({ commit }, notification) {
    commit('addNotification', notification);
  },
  setNotifications({ commit }, notifications) {
    commit('setNotifications', notifications);
  },
};

export const state = () => ({
  notifications: []
});


const getters = {
  products(state) {
    return state.notifications
  }
};

const mutations = {
  addNotification(state, data) {
    state.notifications.push(data)
  },
  setNotifications(state, data) {
    state.notifications = data
  }
};

export default {
  actions,
  state,
  getters,
  mutations,
};
