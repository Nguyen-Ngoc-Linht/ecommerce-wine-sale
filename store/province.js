import {CONSTANTS} from "@/utils/constant";
import {API_CATEGORY} from "@/api/category";
import {API_PROVINCE} from "@/api/province";

const actions = {
  async apiGetProvince({commit, state}) {
    try {
      let {data} = await this.$axios.get(`${API_PROVINCE.apiProvince}`)

      if (data.code === CONSTANTS.SUCCESS) {
        return data.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiDistricts({commit, state}, id_province) {
    try {
      let { data } = await this.$axios.get(`${API_PROVINCE.apiDistricts}/${id_province}`)

      if (data.code === 201) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiGetWards({commit, state}, id_districts) {
    try {
      let { data } = await this.$axios.get(`${API_PROVINCE.apiWards}/${id_districts}`)

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiDeleteCategory({commit, state}, id_category) {
    try {
      let { data } = await this.$axios.delete(`${API_CATEGORY.apiCategory}/${id_category}`)

      if (data.code === 200) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  }
};

export const state = () => ({
  attributes: []
});


const getters = {
  attributes(state) {
    return state.attributes
  }
};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations,
};

