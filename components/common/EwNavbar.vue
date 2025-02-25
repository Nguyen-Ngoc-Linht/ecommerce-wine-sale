<template>
  <nav class="bg-primary py-3 navbar-page">
    <div class="container">
      <div class="d-flex justify-content-between">
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
        <div class="d-flex align-items-center gap-3">
          <div class="info-user d-flex align-items-center">
            <div @click="navigationCart()">
              <img src="~/assets/img/icons/cart.svg" alt="Giỏ hàng" class="cursor-pointer">
            </div>
            <div class="text-center icon d-flex align-items-center justify-content-center">
              <i class="text-3xl ni ni-bell-55 text-secondary" aria-hidden="true"></i>
            </div>
            <nuxt-link to="/auth/login" class="ms-3 text-white">Đăng nhập</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async navigationCart() {
      await this.$router.push('/cart')
    }
  }
}
</script>

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
