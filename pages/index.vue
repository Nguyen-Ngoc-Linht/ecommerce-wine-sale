<template>
  <div class="home-page" :style="backgroundStyle">
    <div class="container px-3">
      <div class="py-3">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="banner in getBanner" :key="banner.id" class="swiper-slide">
            <img :src="banner.url" :alt="banner.name" class="w-100 image-banner">
          </swiper-slide>
          <!-- Add more slides as needed -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="py-4">
        <div class="about-home">
          <h4 class="text-white">JOYPLUS - Nhà hàng JOYPLUS</h4>
          <p class="text-white text-sm">Rượu vang & whisky nhập khẩu nguyên chai chính hãng</p>
          <p class="text-white text-sm">Giải pháp quà tặng doanh nghiệp hàng đầu Việt Nam</p>
        </div>
      </div>
      <div class="mt-2">
        <div class="d-flex justify-content-between">
          <h3 class="mb-0 text-black">Chất từ vị vang - Siêu sale bùng nổ</h3>
          <h3>Kết thúc sau</h3>
        </div>
        <el-row :gutter="20">
          <el-col
            v-for="(product, index) in products"
            :key="index"
            :lg="6" :md="8" :sm="12" :span="24"
            class="mt-3"
          >
            <Item :info-item="product"></Item>
          </el-col>
        </el-row>
      </div>
      <div class="mt-4 pb-4">
        <h3 class="font-weight-bold text-primary text-center">Loại rượu vang</h3>
        <el-row class="mt-3" :gutter="12">
          <el-col :lg="6" :md="8" :sm="12">
            <div class="w-100 shadow-blur position-relative rounded-3 d-flex align-items-center" style="aspect-ratio: 16 / 9">
              <div class="banner-image-type rounded-3 overflow-hidden position-absolute w-100 h-100" >
                <img src="https://winecellar.vn/wp-content/uploads/2023/03/tim-hieu-ve-ruou-vang-y.jpg" alt="" class="w-100 h-100" style="object-fit: cover">
              </div>
              <h5 class="text-white w-50 ps-4 mb-0 cursor-pointer" style="z-index: 100">RƯỢU VANG ĐỎ</h5>
            </div>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12">
            <div class="w-100 position-relative rounded-3 d-flex align-items-center" style="aspect-ratio: 16 / 9">
              <div class="banner-image-type rounded-3 overflow-hidden position-absolute w-100 h-100" >
                <img src="https://winecellar.vn/wp-content/uploads/2023/03/tim-hieu-ve-ruou-vang-phap.jpg" alt="" class="w-100 h-100" style="object-fit: cover">
              </div>
              <h5 class="text-black w-50 ps-4 mb-0 cursor-pointer" style="z-index: 100">RƯỢU VANG TRẮNG</h5>
            </div>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12">
            <div class="w-100 position-relative rounded-3 d-flex align-items-center" style="aspect-ratio: 16 / 9">
              <div class="banner-image-type rounded-3 overflow-hidden position-absolute w-100 h-100" >
                <img src="https://winecellar.vn/wp-content/uploads/2023/06/cat-ruou-champagne.jpg" alt="" class="w-100 h-100" style="object-fit: cover">
              </div>
              <h5 class="text-black w-50 ps-4 mb-0 cursor-pointer" style="z-index: 100">RƯỢU CHAMPAGNE</h5>
            </div>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12">
            <div class="w-100 position-relative rounded-3 d-flex align-items-center" style="aspect-ratio: 16 / 9">
              <div class="banner-image-type rounded-3 overflow-hidden position-absolute w-100 h-100" >
                <img src="https://winecellar.vn/wp-content/uploads/2023/10/Frame-22-1.jpg" alt="" class="w-100 h-100" style="object-fit: cover">
              </div>
              <h5 class="text-black w-50 ps-4 mb-0 cursor-pointer" style="z-index: 100">RƯỢU VANG HỒNG</h5>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {slideBannerHome} from "@/utils/configSwipper";
import Item from "@/components/features/Item.vue";

export default {
  components: {Item},
  data() {
    return {
      swiperOptions: slideBannerHome,
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
    };
  },
  computed: {
    ...mapGetters('home', ['getBanner']),
    ...mapGetters('product', ['products']),
    backgroundStyle() {
      return this.background_image
        ? {
          backgroundImage: `url(${this.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }
        : {};
    },
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  .swiper-slide {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    .image-banner {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 2.4 / 1;
    }
  }

  .about-home {
    background-color: rgb(153, 13, 35);
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 12px;
  }
}
</style>
