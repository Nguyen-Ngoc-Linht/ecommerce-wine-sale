<template>
  <div class="w-100 p-3">
    <div class="w-100">
      <div class="card card-body w-100">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/logo.png" alt="Avatar" class="avatar-lg">
            <div class="d-flex flex-column ms-3">
              <h4 class="mb-1 text-primary text-gradient">Quản lý thuộc tính sản phẩm</h4>
              <span class="mb-0 text-gradient text-danger">Chi tiết danh sách sản phẩm hệ thống cửa hàng</span>
            </div>
          </div>
          <div class="d-flex align-items-center cursor-pointer me-3">
            <button @click="handleAddAttributes" class="btn btn-outline-primary">
              <i class="ni ni-fat-add"></i>
              <span class="ms-2">Thêm thuộc tính</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 bg-white p-3 rounded-2">
      <ew-table
        :fields="fields"
        :data="attributes"
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
        <el-form ref="formInfoAttributes" :model="infoAttributes" :rules="rules">
          <el-row :gutter="12">
            <el-col :span="24">
              <el-form-item prop="name" label="Tên thuộc tính">
                <el-input v-model="infoAttributes.name" placeholder="Vui lòng nhập"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="description" label="Mô tả thuộc tính">
                <el-input v-model="infoAttributes.description" placeholder="Vui lòng nhập"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="dataType" label="Loại dữ liệu" style="display: inline-block; width: 100%;">
                <el-select
                  v-model="infoAttributes.dataType"
                  clearable
                  placeholder="Chọn loại dữ liệu"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in lstDataType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="mt-2 d-flex justify-content-end gap-2">
          <button @click="closeDialog" class="btn bg-gradient-secondary">Hủy</button>
          <button v-if="!typeDialog" @click="handleCreateAttributes" class="btn bg-gradient-primary">Lưu</button>
          <button v-if="typeDialog" @click="handleUpdateAttributes" class="btn bg-gradient-primary">Cập nhật</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="Xóa thuộc tính"
      :visible.sync="showDialogDelete"
      width="500px"
    >
      <div>
        <div class="mt-2 d-flex justify-content-end gap-2">
          <button @click="showDialogDelete = false" class="btn bg-gradient-secondary">Hủy</button>
          <button v-if="typeDialog" @click="handleDelete" class="btn bg-gradient-primary">Xác nhận</button>
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
      attributes: [],
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
          label: 'Loại dữ liệu',
          prop: 'dataType',
        },
        {
          label: 'Thao tác',
          prop: 'action',
        },
      ],
      infoAttributes: {},
      titleDialog: 'Thêm thuộc tính',
      showDialog: false,
      showDialogDelete: false,
      //
      rules: {
        name: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        description: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        dataType: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
      },

      typeDialog: false,
      lstDataType: [
        {
          id: 1,
          name: 'String',
          value: 'STRING'
        },
        {
          id: 2,
          name: 'Number',
          value: 'NUMBER'
        },
      ]
    }
  },
  methods: {
    ...mapActions('attributes', {
      apiGetAttributesAll: 'apiGetAttributesAll',
      apiCreateAttribute: 'apiCreateAttribute',
      apiUpdateAttribute: 'apiUpdateAttribute',
      apiDeleteAttribute: 'apiDeleteAttribute',
    }),
    async getList() {
      try {
        const params = {
          name: '',
          paged: {
            page: this.filter.page,
            size: this.filter.size
          }
        }
        await this.apiGetAttributesAll(params).then((res) => {
          this.attributes = res.content
          this.filter.total = res.totalElements
        })
      } catch (e) {
        console.log(e)
      }
    },
    handleAddAttributes() {
      this.titleDialog = 'Thêm thuộc tính'
      this.infoAttributes = {
        id: '',
        dataType: '',
        description: '',
        name: '',
      }
      this.showDialog = true
      this.typeDialog = false
    },
    async handleDelete() {
      await this.apiDeleteAttribute(this.infoAttributes.id).then(res => {
        if (res !== undefined) {
          this.$message.success('Xoá thuộc tính thành công')
          this.showDialogDelete = false
          this.getList()
        }
        this.showDialogDelete = false
      })
    },
    openDialogEdit(data) {
      this.titleDialog = 'Sửa thuộc tính'
      this.typeDialog = true
      this.infoAttributes = JSON.parse(JSON.stringify(data))
      this.showDialog = true
    },
    openDialogDelete(data) {
      this.infoAttributes = data
      this.showDialogDelete = true
    },
    closeDialog() {
      this.$nextTick(() => {
        this.$refs.formInfoAttributes.resetFields();
      });
      this.showDialog = false
      this.showDialogDelete = false
      this.getList()
    },
    async handleCreateAttributes() {
      try {
        await Promise.all([
          this.validForm()
        ])

        const params = {
          name: this.infoAttributes.name,
          description: this.infoAttributes.description,
          dataType: this.infoAttributes.dataType,
        }
        await this.apiCreateAttribute(params).then(res => {
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
    async handleUpdateAttributes() {
      try {
        await Promise.all([
          this.validForm()
        ])

        const params = {
          name: this.infoAttributes.name,
          description: this.infoAttributes.description,
          dataType: this.infoAttributes.dataType,
        }
        const payload = {
          id_attribute: this.infoAttributes.id,
          payload: params
        }
        await this.apiUpdateAttribute(payload).then(res => {
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
        this.$refs.formInfoAttributes.validate(valid => {
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
