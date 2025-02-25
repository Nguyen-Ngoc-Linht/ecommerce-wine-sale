<template>
  <div class="w-100" :style="backgroundStyle">
    <div v-if="!isLoading" v-loading="isLoading" class="container">
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
                  <CartProduct
                    :info-card="product"
                    @increaseProduct="handleIncreaseProduct(product, index)"
                    @reductionProduct="handleReductionProduct(product, index)"
                  >
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
                  <span
                    v-if="isHaveInfoPayment"
                    @click.stop="changeInfoPayment"
                    class="text-sm text-secondary cursor-pointer"
                  >
                    Thay đổi
                  </span>
                  <span
                    v-if="!isHaveInfoPayment"
                    @click.stop="addLocationDefault"
                    class="text-sm text-secondary cursor-pointer"
                  >
                    Thêm thông tin nhận hàng
                  </span>
                </div>
                <div v-if="isHaveInfoPayment">
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
              </div>
              <hr v-if="productsBuy.length > 0"/>
              <div v-if="productsBuy.length > 0">
                <h6>Phương thức thanh toán</h6>
                <div class="d-flex align-items-center">
                  <el-radio v-model="methodPayment" label="CASH" class="mx-2" disabled>
                    Thanh toán khi nhận hàng
                  </el-radio>
                </div>
                <div class="d-flex align-items-center my-2">
                  <el-radio v-model="methodPayment" label="QRCODE" class="mx-2" disabled>
                    Chuyển khoản qua mã QR code
                  </el-radio>
                </div>
                <h6>Ghi chú cho người bán</h6>
                <el-input
                  v-model="note"
                  type="textarea"
                  maxlength="1500"
                  show-word-limit
                  :autosize="{ minRows: 3, maxRows: 6}"
                  class="mb-2"
                ></el-input>
              </div>
              <hr v-if="productsBuy.length > 0" class="my-1"/>
              <div v-if="productsBuy.length > 0">
                <h6>Danh sách sản phẩm mua</h6>
                <div v-for="(product, index) in productsBuy" :key="`productBuy${index}`">
                  <CardProductBuy :info-card="product">
                  </CardProductBuy>
                  <hr class="my-3">
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mb-0">Tổng tiền sản phẩm:</p>
                  <p class="mb-0 text-bold">{{ formatValue(totalProductBuy()) }}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mb-0">Chi phí vận chuyển:</p>
                  <p class="mb-0 text-bold">{{ formatValue(productsBuy.length*30000) }}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <p class="mb-0">Tổng tiền thanh toán:</p>
                  <p class="mb-0 text-danger text-bold">{{ formatValue(totalProductBuy() + productsBuy.length*30000) }}</p>
                </div>
              </div>
              <div v-if="productsBuy.length > 0" class="w-100 mt-3">
                <button @click.stop="confirmOrder" class="btn w-100 bg-danger text-white">Đặt hàng</button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog
      :title="'Xác nhận đặt hàng'"
      :visible.sync="showDialogConfirm"
      width="600px"
      center
    >
      <template>
        <div>
          <h6>Bạn chắc chắn với những thông tin đặt hàng này?</h6>
          <div class="d-flex justify-content-end w-100 gap-2">
            <button @click.stop="showDialogConfirm = false" class="btn bg-gradient-light">Hủy đặt hàng</button>
            <button @click.stop="handleOrder" class="btn bg-gradient-danger">Xác nhận đặt hàng</button>
          </div>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      :title="'Thêm địa chỉ nhận hàng'"
      :visible.sync="showAddLocation"
      @open="resetForm"
      width="600px"
    >
      <template>
        <Location ref="locationForm" @closeDialog.stop="showAddLocation = false" @addLocation.stop="addLocationSuccess"></Location>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CartProduct from "@/components/features/CartProduct.vue";
import Location from "@/components/features/Location.vue";
import {getLocation, getSessionCart} from "@/utils/cookieAuthen";
import ListLocation from "@/components/features/ListLocation.vue";
import CardProductBuy from "@/components/features/CardProductBuy.vue";
import {formatPrice} from "@/utils/formatData";

