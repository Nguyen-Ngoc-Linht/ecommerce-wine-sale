<template>
  <div class="sidebar-cms">
    <div class="logo-web mb-5">
      <div class="logo-image">
        <img src="~/assets/img/logo.png" alt="joyplus" class="w-100 h-100">
      </div>
      <h6 class="m-0 ms-2">JOYPLUS-CMS</h6>
    </div>

    <div class="list-tab">
      <div v-for="tab in getListTab" :key="tab.id" class="w-100">
        <nuxt-link
          v-if="tab.children.length === 0"
          :to="tab.path"
          class="nav-link-sidebar"
          exact-active-class="activate-sidebar"
        >
          <div class="bg-white shadow icon icon-sm border-radius-md d-flex align-items-center justify-content-center icon-tab">
            <i class="text-sm opacity-10 ni ni-folder-17 text-secondary" aria-hidden="true"></i>
          </div>
          <span class="nav-link-text" :class="false ? ' me-1' : 'ms-1'">{{ tab.name }}</span>
        </nuxt-link>
        <div v-if="tab.children.length > 0">
          <div
            class="nav-link-sidebar"
            data-bs-toggle="collapse"
            data-bs-target="#listStudent"
            aria-controls="listStudent"
            aria-expanded="false"
            aria-label="Toggle listStudent"
          >
            <div class="text-center bg-white shadow icon icon-sm border-radius-md d-flex align-items-center justify-content-center icon-tab">
              <i class="text-sm opacity-10 ni ni-folder-17 text-secondary" aria-hidden="true"></i>
            </div>
            <span class="nav-link-text">{{ tab.name }}</span>
          </div>
          <div class="collapse py-2" id="listStudent">
            <ul class="navbar-nav mx-auto">
              <li v-for="item in tab.children" class="mt-1">
                <NuxtLink
                  class="nav-link-sidebar d-flex align-items-center ps-3"
                  aria-current="page"
                  :to="item.path"
                  active-class="activate-sidebar"
                >
                  <div class="text-center bg-white shadow icon icon-sm border-radius-md d-flex align-items-center justify-content-center icon-tab">
                    <i class="text-sm opacity-10 ni ni-bag-17 text-secondary" aria-hidden="true"></i>
                  </div>
                  <span class="nav-link-text ms-2">{{ item.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('cms', ['getListTab'])
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.sidebar-cms {
  width: 280px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;

  .logo-web {
    display: flex;
    align-items: center;

    .logo-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .list-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;

    .nav-link-sidebar {
      display: flex;
      align-items: center;
      padding: 8px 10px;
      border-radius: 12px;
      gap: 8px;

      &.activate-sidebar,
      &:hover {
        background-color: #F9EAF0;

        .icon-tab {
          background-color: white;

          i {
            color: #b50a46 !important;
          }
        }

        .nav-link-text {
          color: #b50a46;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
