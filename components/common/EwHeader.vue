<template>
  <header class="header-ew bg-primary w-100 py-2">
    <div class="container">
      <div class="w-100 d-flex align-items-center justify-content-between">
        <div class="logo-web">
          <img src="~/assets/img/icons/logo.webp" alt="goc_ruou_vang">
        </div>
        <el-input v-model="search_text" class="w-50" placeholder="Hãy thử 'Vang cá chép' xem sao"></el-input>
        <div class="info-user">
          <img src="~/assets/img/icons/cart.svg" alt="Giỏ hàng" class="cursor-pointer">
          <nuxt-link to="/auth/login" class="ms-3 text-white">Đăng nhập</nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      search_text: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.header-ew {
  min-height: 60px;
}
</style>
