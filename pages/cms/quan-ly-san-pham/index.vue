<template>
  <div class="w-100 p-3">
    <div class="w-100">
      <div class="card card-body w-100">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/logo.png" alt="Avatar" class="avatar-lg">
            <div class="d-flex flex-column ms-3">
              <h4 class="mb-1 text-primary text-gradient">Danh sách sản phẩm</h4>
              <span class="mb-0 text-gradient text-danger">Chi tiết danh sách sản phẩm hệ thống cửa hàng</span>
            </div>
          </div>
          <div class="d-flex align-items-center cursor-pointer me-3">
            <button @click="handleAddProduct" class="btn btn-outline-primary">
              <i class="ni ni-fat-add"></i>
              <span class="ms-2">Thêm sản phẩm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 bg-white p-3 rounded-2">
      <ew-table
        :fields="fields"
        :data="products"
        :STT="true"
        :page="1"
        :size="10"
      >
        <template #category="{ row }">
          <span>{{ row.category.name }}</span>
        </template>
        <template #operation="{ row }">
          <div>
            <img @click="handleEditProduct(row)" src="~/assets/img/icons/pen.svg" alt="Sửa" class="cursor-pointer">
            <img @click="openDialogDelete(row)" src="~/assets/img/icons/trash.svg" alt="Xóa" class="cursor-pointer">
          </div>
        </template>
      </ew-table>
      <pagination class="mt-2"></pagination>
    </div>

    <el-dialog
      title="Xóa sản phẩm"
      :visible.sync="showDialogDelete"
      width="500px"
    >
      <div>
        <div class="mt-2 d-flex justify-content-end gap-2">
          <button @click="showDialogDelete = false" class="btn bg-gradient-secondary">Hủy</button>
          <button @click="handleDeleteProduct" class="btn bg-gradient-primary">Xác nhận</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import EwTable from "~/components/parials/EwTable.vue";
import Pagination from "@/components/parials/EwPagination.vue";

export default {
  components: {Pagination, EwTable},
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
      infoProduct: {},
      showDialogDelete: false
    }
  },
  methods: {
    ...mapActions('product', {
      apiGetAllProducts: 'apiGetAllProducts',
      apiDeleteProduct: 'apiDeleteProduct',
    }),
    async getList() {
      try {
        const params = {
          paged : {
            page : 1,
            size : 10
          }
        }
        await this.apiGetAllProducts(params).then((res) => {
          this.products = res.data.content
        })
      } catch (e) {
        console.log(e)
      }
    },
    handleAddProduct() {
      this.$router.push('/cms/quan-ly-san-pham/add')
    },
    handleEditProduct(data) {
      this.$router.push(`/cms/quan-ly-san-pham/edit/${data.id}`)
    },
    openDialogDelete(data) {
      this.infoProduct = data
      this.showDialogDelete = true
    },
    async handleDeleteProduct() {
      await this.apiDeleteProduct(this.infoProduct.id).then(res => {
        if (res !== undefined) {
          this.$message.success('Xóa sản phẩm thành công')
          this.getList()
          this.showDialogDelete = false
        } else {
          this.showDialogDelete = false
          this.$message.error('Xóa sản phẩm không thành công')
        }
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
