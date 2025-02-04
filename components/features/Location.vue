<template>
  <div>
    <el-form ref="formInfoLocation" :model="infoLocation" :rules="rules">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item prop="name" label="Tên người nhận">
            <el-input v-model="infoLocation.name" placeholder="Vui lòng nhập"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="description" label="Số điện thoại">
            <el-input v-model="infoLocation.phone" placeholder="Vui lòng nhập"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="dataType" label="Loại dữ liệu" style="display: inline-block; width: 100%;">
            <el-select
              v-model="infoLocation.dataType"
              clearable
              placeholder="Chọn loại dữ liệu"
              style="width: 100%"
            >
              <el-option
                v-for="item in lstProvince"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="address" label="Chi tiết">
            <el-input
              v-model="infoLocation.address"
              type="textarea"
              placeholder="Vui lòng nhập"
              :rows="4"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      infoLocation: {},
      rules: {
        name: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        phone: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        dataType: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
      },
      lstProvince: [],
    }
  },
  methods: {
    ...mapActions('province', {
      apiGetProvince: 'apiGetProvince',
      apiDistricts: 'apiDistricts',
      apiGetWards: 'apiGetWards',
    }),
    async setDataDefault() {
      await this.apiGetProvince().then(res => {
        console.log(res)
      })
    },
    handleAddLocation() {

    },
    validForm() {

    }
  },
  created() {
    this.setDataDefault()
  }
}
</script>
