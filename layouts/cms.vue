<template>
  <div class="layout-cms">
    <ew-sidebar></ew-sidebar>
    <div class="body-cms">
      <nuxt></nuxt>
    </div>
  </div>
</template>

<script>
import EwSidebar from "@/components/common/EwSidebar.vue";

export default {
  components: {EwSidebar},
  data() {
    return {
    }
  },
  computed: {

  }
}
</script>

<style>
.layout-cms {
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>
