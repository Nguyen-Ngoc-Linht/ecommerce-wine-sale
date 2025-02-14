<template>
  <div class="w-100 p-3">
    <div class="w-100">
      <div class="card card-body w-100">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/logo.png" alt="Avatar" class="avatar-lg">
            <div class="d-flex flex-column ms-3">
              <h4 class="mb-1 text-primary text-gradient">Danh sách thông báo</h4>
              <span class="mb-0 text-gradient text-danger">Chi tiết danh sách thông báo của hệ thống cửa hàng</span>
            </div>
          </div>
          <div class="d-flex align-items-center cursor-pointer me-3">
            <button @click="handleAddNotification" class="btn btn-outline-primary">
              <i class="ni ni-fat-add"></i>
              <span class="ms-2">Bắn thông báo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 bg-white p-3 rounded-2">
      <ew-table
        :fields="fields"
        :data="notifications"
        :STT="true"
        :page="currentPage"
        :size="pageSize"
      >
      </ew-table>
      <pagination
        class="mt-2"
        :current-page="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        @current-change="onPageChange"
        @size-change="onSizeChange"
      />
    </div>
    <!-- Popup Gửi thông báo -->
    <el-dialog :visible.sync="isPopupVisible" title="Gửi thông báo">
      <p>
        Chọn loại thông báo
        <span style="color: red;">*</span>
      </p>
      <el-select v-model="notificationType" placeholder="Chọn loại">
        <el-option label="Thông báo hệ thống" value="notice" />
        <el-option label="Cảnh báo hệ thống" value="warning" />
      </el-select>

      <p class="mt-3">
        Chọn đối tượng nhận thông báo
        <span style="color: red;">*</span>
      </p>
      <el-select
        v-model="selectedPeople"
        multiple
        filterable
        remote
        placeholder="Chọn người nhận"
        class="container-name">
        <el-option
          v-for="person in peopleOptions"
          :key="person.id"
          :label="person.lastName"
          :value="person.id"
        />
      </el-select>

      <p class="mt-3">
        Nhập nội dung thông báo
        <span style="color: red;">*</span>
      </p>
      <el-input v-model="message" placeholder="Nhập nội dung..." />

      <template #footer>
    <span>
      <el-button @click="isPopupVisible = false">Hủy</el-button>
      <el-button type="primary" @click="confirmSend">Gửi</el-button>
    </span>
      </template>
    </el-dialog>

    <!-- Confirmation Dialog -->
    <el-dialog
      :visible.sync="isConfirmPopupVisible"
      title="Xác nhận"
      width="30%"
      center
      :modal="true"
    >
      <p>Bạn có chắc chắn muốn gửi thông báo này không?</p>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="isConfirmPopupVisible = false">Hủy</el-button>
      <el-button type="primary" @click="sendNotification">Xác nhận</el-button>
    </span>
      </template>
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
      notifications: [],
      fields: [
        {
          label: 'Người tạo',
          prop: 'createdBy',
        },
        {
          label: 'Nội dung thông báo',
          prop: 'content',
        },
        {
          label: 'Kênh gửi tin',
          prop: 'channel',
        },
        {
          label: 'Loại tin',
          prop: 'type',
        },
        {
          label: 'Ngày tạo',
          prop: 'createdDate',
        },
        {
          label: 'Trạng thái',
          prop: 'status',
        },
      ],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      infoNotification: {},
      message: "",
      isPopupVisible: false,
      notificationType: 'notice',
      selectedPeople: [],
      people: [],
      filteredPeople: [],
      isConfirmPopupVisible: false
    }
  },
  computed: {
    peopleOptions() {
      return [
        { id: 'all', lastName: 'Tất cả' },
        ...this.people
      ];
    },
  },
  methods: {
    ...mapActions('notification', {
      apiGetAllNotifications: 'apiGetAllNotification'
    }),
    ...mapActions('user', {
      apiGetListUsers: 'apiGetListUser'
    }),
    async getList() {
      try {
        const params = {
          paged: {
            page: this.currentPage,
            size: this.pageSize,
          },
        };
        await this.apiGetAllNotifications(params).then((res) => {
          this.notifications = res.data.content,
          this.totalItems = res.data.totalElements;
        })
      } catch (e) {
        console.log(e)
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      this.getList();
    },
    async onSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1;  // Reset về trang đầu tiên
      await this.getList();
    },
    handleAddNotification() {
      this.isPopupVisible = true;
      console.log("isPopupVisible:", this.isPopupVisible); // Kiểm tra xem biến có đổi không
    },
    async getListUser() {
      try {
        const params = {
          name: null,
          email: null,
          phone: null,
        };
        await this.apiGetListUsers(params).then((res) => {
          this.people = res.data
        })
      } catch (e) {
        console.log(e);
      }
    },
    confirmSend() {
      if (!this.notificationType) {
        this.$message.warning('Vui lòng chọn loại thông báo.');
        return;
      }
      if (this.selectedPeople.length === 0) {
        this.$message.warning('Vui lòng chọn người nhận thông báo.');
        return;
      }
      if (!this.message) {
        this.$message.warning('Vui lòng nhập nội dung gửi tin.');
        return;
      }
      this.isConfirmPopupVisible = true;
    },
    sendNotification() {
      console.log('Loại thông báo:', this.notificationType);
      console.log('Người nhận:', this.selectedPeople);
      console.log('Nội dung:', this.message);

      this.$message.success('Thông báo đã được gửi!');
      this.isPopupVisible = false;

      // Reset dữ liệu
      this.notificationType = '';
      this.message = '';
      this.selectedPeople = [];
      this.isConfirmPopupVisible = false;
    }
  },
  created() {
    this.getList(),
    this.getListUser(),
    this.filteredPeople = this.people;
  },
}
</script>
<style lang="scss" scoped>
.el-dialog {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.container-name {
  display: flex;
  flex-direction: row;
}
</style>
