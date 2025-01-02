<template>
  <div style="height: calc(100vh)">
    <div class="d-flex align-items-center justify-content-center h-100">
      <div class="box-login">
        <h4>Đăng nhập</h4>

        <el-form class="w-100">
          <el-form-item label="Tài khoản/Số điện thoại">
            <el-input v-model="infoLogin.username"></el-input>
          </el-form-item>
          <el-form-item label="Mật khẩu">
            <el-input v-model="infoLogin.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  name: "Login",
  data() {
    return {
      infoLogin: {
        username: '',
        password: '',
      },
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
.box-login {
  width: 24%;
  min-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-height: 400px;
  border-radius: 10px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
