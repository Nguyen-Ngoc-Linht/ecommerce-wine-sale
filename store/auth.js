import {CONSTANTS} from "@/utils/constant";
import {setAccessToken, setSessionCart, setUserInfo} from "@/utils/cookieAuthen";
import {API_AUTH} from "@/api/auth";

const actions = {
  async apiSignIn({ commit, state }, payload) {
    try {
      let { data } = await this.$axios.post(`${API_AUTH.apiSignIn}`, payload, {
        headers: {
          'Accept-Language': 'vi'
        }
      })

      if (data.code === 200) {
        setAccessToken(data.data.token)
        const user = {
          id: data.data.userId,
          name: data.data.firstName + data.data.lastName,
          email: data.data.email,
          phone: data.data.phoneNumber,
        }
        setUserInfo(user)
        return data
      }
    } catch (e) {
      console.log(e)
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
