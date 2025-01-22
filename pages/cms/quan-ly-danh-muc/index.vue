<template>
  <div class="w-100 p-3">
    <div class="w-100">
      <div class="card card-body w-100">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/logo.png" alt="Avatar" class="avatar-lg">
            <div class="d-flex flex-column ms-3">
              <h4 class="mb-1 text-primary text-gradient">Quản lý danh mục sản phẩm</h4>
              <span class="mb-0 text-gradient text-danger">Chi tiết danh sách danh mục sản phẩm cửa hàng</span>
            </div>
          </div>
          <div class="d-flex align-items-center cursor-pointer me-3">
            <button @click="openAddCategory" class="btn btn-outline-primary">
              <i class="ni ni-fat-add"></i>
              <span class="ms-2">Thêm danh mục</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 bg-white p-3 rounded-2">
      <ew-table
        :fields="fields"
        :data="categories"
        :STT="true"
        :page="filter.page"
        :size="filter.size"
      >
        <template #action="{ row }">
          <div>
            <img @click="openDialogEdit(row)" src="~/assets/img/icons/pen.svg" alt="Sửa" class="cursor-pointer">
            <img @click="openDialogDelete(row)" src="~/assets/img/icons/trash.svg" alt="Xóa" class="cursor-pointer">
          </div>
        </template>
      </ew-table>
      <pagination
        class="mt-2"
        v-model:page.sync="filter.page"
        v-model:size.sync="filter.size"
        :total="filter.total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      ></pagination>
    </div>

    <!--  Dialog  -->
    <el-dialog
      :title="titleDialog"
      :visible.sync="showDialog"
      width="500px"
    >
      <div>
        <el-form ref="formInfoCategory" :model="infoCategory" :rules="rules">
          <el-row :gutter="12">
            <el-col :span="24">
              <el-form-item prop="name" label="Tên danh mục">
                <el-input v-model="infoCategory.name" placeholder="Vui lòng nhập"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="description" label="Mô tả danh mục">
                <el-input
                  v-model="infoCategory.description"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 5 }"
                  placeholder="Vui lòng nhập"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="mt-2 d-flex justify-content-end gap-2">
          <button @click="closeDialog" class="btn bg-gradient-secondary">Hủy</button>
          <button v-if="!typeDialog" @click="handleCreateCategory" class="btn bg-gradient-primary">Lưu</button>
          <button v-if="typeDialog" @click="handleUpdateCategory" class="btn bg-gradient-primary">Cập nhật</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import EwTable from "@/components/parials/EwTable.vue";
import Pagination from "@/components/parials/EwPagination.vue";

export default {
  components: {Pagination, EwTable},
  layout: 'cms',
  data() {
    return {
      categories: [],
      filter: {
        page: 1,
        size: 10,
        total: 0,
      },
      fields: [
        {
          label: 'Tên thuộc tính',
          prop: 'name',
        },
        {
          label: 'Mô tả',
          prop: 'description',
        },
        {
          label: 'Thao tác',
          prop: 'action',
        },
      ],
      infoCategory: {},
      titleDialog: 'Thêm danh mục',
      showDialog: false,
      showDialogDelete: false,
      //
      rules: {
        name: [{required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur'},],
        description: [{required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur'},],
      },

      typeDialog: false,
    }
  },
  methods: {
    ...mapActions('categories', {
      apiGetCategoriesAll: 'apiGetCategoriesAll',
      apiCreateCategory: 'apiCreateCategory',
      apiUpdateCategory: 'apiUpdateCategory',
    }),
    async getList() {
      try {
        const params = {
          name: '',
          description: '',
          paged: {
            page: this.filter.page,
            size: this.filter.size
          }
        }
        await this.apiGetCategoriesAll(params).then((res) => {
          console.log(res, 'caregory')
          this.categories = res.content
          this.filter.total = res.totalElements
        })
      } catch (e) {
        console.log(e)
      }
    },
    openAddCategory() {
      this.titleDialog = 'Thêm danh mục'
      this.infoCategory = {
        id: '',
        name: '',
        description: '',
      }
      this.showDialog = true
      this.typeDialog = false
    },
    openDialogEdit(data) {
      this.titleDialog = 'Sửa danh mục'
      this.typeDialog = true
      this.infoCategory = JSON.parse(JSON.stringify(data))
      this.showDialog = true
    },
    openDialogDelete(data) {
      this.infoCategory = data
      this.showDialogDelete = true
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs.formInfoCategory.resetFields();
      });
      this.showDialog = false
      this.getList()
    },
    async handleCreateCategory() {
      try {
        await Promise.all([
          this.validForm()
        ])

        const params = {
          name: this.infoCategory.name,
          description: this.infoCategory.description,
        }
        await this.apiCreateCategory(params).then(res => {
          if (res !== undefined) {
            this.showDialog = false
            this.$message.success('Tạo thuộc tính thành công')
            this.getList()
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async handleUpdateCategory() {
      try {
        await Promise.all([
          this.validForm()
        ])

        const params = {
          name: this.infoCategory.name,
          description: this.infoCategory.description,
        }
        console.log(this.infoCategory)
        const payload = {
          id_category: this.infoCategory.id,
          payload: params
        }
        await this.apiUpdateCategory(payload).then(res => {
          if (res !== undefined) {
            this.showDialog = false
            this.$message.success('Cập nhật thuộc tính thành công')
            this.getList()
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formInfoCategory.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            reject('Lỗi validate form chính');
          }
        });
      })
    },

    handleSizeChange(size) {
      this.filter.size = size
      this.getList()
    },
    handlePageChange(page) {
      this.filter.page = page
      this.getList()
    },
  },
  created() {
    this.getList()
  }
}
</script>
