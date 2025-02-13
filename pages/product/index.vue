<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-8">
        <el-card>
          Data
        </el-card>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'ProductDetail',
  data() {
    return {
      infoProduct: '',
      id_product: '',
      baseUrl: '',
    }
  },
  methods: {
    ...mapActions('product', {

    }),
    async initData() {
      try {

      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.id_product = this.$route.params.id_product
    if (this.id_product) {
      this.initData()
    }
  }
}
</script>
