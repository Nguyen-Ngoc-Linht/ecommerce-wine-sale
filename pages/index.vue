<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <div style="height: 500px" class="bg-gradient-success"></div>
      </swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <!-- Add more slides as needed -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
    };
  },
};
</script>

<style>
/* Bạn có thể tùy chỉnh thêm nếu cần */
</style>
