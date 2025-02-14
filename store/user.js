import {CONSTANTS} from "@/utils/constant";
import {API_USER} from "~/api/user";

const actions = {
  async apiGetListUser({commit, state}, payload) {
    try {
      let {data} = await this.$axios.post(`${API_USER.apiGetListUser}/get-list`, payload)
      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
};

export const state = () => ({
  users: []
});


const getters = {
  products(state) {
    return state.users
  }
};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations
}
