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
          <el-form-item prop="phone" label="Số điện thoại">
            <el-input v-model="infoLocation.phone" placeholder="Vui lòng nhập"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-row :gutter="6">
            <el-col :span="8">
              <el-form-item prop="province" label="Tỉnh/Thành phố" style="display: inline-block; width: 100%;">
                <el-select
                  v-model="infoLocation.province"
                  clearable
                  @change="setListDistricts"
                  placeholder="Chọn tỉnh/thành phố"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in lstProvince"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="districts" label="Huyện" style="display: inline-block; width: 100%;">
                <el-select
                  v-model="infoLocation.districts"
                  clearable
                  @change="setListWards"
                  placeholder="Chọn tỉnh/thành phố"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in lstDistricts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="wards" label="Xã/phường" style="display: inline-block; width: 100%;">
                <el-select
                  v-model="infoLocation.wards"
                  clearable
                  placeholder="Chọn xã/phường"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in lstWards"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
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
        <el-col :span="24">
          <el-checkbox v-model="setLocationDefault" :disabled="lstLocation.length === 0"><span>Đặt làm địa chỉ mặc định</span></el-checkbox>
        </el-col>
      </el-row>
    </el-form>
    <div class="mt-2 d-flex justify-content-end align-items-center gap-2">
      <button @click="closeDialog" class="btn bg-gradient-secondary">Hủy</button>
      <button @click="handleAddLocation" class="btn bg-gradient-primary">Thêm địa chỉ</button>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {getLstLocation, setLocation, setLstLocation} from "@/utils/cookieAuthen";

export default {
  data() {
    return {
      infoLocation: {},
      lstLocation: [],
      rules: {
        name: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        phone: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        province: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        districts: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        wards: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
        address: [{ required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur' },],
      },
      setLocationDefault: true,
      lstProvince: [],
      lstDistricts: [],
      lstWards: [],
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
        this.lstProvince = res
      })
    },
    async handleAddLocation() {
      try {
        await Promise.all([
          this.validForm()
        ])
        const location = {
          name: this.infoLocation.name,
          phone: this.infoLocation.phone,
          city: '',
          address: this.infoLocation.address,
        }
        let lst = JSON.parse(getLstLocation())
        if (lst === null) {
          lst = []
        }
        lst.push(location)
        if (lst.length === 0 || this.setLocationDefault) {
          setLocation(location)
        }
        setLstLocation(lst)
        this.$message.success('Thêm địa chỉ thành công')
        this.$emit('addLocation')
      } catch (e) {
        console.log(e)
      }
    },
    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formInfoLocation.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            reject('Lỗi validate form chính');
          }
        });
      })
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    resetForm() {
      this.infoLocation = {
        name: "",
        phone: "",
        province: "",
        districts: "",
        wards: "",
        address: ""
      };
      this.$nextTick(() => {
        this.$refs.formInfoLocation?.clearValidate();
      });
    },

    async setListDistricts(id_province) {
      try {
        this.lstDistricts = []
        this.infoLocation.districts = null
        await this.apiDistricts(id_province).then(res => {
          if (res !== undefined) {
            this.lstDistricts = res
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async setListWards(id_districts) {
      try {
        this.lstWards = []
        // this.infoLocation.wards = ''
        await this.apiGetWards(id_districts).then(res => {
          if (res !== undefined) {
            this.lstWards = res
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.setDataDefault()
    const list = JSON.parse(getLstLocation())
    if (list === null) {
      this.lstLocation = []
    } else {
      this.lstLocation = list
    }
  }
}
</script>
