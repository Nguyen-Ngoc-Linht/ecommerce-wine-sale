<template>
  <div class="w-100">
    <el-steps :active="active" finish-status="success">
      <el-step title="Bước 1" description="Thông tin đặt hàng">
      </el-step>
      <el-step title="Bước 2" description="Thanh toán">
      </el-step>
      <el-step title="Bước 3" description="Hoàn tất">
      </el-step>
    </el-steps>
    <div v-if="active === 0">
      <div class="row mt-4">
        <div class="col-6">
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
            <hr />
            <div>
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
          </div>
        </div>
        <div class="col-6">
          <div class="w-100">
            <h6>Thông tin sản phẩm</h6>
            <div class="d-flex">
              <div class="image-product">
                <img :src="baseUrl + productBuy.product?.images[0].url.replace(/^\.\/uploads/, '/uploads')" alt="" class="w-100 h-100" style="object-fit: cover">
              </div>
              <div class="info-card ms-3">
                <div class="title-product">
                  <h6 class="mb-0 text-sm">{{ productBuy.product?.name }}</h6>
                  <span class="bg-gradient bg-light px-2 py-1 rounded-2 text-black font-weight-bold text-sm">
                    {{ productBuy.product?.category?.name}}
                  </span>
                  <div class="d-flex align-items-center mt-2 gap-1">
                    <div class="bg-light icon-action cursor-pointer" @click.stop="reductionProduct">
                      <i class="el-icon-minus"></i>
                    </div>
                    <div class="bg-light icon-action">
                      <span class="text-sm">{{ quantityProduct }}</span>
                    </div>
                    <div class="bg-light icon-action cursor-pointer" @click.stop="increaseProduct">
                      <i class="el-icon-plus"></i>
                    </div>
                  </div>
                </div>
                <h6 class="text-danger text-sm">{{ formatValue(productBuy.product?.productVariants[0]?.price) }}</h6>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-4">
              <p class="mb-0">Tổng tiền sản phẩm:</p>
              <p class="mb-0 text-bold">{{ formatValue(productBuy.product?.productVariants[0]?.price * quantityProduct) }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">Chi phí vận chuyển:</p>
              <p class="mb-0 text-bold">{{ formatValue(30000) }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <p class="mb-0">Tổng tiền thanh toán:</p>
              <p class="mb-0 text-danger text-bold">
                {{ formatValue(productBuy.product?.productVariants[0]?.price * quantityProduct + 30000) }}
              </p>
            </div>
            <div class="w-100 mt-3">
              <button @click.stop="confirmOrder" class="btn w-100 bg-danger text-white">Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="'Xác nhận đặt hàng'"
      :visible.sync="showDialogConfirm"
      width="600px"
      center
      append-to-body
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
  </div>
</template>

<script>
import {getLocation} from "~/utils/cookieAuthen";
import CardProductBuy from "~/components/features/CardProductBuy.vue";
import {DEV_BASE_URL_API} from "~/config/axios.env";
import {formatPrice} from "~/utils/formatData";

export default {
  components: {CardProductBuy},
  props: {
    productBuy: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      baseUrl: '',
      quantityProduct: 1,
      active: 0,
      infoPayment: {
        name: '',
        phone: '',
        city: '',
        address: '',
      },
      note: '',
      methodPayment: 'QRCODE',
      isHaveInfoPayment: false,
      showDialogConfirm: false,
      showAddLocation: false,
    }
  },
  methods: {
    formatValue(value) {
      return formatPrice(value)
    },
    addLocationDefault() {
      this.showAddLocation = true
    },
    reductionProduct() {
      if (this.quantityProduct > 1) {
        this.quantityProduct--
      }
    },
    increaseProduct() {
      this.quantityProduct++
    },
    confirmOrder() {
      this.showDialogConfirm = true
    },
    async handleOrder() {
      try {
        const params = {
          userId: "12345abcccscscss",
          note: this.note,
          orderDetails: [
            {
              productVariantId: 8,
              quantity: this.quantityProduct
            }
          ],
          paymentMethod: this.methodPayment
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.baseUrl = DEV_BASE_URL_API + 'media-service/api/v1.0/images'
    const infoLocation = JSON.parse(getLocation())
    if (infoLocation !== null) {
      this.infoPayment = infoLocation
      this.isHaveInfoPayment = true
    }
    this.quantityProduct = this.productBuy.quantity
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

.icon-action {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.4px;
}
</style>
