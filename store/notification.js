import {CONSTANTS} from "@/utils/constant";
import {API_NOTIFICATION} from "~/api/notification";

const actions = {
  async apiGetAllNotification({commit, state}, payload) {
    try {
      // let {data} = await this.$axios.post(`${API_NOTIFICATION.apiNotification}/find-all`, payload)
      let {data} = await this.$axios.post("http://localhost:8007/api/v1.0/notifications/find-all", payload)
      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  // Tạo một sản phẩm
  // async apiCreateNotification({commit, state}, payload) {
  //   try {
  //     let {data} = await this.$axios.post(`${API_NOTIFICATION.apiProduct}`, payload)
  //
  //     if (data.code === 201) {
  //       return data
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },
  // async apiGetDetailProduct({commit, state}, id_product) {
  //   try {
  //     let {data} = await this.$axios.get(`${API_NOTIFICATION.apiProduct}/${id_product}`);
  //
  //     if (data.code === CONSTANTS.SUCCESS) {
  //       return data
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },
  // async apiUpdateProduct({commit, state}, {id_product, payload}) {
  //   try {
  //     let {data} = await this.$axios.put(`${API_NOTIFICATION.apiProduct}/${id_product}`, payload)
  //     if (data.code === CONSTANTS.SUCCESS) {
  //       return data
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // },
  // async apiDeleteProduct({commit, state}, id_product) {
  //   try {
  //     let { data } = await this.$axios.delete(`${API_NOTIFICATION.apiProduct}/${id_product}`);
  //
  //     if (data.code === CONSTANTS.SUCCESS) {
  //       return data
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
};

export const state = () => ({
  products: []
});


const getters = {
  products(state) {
    return state.products
  }
};

const mutations = {};

export default {
  actions,
  state,
  getters,
  mutations,
};
