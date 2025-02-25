<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-between mt-3 px-2">
      <div class="d-flex align-items-center gap-3">
        <h4 class="mb-0">{{ infoProduct.name }}</h4>
        <span class="text-sm text-secondary mb-0">Đã bán: 346</span>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span class="px-3 py-1 bg-gradient-info text-white rounded-2 text-sm cursor-pointer">Thích</span>
        <span class="px-3 py-1 bg-gradient-info text-white rounded-2 text-sm cursor-pointer">Chia sẻ</span>
      </div>
    </div>
    <div class="row mt-2 pb-4">
      <div class="col-8">
        <div class="card card-body">
          <div class="w-100">
            <el-carousel
              :interval="0"
              arrow="always"
              style="width: 100%; aspect-ratio: 1.8/1"
              :initial-index="activeIndex"
              @change="handleSlideChange"
              ref="carousel"
            >
              <el-carousel-item v-for="image in listImage" :key="image.id" class="swiper-slide-product">
                <img :src="image.url" :alt="image.name" class="w-100 image-banner">
              </el-carousel-item>
            </el-carousel>

            <div class="d-flex list-image-preview gap-2 mt-3">
              <div v-for="(image, index) in listImage" class="img-preview" :class="{'active-image-preview': activeIndex === index}">
                <img
                  :src="image.url"
                  :alt="image.name"
                  @click="changeSlide(index)"
                  class="w-100 h-100"
                >
              </div>
            </div>
            <div class="mt-4">
              <h6>Mô tả sản phẩm:</h6>
              <p>{{ infoProduct.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card card-body">
          <div>
            <h5 class="mb-0">Thông tin sản phẩm</h5>
            <hr class="my-1">
            <div class="d-flex flex-column">
              <h6 class="text-black mb-1">{{ infoProduct.name }}</h6>
              <span v-for="attributes in infoProduct.productAttributes">
                {{attributes.attribute.name}}: {{ attributes.value }}
              </span>
              <h5 class="mb-0 mt-2">
                Giá bán:
                <span class="text-danger">{{ formatPrice(variantChoose.price) }}</span>
              </h5>
            </div>
          </div>
          <div class="d-flex gap-2 mt-3">
            <div
              v-for="(variant, index) in infoProduct.productVariants"
              class="bg-light px-3 py-1 rounded-2 cursor-pointer"
              :class="{'activate-variant': activeVariant === index}"
              @click="setVariantChoose(index)"
            >
              <span class="text-sm">{{ variant.variantAttributes[0].value }}</span>
            </div>
          </div>
          <div class="d-flex align-items-center mt-3">
            <span class="text-sm mb-0 me-2">Số lượng:</span>
            <div class="d-flex align-items-center gap-1">
              <div class="bg-light icon-action cursor-pointer" @click="quantity > 1 ? quantity-- : 1">
                <i class="el-icon-minus"></i>
              </div>
              <div class="bg-light icon-action">
                <span class="text-sm">{{ quantity }}</span>
              </div>
              <div class="bg-light icon-action cursor-pointer" @click="quantity++">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
          <hr class="my-3">
          <el-row :gutter="10">
            <el-col :span="12">
              <button @click.stop="addProductCart" class="btn bg-gradient-secondary w-100">Thêm vào giỏ hàng</button>
            </el-col>
            <el-col :span="12">
              <button @click.stop="buyNowProduct" class="btn bg-gradient-danger w-100">Mua ngay</button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <el-dialog
      :title="'Mua ngay'"
      :visible.sync="showBuyDialog"
      :width="'1200px'"
      append-to-body
    >
      <BuyNow :product-buy="productBuyNow"></BuyNow>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {DEV_BASE_URL_API} from "@/config/axios.env";
import {slideImagesProduct} from "@/utils/configSwipper";
import {formatPrice} from "../../../utils/formatData";
import {getSessionCart} from "@/utils/cookieAuthen";
import BuyNow from "~/components/features/BuyNow.vue";

export default {
  name: 'ProductDetail',
  components: {BuyNow},
  data() {
    return {
      infoProduct: {},
      id_product: '',
      variantChoose: {},
      quantity: 1,
      loadingPage: false,
      listImage: [],
      baseUrl: '',
      swiperOptions: slideImagesProduct,
      activeVariant: 0,
      activeIndex: 0,
      showBuyDialog: false,
      productBuyNow: {},
    }
  },
  methods: {
    formatPrice,
    ...mapActions('product', {
      apiGetDetailProduct: 'apiGetDetailProduct',
    }),
    ...mapActions('cart', {
      apiAddProductCartSession: 'apiAddProductCartSession',
      apiAddProductCart: 'apiAddProductCart',
    }),
    async initData() {
      try {
        this.loadingPage = true
        await this.apiGetDetailProduct(this.id_product).then((res) => {
          this.infoProduct = res.data
          this.variantChoose = this.infoProduct.productVariants[0]
          this.setLstImage()
        })

      } catch (e) {
        console.log(e)
      }
    },
    setVariantChoose(index) {
      this.variantChoose = this.infoProduct.productVariants[index]
      this.activeVariant = index
    },
    setLstImage() {
      const lstImage = this.infoProduct.images
      this.listImage = []
      lstImage.forEach((image) => {
        const url = `${this.baseUrl}${image.url ? image.url.replace(/^\.\/uploads/, '/uploads') : ''}`
        this.listImage.push({
          id: image.id,
          url: url,
        })
      })
    },
    changeSlide(index) {
      this.activeIndex = index;
      this.$refs.carousel.setActiveItem(index);
    },
    handleSlideChange(index) {
      this.activeIndex = index;
    },
    async addProductCart() {
      try {
        const sessionKey = getSessionCart()
        const params = {
          cartId : sessionKey,
          productId : this.infoProduct.id,
          product : {
            id: this.infoProduct.id,
            name: this.infoProduct.name,
            description: this.infoProduct.description,
            url: this.infoProduct.images[0].url
          },
          variant: {
            id: this.variantChoose.id
          },
          quantity: this.quantity,
        }
        await this.apiAddProductCartSession(params).then((res) => {
          console.log(res)
          if (res !== undefined) {
            this.$message({
              message: 'Thêm sản phẩm vào giỏ hàng thành công',
              type: 'success'
            });
          }
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'success'
          });
        })
        this.showChooseVariant = false
      } catch (e) {
        console.log(e)
      }
    },
    buyNowProduct() {
      this.showBuyDialog = true
      this.productBuyNow = {
        id: null,
        product: {
          category: this.infoProduct.category,
          description: this.infoProduct.description,
          id: this.infoProduct.id,
          images: this.infoProduct.images,
          name: this.infoProduct.name,
          productVariants: [this.variantChoose]
        },
        quantity: this.quantity,
      }
    }
  },
  created() {
    this.baseUrl = DEV_BASE_URL_API + 'media-service/api/v1.0/images'
    this.id_product = this.$route.params.id_product
    if (this.id_product) {
      this.initData()
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-slide-product {
  width: 100%;
  height: 100% !important;

  .image-banner {
    width: 100%;
    object-fit: contain;
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.img-preview {
  width: 15%;
  aspect-ratio: 1/1;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;

  &.active-image-preview {
    border: 1px solid red;
    scale: 1.1;
  }
}

:deep(.el-carousel__container) {
  position: relative;
  height: 100% !important;
}

.activate-variant {
  border: 1px solid #ea0606;

  span {
    color: #ea0606;
  }
}

.icon-action {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.4px;
}

</style>
