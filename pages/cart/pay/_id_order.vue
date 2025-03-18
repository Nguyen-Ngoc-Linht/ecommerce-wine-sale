<template>
  <div class="w-100" :style="backgroundStyle">
    <div class="container pb-5">
      <div class="w-100 d-flex align-items-center py-3">
        <div class="back-home"></div>
        <h5 class="text-primary mb-0">Giỏ hàng/Thanh toán</h5>
      </div>
      <div class="w-100">
        <div class="row">
          <div class="col-7">
            <div class="d-flex align-items-center">
              <img src="~/assets/img/icons/done.svg" alt="Done" style="width: 40px; height: 40px">
              <div class="ms-3">
                <h5 class="text-black mb-1">Cảm ơn bạn đã đặt hàng</h5>
                <p>Một email xác nhận đã được gửi tới mail của bạn</p>
              </div>
            </div>
            <div class="card card-body mt-3">
              <h6 class="text-center mb-1">Hướng dẫn thanh toán qua chuyển khoản ngân hàng</h6>
              <hr class="my-1" />
              <div class="row mt-1 mb-3">
                <div class="col-6 box-border">
                  <h6 class="text-center text-sm">Cách 1: Mở app ngân hàng và quét mã QR</h6>
                  <div class="qr-container">
                    <img :src="imgQrCode" alt="QrCode" style="width: 100%; aspect-ratio: 1/1"/>
                    <div class="qr-bottom-left"></div>
                    <div class="qr-bottom-right"></div>
                  </div>
                </div>
                <div class="col-6">
                  <h6 class="text-center text-sm mb-0">Cách 2: Chuyển khoản thủ công theo thông tin sau</h6>
                  <div class="d-flex flex-column align-items-center gap-3">
                    <img src="~/assets/img/icons/vietinbank.png" alt="VietinBank" class="w-50">
                    <h6 class="text-sm">Ngân hàng VietinBank</h6>
                  </div>
                  <p class="text-black mb-2">Chủ tài khoản: <strong>NGUYEN LE HOANG</strong></p>
                  <div class="d-flex align-items-center justify-content-between">
                    <p class="text-black mb-2">Số tài khoản: <strong>103872276587</strong></p>
                    <p @click="copyToClipboard('103872276587')" class="text-info mb-2 cursor-pointer">Sao chép</p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <p class="text-black mb-2">Số tiền: <strong>{{ formatPrice(10002500)}}</strong></p>
                    <p @click="copyToClipboard('103872276587')" class="text-info mb-2 cursor-pointer">Sao chép</p>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <p class="text-black mb-2">Nội dung chuyển khoản: <strong>DMO112654</strong></p>
                    <p @click="copyToClipboard('DMO112654')" class="text-info mb-2 cursor-pointer">Sao chép</p>
                  </div>
                  <div class="d-flex justify-content-end mt-4">
                    <p class="w-85 text-end">Lưu y: Vui lòng giữ nguyên nội dung
                      <strong>DMO112654</strong>
                      khi chuyển khoản để cửa hàng xác nhận thanh toán cho bạn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="card card-body">
              <h6>Đơn hàng</h6>
              <hr class="my-1"/>
              <h6>Thông tin mua hàng</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {getOrderCart} from "@/utils/cookieAuthen";
import {formatPrice} from "../../../utils/formatData";

export default {
  data() {
    return {
      infoPayment: {},
      order: {},
      background_image: 'https://winecellar.vn/wp-content/uploads/2024/12/bg-main-tet-wcl-3.jpg',
      imgQrCode: '',
    }
  },
  computed: {
    backgroundStyle() {
      return this.background_image
        ? {
          backgroundImage: `url(${this.background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
        }
        : {};
    },
  },
  methods: {
    formatPrice,
    ...mapActions('payment', {
      apiGenerateQRCode: 'apiGenerateQRCode'
    }),
    async initData() {
      try {
        await this.apiGenerateQRCode(this.order).then((res) => {
          if (res !== undefined) {
            this.imgQrCode = res
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    copyToClipboard(text) {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);

      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  },
  created() {
    this.order = JSON.parse(getOrderCart())
    if (this.order.id) {
      this.initData()
    }
  }
}
</script>

<style scoped lang="scss">
.box-border {
  border-right: 1px solid #ccc;
}

.qr-container {
  position: relative;
  display: inline-block;
  padding: 24px;
  background: white;
  width: 100%;
}

.qr-container::before,
.qr-container::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #333; /* Màu viền */
}

.qr-container::before {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.qr-container::after {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

.qr-container .qr-bottom-left,
.qr-container .qr-bottom-right {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #333;
}

.qr-container .qr-bottom-left {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

.qr-container .qr-bottom-right {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}

</style>
