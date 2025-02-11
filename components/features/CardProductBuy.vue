<template>
  <div class="d-flex h-100 w-100">
    <slot name="checkbox"></slot>
    <div class="image-product">
      <img :src="baseUrl + infoCard.product?.images[0].url.replace(/^\.\/uploads/, '/uploads')" alt="" class="w-100 h-100" style="object-fit: cover">
    </div>
    <div class="info-card ms-3">
      <div class="title-product">
        <h6 class="mb-0 text-sm">{{ infoCard.product?.name }}</h6>
        <span class="bg-gradient bg-light px-2 py-1 rounded-2 text-black font-weight-bold text-sm">
            {{ infoCard.product?.category?.name}}
        </span>
        <div class="d-flex align-items-center mt-2 gap-1">
          <span class="text-sm text-bold">Số lượng: {{ infoCard.quantity }}</span>
        </div>
      </div>
      <h6 class="text-danger text-sm">{{ formatValue(infoCard.product?.productVariants[0]?.price * infoCard.quantity) }}</h6>
    </div>
  </div>
</template>

<script>
import {formatPrice} from "@/utils/formatData";
import {DEV_BASE_URL_API} from "@/config/axios.env";

export default {
  props: {
    infoCard: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      baseUrl: '',
    }
  },
  methods: {
    formatValue(value) {
      return formatPrice(value)
    }
  },
  created() {
    this.baseUrl = DEV_BASE_URL_API + 'media-service/api/v1.0/images'
    console.log(this.infoCard)
  }
}
</script>

<style scoped lang="scss">
.image-product {
  width: 80px;
  height: 80px;
}

.info-card {
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 100%;

  .title-product {
    flex: 1;
  }
}
</style>
