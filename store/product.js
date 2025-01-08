import {CONSTANTS} from "@/utils/constant";
import {API_PRODUCT} from "~/api/product";

const actions = {
  async apiGetAllProducts({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_PRODUCT.apiProduct}/find-all`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  // Tạo một sản phẩm
  async apiCreateProduct({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_PRODUCT.apiProduct}`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiGetDetailProduct({commit, state}, id_product) {
    try {
      let { data } = await this.$axios.get(`${API_PRODUCT.apiProduct}/${id_product}`);

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiUpdateProduct({commit, state}, {id_product, payload}) {
    try {
      let { data } = await this.$axios.put(`${API_PRODUCT.apiProduct}/${id_product}`, payload)
      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  }
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
