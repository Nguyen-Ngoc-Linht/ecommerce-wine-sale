import {CONSTANTS} from "@/utils/constant";
import {API_PRODUCT} from "~/api/product";

const actions = {
  async apiGetAllProducts({commit, state}, payload) {
    try {
      let {data} = await this.$axios.post(`${API_PRODUCT.apiProduct}/find-all`, payload)

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
      let {data} = await this.$axios.post(`${API_PRODUCT.apiProduct}`, payload)

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiGetDetailProduct({commit, state}, id_product) {
    try {
      let {data} = await this.$axios.get(`${API_PRODUCT.apiProduct}/${id_product}`);

      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  },
  async apiUpdateProduct({commit, state}, {id_product, payload}) {
    try {
      let {data} = await this.$axios.put(`${API_PRODUCT.apiProduct}/${id_product}`, payload)
      if (data.code === CONSTANTS.SUCCESS) {
        return data
      }
    } catch (e) {
      console.log(e)
    }
  }
};

export const state = () => ({
  products: [
    {
      id: 968,
      name: "Durable Cotton Table",
      description: "Ab perspiciatis ab.",
      price: 43508531,
      category: {
        id: 1,
        name: "Bình dân",
        description: "Rượu giá rẻ, phù hợp với mọi túi tiền."
      },
      images: ['https://product.hstatic.net/200000917535/product/btt_fortunatto_carmenere_2022__red_label__0cddc0a2bc904790acf148d4adf40003_large.png'],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 969,
      name: "Rustic Granite Knife",
      description: "Tempora recusandae tempora libero.",
      price: 9029646,
      category: {
        id: 7,
        name: "Rượu trái cây",
        description: "Nhẹ nhàng, ngọt ngào từ các loại trái cây thiên nhiên."
      },
      images: ['https://product.hstatic.net/200000917535/product/ang_phap_domaine_saint_andre_chardonnay_igp_pays_d_oc_blanc_2022_750ml_12fbee83ae1d463a90e30181193ccbb8_large.png'],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 970,
      name: "Small Wool Knife",
      description: "Cumque inventore soluta suscipit sit voluptates architecto.",
      price: 41182028,
      category: {
        id: 9,
        name: "Rượu vang cao cấp",
        description: "Bộ sưu tập rượu vang đẳng cấp, dành riêng cho người yêu vang."
      },
      images: ['https://product.hstatic.net/200000917535/product/btt_fortunatto_family_reserve_carmenere_2019_8d2ce875c9a843b69645affd706ec15b_large.png'],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 971,
      name: "Intelligent Bronze Clock",
      description: "Suscipit consequuntur ipsa ad unde ducimus minima hic.",
      price: 70293251,
      category: {
        id: 7,
        name: "Rượu trái cây",
        description: "Nhẹ nhàng, ngọt ngào từ các loại trái cây thiên nhiên."
      },
      images: [],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 972,
      name: "Fantastic Cotton Car",
      description: "Autem reiciendis minima in ab accusamus incidunt.",
      price: 43680622,
      category: {
        id: 2,
        name: "Rượu vang đỏ",
        description: "Những chai vang đỏ tinh tế, đậm vị, thích hợp cho các bữa tiệc sang trọng."
      },
      images: [],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 973,
      name: "Synergistic Copper Bottle",
      description: "Corrupti aliquam similique dicta voluptate quis.",
      price: 31989624,
      category: {
        id: 9,
        name: "Rượu vang cao cấp",
        description: "Bộ sưu tập rượu vang đẳng cấp, dành riêng cho người yêu vang."
      },
      images: [],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 974,
      name: "Mediocre Silk Plate",
      description: "Voluptatem minus sunt voluptates nemo optio est temporibus.",
      price: 64566092,
      category: {
        id: 8,
        name: "Rượu thủ công",
        description: "Những chai rượu sản xuất theo cách thủ công, độc đáo và đầy nghệ thuật."
      },
      images: [],
      productAttributes: [],
      viewCount: 0
    },
    {
      id: 975,
      name: "Gorgeous Concrete Clock",
      description: "Iusto vitae qui.",
      price: 19300272,
      category: {
        id: 3,
        name: "Rượu vang trắng",
        description: "Hương vị nhẹ nhàng, tươi mới, hoàn hảo cho món hải sản và salad."
      },
      images: [],
      productAttributes: [],
      viewCount: 0
    },
  ]
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
