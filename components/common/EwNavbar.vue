<template>
  <nav class="bg-primary py-3 navbar-page">
    <div class="container">
      <div class="d-flex align-items-center gap-5">
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Trang chủ</nuxt-link>
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Rượu vang</nuxt-link>
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Set quà tặng</nuxt-link>
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Phụ kiện</nuxt-link>
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Đồ ăn kèm</nuxt-link>
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Câu chuyện</nuxt-link>
        <nuxt-link to="/" class="text-white font-weight-bold text-lg">Landing Page</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar-page {
  position: sticky;
  z-index: 400;
  top: 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}
</style>
