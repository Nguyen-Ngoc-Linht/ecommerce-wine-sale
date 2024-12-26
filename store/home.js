import {API_VIDEO} from "@/api/cart";

const actions = {
  async apiGetListVideoTop({ commit, state }) {
    try {
      let { data } = await this.$axios.get(
        `${API_VIDEO.apiVideoTop}`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};

const state = () => ({});

const getters = {};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations,
};
