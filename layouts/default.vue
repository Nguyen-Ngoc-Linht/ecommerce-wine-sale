<template>
  <div class="page-wrapper">
    <notifications />
    <ew-header></ew-header>
    <ew-navbar></ew-navbar>
    <div>
      <nuxt />
    </div>
    <ew-footer></ew-footer>
  </div>
</template>

<script>
import EwHeader from "~/components/common/EwHeader.vue";
import EwFooter from "~/components/common/EwFooter.vue";
import EwNavbar from "~/components/common/EwNavbar.vue";
import {mapActions, mapGetters} from "vuex";
import {getSessionCart} from "@/utils/cookieAuthen";

export default {
  components: {EwNavbar, EwFooter, EwHeader},
  data() {
    return {
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg'
    }
  },
  computed: {
    ...mapGetters('home', ['getBanner']),
  },
  methods: {
    ...mapActions('cart', {
      apiGenerateSessionKey: 'apiGenerateSessionKey',
    }),
    async setSessionKey() {
      await this.apiGenerateSessionKey().then(key => {
        console.log(key)
      })
    }
  },
  created() {
    const sessionKey = getSessionCart()
    console.log(sessionKey, 'sessionKey')
    if (sessionKey === null || sessionKey === undefined) {
      this.setSessionKey()
    }
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>
