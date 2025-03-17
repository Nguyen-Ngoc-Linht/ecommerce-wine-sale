import {CONSTANTS} from "@/utils/constant";
import {API_PAYMENT} from "@/api/payment";

const actions = {
  async apiGenerateQRCode({commit, state}, payload) {
    try {
      let {data} = await this.$axios.post(`${API_PAYMENT.apiGenerateQRCode}`, payload)

      if (data.code === 201) {
        return data.data
      }
    } catch (e) {
      console.log(e)
    }
  },
};

export const state = () => ({
});


const getters = {
};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations,
};

