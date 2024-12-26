const actions = {
  async apiGetListVideoTop({ commit, state }) {
    try {
      let { data } = await this.$axios.get(
        `https://api-esport.ivyplay.vn/api/esports/videos/top`
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
