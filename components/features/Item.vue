<template>
  <div>
    <div class="bg-white w-100 card-style">
      <div class="image-item">
        <img :src="infoItem.images[0].url" alt="banner" class="w-100 h-100" style="border-radius: 12px">
        <div class="action-item">
          <div
            class="d-flex py-2 align-items-center justify-content-center w-100 bg-white gap-2"
          >
            <div @click="addProductCart" class="tab-action">
              <el-tooltip effect="dark" content="Thêm vào giỏ hàng" placement="top">
                <img src="~/assets/img/home/ShoppingCartSimple.svg" alt="">
              </el-tooltip>
            </div>
            <div @click="openDialogBuyNow" class="tab-action">
              <el-tooltip effect="dark" content="Mua ngay" placement="top">
                <img src="~/assets/img/home/CreditCard.svg" alt="">
              </el-tooltip>
            </div>
            <div class="tab-action">
              <el-tooltip effect="dark" content="Xem chi tiết" placement="top">
                <img src="~/assets/img/home/Eye.svg" alt="">
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 d-flex flex-column">
        <h5 class="text-black">{{ infoItem.name }}</h5>
        <h6 class="text-danger mb-1">{{ formatPrice(infoItem.price) }}</h6>
        <div class="tag-category">
          <span class="bg-gradient bg-light px-2 py-1 rounded-2 text-black font-weight-bold text-sm">
            {{ infoItem.category.name}}
          </span>
        </div>
      </div>
    </div>

    <el-dialog
      :title="'Mua ngay'"
      :visible.sync="showBuyDialog"
    >
      <BuyNow></BuyNow>
    </el-dialog>
    <el-dialog
      :title="'Chọn loại sản phẩm'"
      :visible.sync="showChooseVariant"
    >
      <template>
        <div class="w-100">
          <div class="d-flex">
            <div class="avatar-product">
              <img :src="infoItem.images[0].url" alt="" class="w-100 h-100">
            </div>
            <div class="info-variant d-flex flex-column ms-3">
              <h6 class="mb-1">{{ infoItem.name }}</h6>
              <h5 class="text-danger mb-1">{{ variant.price }}</h5>
              <span>Hàng trong kho: {{ variant.quantity }}</span>
            </div>
          </div>
          <div class="mt-3 d-flex gap-2">
            <div v-for="(item, index) in infoItem.productVariants" :key="index">
              <div @click="setVariantProduct(index)" class="btn btn-outline-secondary" :class="{'btn-activate' : isVariantActive === index}">
                <span>{{ item.variantAttributes[0].value }}</span>
              </div>
            </div>
          </div>
          <div class="w-100 d-flex justify-content-end">
            <button @click="handleAddProduct" class="btn bg-gradient-primary">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import BuyNow from "@/components/features/BuyNow.vue";
import {mapActions} from "vuex";
import {getSessionCart} from "@/utils/cookieAuthen";

export default {
  components: {BuyNow},
  props: {
    infoItem: {
      type: Object,
    },
  },
  data() {
    return {
      showBuyDialog: false,
      showChooseVariant: false,
      variant: {},
      isVariantActive: 0,
    }
  },
  methods: {
    ...mapActions('cart', {
      apiAddProductCartSession: 'apiAddProductCartSession',
      apiAddProductCart: 'apiAddProductCart',
    }),
    formatPrice(price) {
      if (typeof price !== 'number') return '';
      return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
    },
    openDialogBuyNow() {
      this.showBuyDialog = true
    },
    async addProductCart() {
      try {
        if (this.infoItem.productVariants.length > 0) {
          this.showChooseVariant = true
          this.variant = this.infoItem.productVariants[0]
        } else {
          await this.handleAddProduct()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async handleAddProduct() {
      try {
        const sessionKey = getSessionCart()
        const params = {
          cartId : sessionKey,
          productId : this.infoItem.id,
          product : this.infoItem,
          variant: {
            id: this.variant.id
          },
          quantity : 1
        }
        await this.apiAddProductCartSession(params).then((res) => {
          console.log(res)
          if (res !== undefined) {
            this.$message({
              message: 'Thêm sản phẩm vào giỏ hàng thành công',
              type: 'success'
            });
          }
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'success'
          });
        })
        this.showChooseVariant = false
      } catch (e) {
        console.log(e)
      }
    },
    setVariantProduct(index) {
      this.isVariantActive = index
      this.variant = this.infoItem.productVariants[index]
    }
  },
}
</script>

<style scoped lang="scss">
.card-style {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);

  .tag-category {
    border-radius: 8px;
  }
}

.avatar-product {
  height: 100px;
  width: 100px;
}

.btn-activate {
  color: #7a000e !important;
  border-color: #7a000e !important;
}

.image-item {
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  background-color: white;
  position: relative;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  .action-item {
    position: absolute;
    width: 100%;
    bottom: -50px; // Đặt ban đầu nằm ngoài phần hiển thị
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(100%); // Đẩy xuống dưới
    transition: transform 0.3s ease, bottom 0.3s ease; // Hiệu ứng trượt mượt
    background: rgba(255, 255, 255, 0.8); // Tạo nền mờ

    .tab-action {
      padding: 6px 8px;
      border-radius: 4px;

      &:hover {
        background-color: #F9EAF0;
      }
    }
  }

  &:hover {
    cursor: pointer;

    img {
      scale: 0.96;
    }
    .action-item {
      transform: translateY(0); // Đưa vào vị trí hiển thị
      bottom: 0;
    }
  }
}
</style>
