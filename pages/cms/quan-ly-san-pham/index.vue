<template>
  <div class="w-100 p-3">
    <div class="w-100">
      <div class="card card-body w-100">
        <div class="d-flex align-items-center">
          <img src="~/assets/img/logo.png" alt="Avatar" class="avatar-lg">
          <div class="d-flex flex-column ms-3">
            <h4 class="mb-1 text-primary text-gradient">Danh sách sản phẩm</h4>
            <span class="mb-0 text-gradient text-danger">Chi tiết danh sách sản phẩm hệ thống cửa hàng</span>
          </div>
        </div>
      </div>
      <div class="d-flex"></div>
    </div>
    <div class="my-3 px-3 d-flex align-items-center cursor-pointer">
      <i class="ni ni-fat-add"></i>
      <span class="ms-2">Thêm sản phẩm</span>
    </div>
    <div class="mt-3 bg-white p-3 rounded-2">
      <ew-table
        :fields="fields"
        :data="products"
        :STT="true"
        :page="1"
        :size="10"
      ></ew-table>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import EwTable from "~/components/parials/EwTable.vue";

export default {
  components: {EwTable},
  layout: 'cms',
  data() {
    return {
      products: [],
      fields: [
        {
          label: 'Tên sản phẩm',
          prop: 'name',
        },
        {
          label: 'Mô tả',
          prop: 'description',
        },
        {
          label: 'Giá',
          prop: 'price',
        },
        {
          label: 'Thuộc tính',
          prop: 'category',
        },
        {
          label: 'Ảnh sản phẩm',
          prop: 'image',
        },
        {
          label: 'Lượt xem',
          prop: 'viewCount',
        },
        {
          label: 'Thao tác',
          prop: 'operation'
        },
      ],
    }
  },
  methods: {
    ...mapActions('product', {
      apiGetAllProducts: 'apiGetAllProducts',
    }),
    async getList() {
      try {
        const params = {
          paged : {
            page : 1,
            size : 100
          }
        }
        await this.apiGetAllProducts(params).then((res) => {
          this.products = res.data.content
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>
