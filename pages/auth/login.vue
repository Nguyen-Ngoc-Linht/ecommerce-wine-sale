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

        <button @click="handleLogin" class="btn bg-gradient-success">Đăng nhập</button>

        <button @click="handleLoginWithGoogle" class="btn bg-gradient-danger">
          <i class="fab fa-google"></i>  Đăng nhập với Google
        </button>
      </div>
      </div>
    </div>
<!--  </div>-->
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

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
  methods: {
    ...mapActions('auth', {
      apiSignIn: 'apiSignIn',
      apiSignInWithGoogle: 'apiSignInWithGoogle',
    }),
    async handleLogin() {
      try {
        const params = {
          email: this.infoLogin.username,
          password: this.infoLogin.password,
        }
        await this.apiSignIn(params).then(res => {
          console.log(res)
          this.$router.push('/cms')
        })
      } catch (e) {}
    },

    // async handleLoginWithGoogle() {
    //   try {
    //     await this.apiSignInWithGoogle().then(res => {
    //       console.log(res)
    //       // this.$router.push(res)
    //       window.open(res, "GoogleLogin", "width=500,height=600,left=100,top=100")
    //     })
    //   } catch (e) {}
    // }
    async handleLoginWithGoogle() {
      try {
        const res = await this.apiSignInWithGoogle();
        console.log("Google Login URL:", res);

        const popup = window.open(res, "GoogleLogin", "width=500,height=600,left=100,top=100");

        // 🟢 Lắng nghe phản hồi từ popup
        window.addEventListener("message", (event) => {
          console.log("Nhận dữ liệu từ popup:", event.data); // ✅ Kiểm tra message nhận về

          if (event.origin !== window.location.origin) return;

          const { success, token } = event.data;
          if (success && token) {
            localStorage.setItem("authToken", token);
            console.log("Lưu token vào localStorage:", token);

            // 🟢 Đóng popup nếu chưa đóng
            if (popup && !popup.closed) {
              popup.close();
              console.log("Popup đóng chưa?", popup.closed);
            }

            // 🟢 Chuyển hướng đến dashboard
            this.$router.push("/okehaha");
          }
        }, false);
      } catch (e) {
        console.error("Google login error:", e);
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['user'])
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
