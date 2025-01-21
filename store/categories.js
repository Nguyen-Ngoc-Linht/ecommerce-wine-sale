import {CONSTANTS} from "@/utils/constant";
import {API_CATEGORY} from "@/api/category";

const actions = {
  async apiGetCategoriesAll({commit, state}, payload) {
    try {
      let {data} = await this.$axios.post(`${API_CATEGORY.apiCategoriesAll}`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
        return data.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiCreateCategory({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_CATEGORY.apiCategory}`, payload)

      if (data.code === 201) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiUpdateCategory({commit, state}, {id_category, payload}) {
    try {
      let { data } = await this.$axios.put(`${API_CATEGORY.apiCategory}/${id_category}`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
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

