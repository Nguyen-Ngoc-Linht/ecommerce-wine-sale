<template>
  <div class="w-100">
    <div class="w-100 d-flex align-items-center justify-content-between px-4 py-3 bg-gradient-light">
      <div class="back-item">
        <h5 v-if="isCreate" class="mb-0">
          <i @click="backProductManage()" class="el-icon-arrow-left me-2 cursor-pointer"></i>
          {{ 'Tạo sản phẩm' }}
        </h5>
        <h5 v-if="isEdit" class="mb-0">
          <i @click="backProductManage()" class="el-icon-arrow-left me-2 cursor-pointer"></i>
          {{ 'Sửa sản phẩm' }}
        </h5>
      </div>
    </div>
    <div class="mt-3 px-3">
      <div class="p-3 bg-white">
        <h5>Thông tin sản phẩm</h5>
        <el-form rè="formInfoProduct" v-model="infoProduct" :rules="rules">
          <el-row :gutter="10">
            <el-col :md="12" :span="24">
              <el-form-item label="Tên sản phẩm">
                <el-input v-model="infoProduct.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :span="24"></el-col>
            <el-col :md="12" :span="24"></el-col>
            <el-col :md="12" :span="24"></el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

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
      id_product: '',
      processing: false,
    }
  },
  methods: {
    ...mapActions('product', {
      apiGetDetailProduct: 'apiGetDetailProduct',
    }),
    backProductManage() {
      this.$router.push(`/cms/quan-ly-san-pham`)
    },
    async initData() {
      try {
        await this.apiGetDetailProduct(this.id_product).then((res) => {
          console.log(res)
          this.infoProduct = res.data
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.id_product = this.$route.params.id_product
      this.initData()
    }
  }
}
</script>
