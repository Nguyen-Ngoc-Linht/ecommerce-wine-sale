<template>
  <div>
    <div class="bg-white w-100 card-style">
      <div class="image-item">
        <img :src="infoItem.images[0]" alt="banner" class="w-100 h-100" style="border-radius: 12px">
        <div class="action-item">
          <div
            class="d-flex py-2 align-items-center justify-content-center w-100 bg-white gap-2"
          >
            <div class="tab-action">
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
  </div>
</template>

<script>
import BuyNow from "@/components/features/BuyNow.vue";

export default {
  components: {BuyNow},
  methods: {
    formatPrice(price) {
      if (typeof price !== 'number') return '';
      return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
    },
    openDialogBuyNow() {
      this.showBuyDialog = true
    }
  },
  props: {
    infoItem: {
      type: Object,
    },
  },
  data() {
    return {
      showBuyDialog: false
    }
  }
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
