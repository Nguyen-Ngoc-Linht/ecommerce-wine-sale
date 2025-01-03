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
      <div class="mt-4">
        <el-row :gutter="20">
          <el-col :xl="4"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {slideBannerHome} from "@/utils/configSwipper";

export default {
  data() {
    return {
      swiperOptions: slideBannerHome,
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
    };
  },
  computed: {
    ...mapGetters('home', ['getBanner']),
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
