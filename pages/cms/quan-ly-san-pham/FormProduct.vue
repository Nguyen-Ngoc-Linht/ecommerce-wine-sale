<template>
  <div class="w-100">
    <div class="w-100 d-flex align-items-center justify-content-between px-4 py-3 bg-gradient-light">
      <div class="back-item">
        <h5 v-if="isCreate" class="mb-0">
          <i @click="backAdmission()" class="el-icon-arrow-left me-2 cursor-pointer"></i>
          {{ 'Tạo sản phẩm' }}
        </h5>
        <h5 v-if="isEdit" class="mb-0">
          <i @click="backAdmission()" class="el-icon-arrow-left me-2 cursor-pointer"></i>
          {{ 'Sửa sản phẩm' }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'cms',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    isCreate: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      rules: {},
      infoProduct: {},
      processing: false,
    }
  }
}
</script>
