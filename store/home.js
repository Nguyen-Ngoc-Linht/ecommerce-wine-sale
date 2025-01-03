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

const state = () => ({
  listBanner: [
    {
      id: 1,
      url: 'https://theme.hstatic.net/200000915913/1001284600/14/ms_banner_img1.jpg?v=128',
      name: 'anh_tet',
    },
    {
      id: 2,
      url: 'https://theme.hstatic.net/200000915913/1001284600/14/ms_banner_img2.jpg?v=128',
      name: 'ruou_vang',
    },
    {
      id: 3,
      url: 'https://theme.hstatic.net/200000915913/1001284600/14/ms_banner_img3.jpg?v=128',
      name: 'qua_tang',
    },
  ],
});

const getters = {
  getBanner(state) {
    return state.listBanner
  }
};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations,
};
