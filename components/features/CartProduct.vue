<template>
  <div class="d-flex h-100 w-100">
    <slot name="checkbox"></slot>
    <div class="image-product">
      <img :src="infoCard.images[0]" alt="" class="w-100 h-100" style="object-fit: cover">
    </div>
    <div class="info-card ms-3">
      <div class="title-product">
        <h6 class="mb-0">{{ infoCard.name }}</h6>
        <span class="bg-gradient bg-light px-2 py-1 rounded-2 text-black font-weight-bold text-sm">
            {{ infoCard.category?.name}}
        </span>
      </div>
      <h5 class="text-danger">{{ formatPrice(infoCard.price) }}</h5>
    </div>
  </div>
</template>

<script>
import {formatPrice} from "@/utils/formatData";

export default {
  methods: {formatPrice},
  props: {
    infoCard: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
.image-product {
  width: 100px;
  height: 100px;
}

.info-card {
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>
