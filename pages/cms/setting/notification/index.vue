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
      <p>Nhập nội dung thông báo của bạn:</p>
      <el-input v-model="message" placeholder="Nhập nội dung..." />

      <template #footer>
        <span>
          <el-button @click="isPopupVisible = false">Hủy</el-button>
          <el-button type="primary" @click="sendNotification">Gửi</el-button>
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
      showDialogDelete: false
    }
  },
  methods: {
    ...mapActions('notification', {
      apiGetAllNotifications: 'apiGetAllNotification',
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
    sendNotification() {
      console.log("Gửi thông báo:", this.message);
      this.isPopupVisible = false; // Close popup after sending
    }
  },
  created() {
    this.getList()
  },
}
</script>
<style lang="scss" scoped>
.el-dialog {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

</style>
