<template>
  <div>Đang xử lý đăng nhập Google...</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    console.log("Google Callback Mounted!");
    this.handleGoogleCallback();
  },
  methods: {
    ...mapActions("auth", ["apiHandleGoogleCallback"]),

    async handleGoogleCallback() {
      try {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) {
          throw new Error("Mã xác thực không tồn tại");
        }

        const data = await this.apiHandleGoogleCallback(code);
        console.log("Đăng nhập thành công:", data);

        // Gửi thông tin đăng nhập về cửa sổ cha (trang chính)
        window.opener.postMessage({ success: true, token: data.data.token }, window.opener.origin);

        // Đóng popup
        window.close();
      } catch (error) {
        console.error("Lỗi đăng nhập Google:", error);
      }
    }
  }
};
</script>
