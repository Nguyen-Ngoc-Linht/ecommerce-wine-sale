import {CONSTANTS} from "@/utils/constant";
import {API_UPLOAD} from "@/api/upload";

const actions = {
  async apiUploadFile({commit, state}, formData) {
    try {
      let {data} = await this.$axios.post(`${API_UPLOAD.apiUpload}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

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

