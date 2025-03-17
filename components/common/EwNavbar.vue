<template>
  <nav class="bg-primary py-3 navbar-page">
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center gap-5">
          <nuxt-link
            to="/"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Trang chủ
          </nuxt-link>
          <nuxt-link
            to="/category"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Rượu vang
          </nuxt-link>
          <nuxt-link
            to="/gift"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Set quà tặng
          </nuxt-link>
          <nuxt-link
            to="/accessory"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Phụ kiện
          </nuxt-link>
          <nuxt-link
            to="/side-dishes"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Đồ ăn kèm
          </nuxt-link>
          <nuxt-link
            to="/story"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Câu chuyện
          </nuxt-link>
          <nuxt-link
            to="/landing-page"
            class="text-white-50 font-weight-bold text-lg"
            exact-active-class="active-link"
          >
            Landing Page
          </nuxt-link>
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="info-user d-flex align-items-center">
            <div @click="navigationCart()">
              <img src="~/assets/img/icons/cart.svg" alt="Giỏ hàng" class="cursor-pointer">
            </div>
            <div @click="toggleNotifications" class="ms-3 position-relative">
              <img
                src="~/assets/img/icons/bell.svg"
                alt="Thông báo"
                style="width: 40px; height: 40px;"
                class="cursor-pointer"
              >
              <div class="number-noti">
                <span class="text-sm text-danger mb-0">{{ notificationCount }}</span>
              </div>

              <div
                style="position: absolute; left: -125px"
                v-if="isPopupVisible"
                class="notification-popup"
                @click="closePopup"
                ref="popupWrapper"
              >
                <div class="popup-content">
                  <h3>Thông báo</h3>
                  <ul>
                    <li v-for="(notification, index) in notifications" :key="index">
                      {{ notification.message }}
                    </li>
                  </ul>
                  <button v-if="notifications.length > 5" @click="showMoreNotifications" class="btn-show-more">Show More</button>
                </div>
              </div>
            </div>



            <nuxt-link v-if="!user.id" to="/auth/login" class="ms-3 text-white">Đăng nhập</nuxt-link>
            <span v-else class="ms-3 text-white">{{ user.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {getUserInfo} from "@/utils/cookieAuthen";

export default {
  data() {
    return {
      user: {},
      notifications: [
        { message: 'Your order has been shipped!' },
        { message: 'New items are available in the store!' },
        { message: 'You have a new message from support.' },
        { message: 'Don’t miss our sale! 30% off today!' },
        { message: 'Your item is out for delivery!' },
        { message: 'A new friend has followed you!' },
        { message: 'Your password was changed successfully.' },
      ],
      isPopupVisible: false, // Popup visibility flag
    };
  },
  computed: {
    notificationCount() {
      return this.notifications.length; // Notification count
    },
  },
  methods: {
    async navigationCart() {
      await this.$router.push('/cart');
    },
    toggleNotifications() {
      // Toggle the popup visibility
      this.isPopupVisible = !this.isPopupVisible;
    },
    showMoreNotifications() {
      alert('Show more notifications functionality');
      // You can implement further functionality here
    },
    closePopup(event) {
      // Close the popup when clicked outside
      if (
        !this.$refs.popupWrapper.contains(event.target) &&
        !this.$refs.notificationBell.contains(event.target)
      ) {
        this.isPopupVisible = false;
      }
    },
  },
  mounted() {
    // Listen for outside clicks
    document.addEventListener('click', this.closePopup);
  },
  created() {
    this.user = JSON.parse(getUserInfo()) || {};
  },
  destroyed() {
    // Remove event listener when the component is destroyed
    document.removeEventListener('click', this.closePopup);
  },
};
</script>

<style scoped lang="scss">
.navbar-page {
  position: sticky;
  z-index: 400;
  top: -0.2px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.active-link {
  color: white !important;
  opacity: 1;
}

.number-noti {
  position: absolute;
  padding: 2px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -6px;
  right: 0px;
}

.notification-popup {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.popup-content {
  padding: 10px;
}

.popup-content h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.popup-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.popup-content li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.popup-content button.btn-show-more {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
}

.popup-content button.btn-show-more:hover {
  background-color: #0056b3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
