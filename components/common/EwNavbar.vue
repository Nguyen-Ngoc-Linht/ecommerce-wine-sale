<template>
  <nav class="bg-primary py-3 navbar-page">
    <div class="container">
      <div class="d-flex align-items-center gap-5">
        <nuxt-link
          to="/"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Trang chủ
        </nuxt-link>
        <nuxt-link
          to="/category"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Rượu vang
        </nuxt-link>
        <nuxt-link
          to="/gift"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Set quà tặng
        </nuxt-link>
        <nuxt-link
          to="/accessory"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Phụ kiện
        </nuxt-link>
        <nuxt-link
          to="/side-dishes"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Đồ ăn kèm
        </nuxt-link>
        <nuxt-link
          to="/story"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Câu chuyện
        </nuxt-link>
        <nuxt-link
          to="/landing-page"
          class="text-white-50 font-weight-bold text-lg"
          exact-active-class="active-link"
        >
          Landing Page
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar-page {
  position: sticky;
  z-index: 400;
  top: -0.2px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.active-link {
  color: white !important;
}
</style>
