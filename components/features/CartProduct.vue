<template>
  <div class="d-flex h-100 w-100">
    <slot name="checkbox"></slot>
    <div class="image-product">
      <img
        :src="`${baseUrl}${infoCard.product.images[0]?.url ? infoCard.product.images[0].url?.replace(/^\.\/uploads/, '/uploads') : ''}`"
        alt=""
        class="w-100 h-100"
        style="object-fit: cover"
      >
    </div>
    <div class="info-card ms-3">
      <div class="title-product">
        <h6 class="mb-0">{{ infoCard.product?.name }}</h6>
        <span class="bg-gradient bg-light px-2 py-1 rounded-2 text-black font-weight-bold text-sm">
            {{ infoCard.product?.category?.name}}
        </span>
        <div class="d-flex align-items-center mt-2 gap-1">
          <div class="bg-light icon-action" :class="{'cursor-pointer': !disableProduct}" @click="reductionProduct">
            <i class="el-icon-minus"></i>
          </div>
          <div class="bg-light icon-action">
            <span class="text-sm">{{ infoCard.quantity }}</span>
          </div>
          <div class="bg-light icon-action" :class="{'cursor-pointer': !disableProduct}" @click="increaseProduct">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <h5 class="text-danger">{{ formatValue(infoCard.product?.productVariants[0]?.price * infoCard.quantity) }}</h5>
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
    disableProduct: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseUrl: '',
    }
  },
  methods: {
    formatValue(value) {
      return formatPrice(value)
    },
    increaseProduct() {
      if (this.disableProduct) return
      this.$emit('increaseProduct')
    },
    reductionProduct() {
      if (this.disableProduct) return
      this.$emit('reductionProduct')
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
  width: 100px;
  height: 100px;
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

.icon-action {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.4px;
}
</style>
