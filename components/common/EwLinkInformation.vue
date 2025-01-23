<template>
  <div class="info-link-social">
    <div class="d-flex flex-column gap-3">
      <div class="social-item">
        <el-tooltip class="item" effect="dark" content="Chat với chúng tôi qua Messenger" placement="left-start">
          <a href="https://www.messenger.com/t/465110656680283/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0" target="_blank" class="w-100 h-100">
            <img src="~/assets/img/icons/messenger.svg" alt="Messenger" class="w-100 h-100">
          </a>
        </el-tooltip>
      </div>
      <div class="social-item">
        <el-tooltip class="item" effect="dark" content="Chat với chúng tôi qua Zalo" placement="left-start">
          <a href="https://zalo.me/834141234794359440" class="w-100 h-100" target="_blank">
            <img src="~/assets/img/icons/zalo.svg" alt="Zalo" class="w-100 h-100">
          </a>
        </el-tooltip>
      </div>
      <div class="social-item">
        <el-tooltip class="item" effect="dark" content="Liên hệ ngay với chúng tôi" placement="left-start">
          <a href="tel:0843366369" class="w-100 h-100">
            <img src="~/assets/img/icons/phone.svg" alt="Phone" class="w-100 h-100">
          </a>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.info-link-social {
  position: fixed;
  bottom: 2%;
  right: 32px;

  .social-item {
    width: 48px;
    height: 48px;
  }
}
</style>
