<template>
  <div class="w-100" :style="backgroundStyle">
    <div class="container">
      <div class="w-100 d-flex align-items-center py-3">
        <div class="back-home"></div>
        <h5 class="text-primary mb-0">Giỏ hàng/Thanh toán</h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
    }
  },
  computed: {
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
  },
}
</script>
