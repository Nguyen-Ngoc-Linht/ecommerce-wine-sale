import {CONSTANTS} from "@/utils/constant";
import {API_ATTRIBUTES} from "@/api/attributes";

const actions = {
  async apiGetAttributesAll({commit, state}, payload) {
    try {
      let {data} = await this.$axios.post(`${API_ATTRIBUTES.apiAttributesAll}`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
        return data.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiCreateAttribute({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_ATTRIBUTES.apiAttributes}`, payload)

      if (data.code === 201) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiUpdateAttribute({commit, state}, {id_attribute, payload}) {
    try {
      let { data } = await this.$axios.put(`${API_ATTRIBUTES.apiAttributes}/${id_attribute}`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiDeleteAttribute({commit, state}, id_attribute) {
    try {
      let { data } = await this.$axios.delete(`${API_ATTRIBUTES.apiAttributes}/${id_attribute}`)

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

