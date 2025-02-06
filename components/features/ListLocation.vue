<template>
  <div class="w-100">
    <div v-for="location in lstLocation">
      <div class="d-flex align-items-center justify-content-between">
        <div class="info-location"></div>
        <div class="choose-location">
          <button class="btn bg-gradient-secondary">Chọn</button>
        </div>
      </div>
    </div>
    <div>
      <div @click="showDialogAddLocation = true" class="cursor-pointer">Thêm địa chỉ</div>
    </div>

    <el-dialog
      :title="'Thêm địa chỉ nhận hàng'"
      :visible.sync="showDialogAddLocation"
      @open="resetForm"
      width="600px"
    >
      <template>
        <Location ref="locationForm" @closeDialog="showDialogAddLocation = false" @addLocation="addLocationSuccess"></Location>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {getLstLocation} from "@/utils/cookieAuthen";
import Location from "@/components/features/Location.vue";

export default {
  components: {Location},
  data() {
    return {
      lstLocation: [],
      showDialogAddLocation: false
    }
  },
  methods: {
    resetForm() {
      this.$nextTick(() => {
        this.$refs.locationForm?.resetForm();
      });
    },
    addLocationSuccess() {
    }
  },
  created() {
    this.lstLocation = JSON.parse(getLstLocation())
  }
}
</script>
