<template>
  <div class="page-wrapper">
    <ew-header></ew-header>
    <ew-navbar></ew-navbar>
    <div style="min-height: calc(100vh - 242px)">
      <nuxt />
    </div>
    <ew-footer></ew-footer>
  </div>
</template>

<script>
import EwHeader from "~/components/common/EwHeader.vue";
import EwFooter from "~/components/common/EwFooter.vue";
import EwNavbar from "~/components/common/EwNavbar.vue";

export default {
  components: {EwNavbar, EwFooter, EwHeader}
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
