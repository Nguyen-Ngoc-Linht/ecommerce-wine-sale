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
    <div class="row mt-2">
      <div class="col-8">
        <div class="card card-body">
          <div class="w-100">
            <el-carousel :interval="0" arrow="always" style="width: 100%; aspect-ratio: 1.8/1">
              <el-carousel-item v-for="image in listImage" :key="image.id" class="swiper-slide-product">
                <img :src="image.url" :alt="image.name" class="w-100 image-banner">
              </el-carousel-item>
            </el-carousel>
            <div></div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card card-body">
          <div>
            <h5>Thông tin sản phẩm</h5>
            <div class=""></div>
          </div>
          <div class="d-flex">
            <div
              v-for="(variant, index) in infoProduct.productVariants"
              class="bg-light px-3 py-1 rounded-2 cursor-pointer"
              :class="{'activate-variant': activeVariant === index}"
              @click="setVariantChoose(index)"
            >
              <span class="text-sm">{{ variant.variantAttributes[0].value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {DEV_BASE_URL_API} from "@/config/axios.env";
import {slideImagesProduct} from "@/utils/configSwipper";

export default {
  name: 'ProductDetail',
  data() {
    return {
      infoProduct: {},
      id_product: '',
      variantChoose: {},
      loadingPage: false,
      listImage: [],
      baseUrl: '',
      swiperOptions: slideImagesProduct,
      activeVariant: 0,
    }
  },
  methods: {
    ...mapActions('product', {
      apiGetDetailProduct: 'apiGetDetailProduct',
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
  }
}
:deep(.el-carousel__container) {
  position: relative;
  height: 100% !important;
}

.activate-variant {
  border: 1px solid red;
}
</style>