export default {
  components: {CardProductBuy, ListLocation, Location, CartProduct},
  data() {
    return {
      infoCart: {},
      infoPayment: {
        name: '',
        phone: '',
        city: '',
        address: '',
      },
      note: '',
      methodPayment: 'QRCODE',
      isHaveInfoPayment: false,
      products: [],
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
      productsBuy: [],

      showDialogConfirm: false,
      showAddLocation: false,
      isLoading: false,
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
      apiAddProductCartSession: 'apiAddProductCartSession',
      apiRemoveProductCartSession: 'apiRemoveProductCartSession',
    }),
    async getListProduct() {
      try {
        this.isLoading = true
        await this.apiGetCartSessionKey().then((res) => {
          // console.log(res.cartItems)
          this.products = res.cartItems
        })
        setTimeout(() => {}, 5000)
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.log(e)
      }
    },
    handleChangeProduct(index) {
      const product = this.products[index];
      if (product.checkBuy) {
        this.addProductBuy(index)
      } else {
        this.removeProductBuy(index)
      }
    },
    addProductBuy(index) {
      const product = this.products[index];
      product.indexList = index
      this.productsBuy.push(product);
    },

    async handleIncreaseProduct(product, index) {
      const sessionKey = getSessionCart()
      const params = {
        cartId : sessionKey,
        productId : product.product.id,
        product : {
          id: product.product.id,
          name: product.product.name,
          description: product.product.description,
          url: product.product.images[0].url
        },
        variant: {
          id: product.product.productVariants[0].id
        },
        quantity: 1
      }
      await this.apiAddProductCartSession(params).then((res) => {
        if (res !== undefined) {
          this.$message({
            message: 'Thêm sản phẩm vào giỏ hàng thành công',
            type: 'success'
          });
          this.products[index].quantity++
        } else {
          this.$message({
            message: 'Thêm sản phẩm thất bại',
            type: 'error'
          });
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'success'
        });
      })
    },
    async handleReductionProduct(product, index) {
      const sessionKey = getSessionCart()
      const params = {
        cartId : sessionKey,
        productId : product.product.id,
        quantity: product.quantity
      }
      await this.apiRemoveProductCartSession(params).then((res) => {
        if (res !== undefined) {
          this.products[index].quantity--
        } else {
          this.$message({
            message: 'Thay đổi số lượng sản phẩm thất bại',
            type: 'error'
          });
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'success'
        });
      })
    },
    totalProductBuy() {
      let total = 0
      this.productsBuy.forEach((item) => {
        total += item.quantity*item.product?.productVariants[0]?.price
      })

      return total
    },

    removeProductBuy(index) {
      const indexDelete = this.productsBuy.findIndex(item => item.indexList === index);
      // console.log(indexDelete, 'index xoa')
      this.productsBuy.splice(indexDelete, 1);
    },
    changeInfoPayment() {
      this.showDialogLocation = true
    },

    confirmOrder() {
      if (this.productsBuy.length > 0) {
        this.showDialogConfirm = true
      }
    },
    async handleOrder() {
      try {
        console.log(this.productsBuy, 'day')
        this.$message.success('Bạn đã đặt hàng thành công')
        this.showDialogConfirm = false
        this.productsBuy = []
      } catch (e) {
        console.log(e)
      }
    },

    addLocationDefault() {
      this.showAddLocation = true
    },
    addLocationSuccess() {
      this.showAddLocation = false
      this.infoPayment = JSON.parse(getLocation())
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.locationForm?.resetForm();
      });
    },
    formatValue(value) {
      return formatPrice(value)
    },
  },
  created() {
    this.getListProduct()
    const infoLocation = JSON.parse(getLocation())
    if (infoLocation !== null) {
      this.infoPayment = infoLocation
      this.isHaveInfoPayment = true
    }
  }
}
</script>
