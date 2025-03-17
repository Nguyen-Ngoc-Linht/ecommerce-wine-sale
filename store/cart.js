import {CONSTANTS} from "@/utils/constant";
import {API_CART} from "@/api/cart";
import {getSessionCart, getUserInfo, setSessionCart} from "@/utils/cookieAuthen";

const actions = {
  async apiGenerateSessionKey({ commit, state }) {
    try {
      let { data } = await this.$axios.get(`${API_CART.apiCartSessionGenerate}`)

      if (data.code === 201) {
        setSessionCart(data.data.cartSessionId)

        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiGetCartSessionKey({commit, state}) {
    try {
      const sessionKey = getSessionCart()
      let { data } = await this.$axios.get(`${API_CART.apiCartSession}/${sessionKey}`);

      if (data.code === 200) {
        return data.data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiAddProductCartSession({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_CART.apiCartSessionAdd}`, payload)

      if (data.code === 201) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiRemoveProductCartSession({commit, state}, payload) {
    try {
      let { data } = await this.$axios.delete(`${API_CART.apiCartSessionRemove}`, {
        data: payload
      })

      if (data.status === 200) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiRemoveCartSession({commit, state}) {
    try {
      let { data } = await this.$axios.delete(`${API_CART.apiCartSession}`)

      if (data.status === 200) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },

  async apiHandleCart({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_CART.apiHandleCart}`, payload)

      if (data.code === 201) {}
    } catch (e) {
      console.log(e)
    }
  },
  async apiGetCartUsers({commit, state}, user_id) {
    try {
      let { data } = await this.$axios.get(`${API_CART.apiCartUser}/${user_id}`)

      if (data.code === 200) {
        return data.data
      }
      // return data
    } catch (e) {
      console.log(e)
    }
  },
  async apiAddProductCart({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_CART.apiCartAdd}`, payload)

      if (data.code === 201) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiRemoveProductCart({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_CART.apiCartRemove}`, payload)

      if (data.status === 200) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },

  async apiCreateOder({commit, state}, payload) {
    try {
      let { data } = await this.$axios.post(`${API_CART.apiCreateOrder}`, payload)

      if (data.code === 201) {
        return data.data
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
