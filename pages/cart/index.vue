<template>
  <div class="w-100" :style="backgroundStyle">
    <div class="container">
      <div class="w-100 d-flex align-items-center py-3">
        <div class="back-home"></div>
        <h5 class="text-primary mb-0">Giỏ hàng</h5>
      </div>
      <div class="mt-0 w-100">
        <el-row :gutter="12">
          <el-col :xl="15" :lg="14" :md="12" :sm="24">
            <el-card>
              <h6>Sản phẩm</h6>
              <div class="d-flex flex-column mt-3">
                <div v-for="(product, index) in products" :key="product.id">
                  <CartProduct :info-card="product.product">
                    <template #checkbox>
                      <div class="h-100 d-flex align-items-center me-3">
                        <el-checkbox v-model="product.checkBuy" @change="handleChangeProduct(index)"></el-checkbox>
                      </div>
                    </template>
                  </CartProduct>
                  <hr class="my-3">
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xl="9" :lg="10" :md="12" :sm="24">
            <el-card>
              <h6 class="mb-1 text-primary">Thanh toán</h6>
              <div class="w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="text-info mb-0">Thông tin thanh toán</h6>
                  <span @click="changeInfoPayment" class="text-sm text-secondary cursor-pointer">Thay đổi</span>
                </div>
                <div class="d-flex align-items-center mb-1 mt-2">
                  <p class="text-sm text-secondary">Tên người nhận:</p>
                  <p class="text-sm text-black font-weight-bold ms-2">{{ infoPayment.name }}</p>
                </div>
                <div class="d-flex align-items-center mb-1">
                  <p class="text-sm text-secondary">Số điện thoại:</p>
                  <p class="text-sm text-black font-weight-bold ms-2">{{ infoPayment.phone }}</p>
                </div>
                <div class="d-flex align-items-center mb-1">
                  <p class="text-sm text-secondary">Tỉnh thành phố:</p>
                  <p class="text-sm text-black font-weight-bold ms-2">{{ infoPayment.city }}</p>
                </div>
                <div class="d-flex align-items-center mb-1">
                  <p class="text-sm text-secondary">Địa chỉ nhận hàng:</p>
                  <p class="text-sm text-black font-weight-bold ms-2">{{ infoPayment.address }}</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CartProduct from "@/components/features/CartProduct.vue";

export default {
  components: {CartProduct},
  data() {
    return {
      infoCart: {},
      infoPayment: {
        name: 'Nguyễn Ngọc Linh',
        phone: '0968855491',
        city: 'xã Thư Phú, Thường Tín, Hà Nội',
        address: 'Đội 2 Vĩnh Lộc, Thư Phú, Thường Tín Hà Nội',
      },
      products: [],
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
      productsBuy: [],
    }
  },
  computed: {
    backgroundStyle() {
      return this.background_image
        ? {
          backgroundImage: `url(${this.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }
        : {};
    },
  },
  methods: {
    ...mapActions('cart', {
      apiGetCartSessionKey: 'apiGetCartSessionKey',
    }),
    async getListProduct() {
      try {
        await this.apiGetCartSessionKey().then((res) => {
          console.log(res.cartItems)
          this.products = res.cartItems
        })
      } catch (e) {
        console.log(e)
      }
    },
    handleChangeProduct(index) {
      const product = this.products[index];
      console.log(product.checkBuy, 'log')
      if (product.checkBuy) {
        this.addProductBuy()
      } else {
        this.removeProductBuy()
      }
    },
    addProductBuy(index) {
      const product = this.products[index];
      this.productsBuy.push(product);
    },
    removeProductBuy(index) {
    },
    changeInfoPayment() {}
  },
  created() {
    this.getListProduct()
  }
}
</script>
