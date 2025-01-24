<template>
  <div class="w-100">
    <div class="w-100 d-flex align-items-center justify-content-between px-4 py-3 bg-gradient-light">
      <div class="back-item">
        <h5 v-if="isCreate" class="mb-0">
          <i @click="backProductManage()" class="el-icon-arrow-left me-2 cursor-pointer"></i>
          {{ 'Tạo sản phẩm' }}
        </h5>
        <h5 v-if="isEdit" class="mb-0">
          <i @click="backProductManage()" class="el-icon-arrow-left me-2 cursor-pointer"></i>
          {{ 'Sửa sản phẩm' }}
        </h5>
      </div>
      <div>
        <button @click="handeCreateProduct" v-if="isCreate" class="btn mb-0 bg-gradient-primary">Lưu</button>
        <button @click="handeUpdateProduct" v-if="isEdit" class="btn mb-0 bg-gradient-primary">Cập nhật</button>
      </div>
    </div>
    <div class="mt-3 px-3">
      <div class="p-3 bg-white">
        <h5>Thông tin sản phẩm</h5>
        <el-form ref="formInfoProduct" :model="infoProduct" :rules="rules">
          <el-row :gutter="10">
            <el-col :md="12" :span="24">
              <el-form-item prop="name" label="Tên sản phẩm">
                <el-input v-model="infoProduct.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :span="24">
              <el-form-item prop="attributes" label="Thuộc tính sản phẩm" style="display: inline-block; width: 100%;">
                <el-select
                  v-model="infoProduct.attributes"
                  multiple
                  clearable
                  collapse-tags
                  style="width: 100%"
                  @change="setAttribute"
                >
                  <el-option
                    v-for="(item, index) in attributes"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="infoProduct.attributes.length > 0" :span="24">
              <h6 class="text-sm mb-0 ms-1">Danh sách thuộc tính</h6>
            </el-col>
            <el-col
              v-for="(attribute, index) in infoProduct.productAttributes"
              :key="index" :md="8" :sm="12" :span="24"
            >
              <el-form-item :label="attribute.attribute.name">
                <el-input v-model="attribute.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24"></el-col>
            <el-col :md="12" :sm="12" :span="24">
              <el-form-item label="Số nhóm biến thể">
                <el-input v-model="nbVariant" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :span="24">
              <el-form-item prop="category.id" label="Danh mục sản phẩm">
                <el-select
                  v-model="infoProduct.category.id"
                  clearable
                  collapse-tags
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in categories"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="mt-2"></el-col>
            <el-col v-for="(variant, index) in infoProduct.productVariants" :key="index" :span="24" class="mt-2">
              <el-card>
                <el-row :gutter="12">
                  <el-col :span="8">
                    <h6 class="text-sm w-100">Giá</h6>
                    <el-input v-model="variant.price" type="number"></el-input>
                  </el-col>
                  <el-col :span="8" class="mt-2">
                    <h6 class="text-sm w-100">Số lượng</h6>
                    <el-input v-model="variant.quantity" type="number"></el-input>
                  </el-col>
                  <el-col :span="8" class="mt-2">
                    <h6 class="text-sm w-100">Thuộc tính</h6>
                    <el-select
                      v-model="variant.attributes"
                      multiple
                      clearable
                      collapse-tags
                      style="width: 100%"
                      @change="(value) => {setAttributeVariant(value, index)}"
                    >
                      <el-option
                        v-for="(item, indexList) in attributes"
                        :key="indexList"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col v-for="(attributeId, indexAttribute) in variant.variantAttributes" :key="indexAttribute" :span="8">
                    <el-form-item :label="getAttributeName(attributeId)">
                      <el-input
                        v-model="attributeId.value"
                        placeholder="Nhập giá trị">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="24" class="mt-2"></el-col>
            <el-col :span="24">
              <el-form-item prop="description" label="Mô tả sản phẩm" style="display: inline-block; width: 100%;">
                <el-input
                  v-model="infoProduct.description"
                  type="textarea"
                  show-word-limit
                  maxlength="5000"
                  :autosize="{ minRows: 4, maxRows: 5 }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <h6 class="text-sm mt-2">Ảnh sản phẩm</h6>
              <el-upload
                :file-list="listImage"
                class="avatar-uploader mt-3 custom-upload-list w-full"
                :action="''"
                :on-success="null"
                :on-preview="null"
                :on-remove="handleRemove"
                :on-change="(file, fileList) => {handleChangeFile(file, fileList)}"
                :before-remove="null"
                :on-exceed="null"
                :auto-upload="false"
                list-type="picture-card"
                multiple
                accept=".jpg,.png"
              >
              </el-upload>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {getUserInfo} from "@/utils/cookieAuthen";
import {el} from "@fullcalendar/core/internal-common";

export default {
  layout: 'cms',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    isCreate: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      rules: {
        name: [{required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur'},],
        attributes: [{required: true, message: 'Trường này bắt buộc nhập', trigger: 'blur'},],
      },
      infoProduct: {
        attributes: [],
        category: {
          id: '',
        },
        productVariants: [],
        productAttributes: [],
        description: '',
      },
      listImage: [
        {
          name: 'hay',
          url: 'ssssssssss',
        }
      ],
      nbVariant: 0,
      id_product: '',
      processing: false,
      attributes: [],
      attributeCache: [],
      categories: [],
      user: {},
    }
  },
  methods: {
    ...mapActions('product', {
      apiGetDetailProduct: 'apiGetDetailProduct',
    }),
    ...mapActions('attributes', {
      apiGetAttributesAll: 'apiGetAttributesAll',
    }),
    ...mapActions('categories', {
      apiGetCategoriesAll: 'apiGetCategoriesAll',
    }),
    ...mapActions('upload', {
      apiUploadFile: 'apiUploadFile',
    }),
    backProductManage() {
      this.$router.push(`/cms/quan-ly-san-pham`)
    },
    getAttributeName(attributeId) {
      const attribute = this.attributes.find(attr => attr.id === attributeId.attributeId);
      return attribute ? attribute.name : 'Thuộc tính';
    },
    setAttribute(selectedAttributes) {
      if (!this.attributeCache) {
        this.attributeCache = {};
      }

      // Lưu giá trị hiện tại của các thuộc tính vào cache
      this.infoProduct.productAttributes.forEach((item) => {
        this.attributeCache[item.attribute.id] = item.value;
      });

      // Tạo danh sách các thuộc tính mới dựa trên các thuộc tính đã chọn
      // Cập nhật danh sách productAttributes
      this.infoProduct.productAttributes = selectedAttributes.map((attributeId) => {
        const attribute = this.attributes.find((item) => item.id === attributeId);
        if (attribute) {
          return {
            attribute: attribute,
            value: this.attributeCache[attributeId] || '', // Lấy giá trị từ cache hoặc để rỗng
          };
        }
        return null;
      }).filter((item) => item !== null);
    },
    setAttributeVariant(selectedAttributes, index) {
      // Khởi tạo cache nếu chưa có
      if (!this.attributeCache[index]) {
        this.attributeCache[index] = {};
      }

      // Lưu giá trị hiện tại của các thuộc tính vào cache
      const currentAttributes = this.infoProduct.productVariants[index].variantAttributes || [];
      currentAttributes.forEach((attribute) => {
        if (attribute && attribute.attributeId) {
          this.attributeCache[index][attribute.attributeId] = attribute.value || '';
        }
      });

      // Cập nhật danh sách variantAttributes
      this.infoProduct.productVariants[index].variantAttributes = selectedAttributes.map((attributeId) => {
        const existingValue = this.attributeCache[index][attributeId] || '';
        const attributeName = this.attributes.find((item) => item.id === attributeId)?.name || '';
        return {
          attributeId,
          value: existingValue,
          name: attributeName,
        };
      });
    },
    async setDataDefault() {
      try {
        const params = {
          name: '',
          paged: {
            page: 1,
            size: 1000
          }
        }
        await this.apiGetAttributesAll(params).then((res) => {
          this.attributes = res.content
        })
        const params1 = {
          name: '',
          description: '',
          paged: {
            page: 1,
            size: 1000
          }
        }
        await this.apiGetCategoriesAll(params1).then((res) => {
          this.categories = res.content
        })
      } catch (e) {
        console.log(e)
      }
    },
    async initData() {
      try {
        await this.apiGetDetailProduct(this.id_product).then((res) => {
          console.log(res)
          this.infoProduct = res.data
          this.nbVariant = res.data.productVariants.length
          this.infoProduct.attributes = []
          this.infoProduct.productAttributes.forEach((item) => {
            this.infoProduct.attributes.push(item.attribute.id)
          })
          this.setVariantAttribute()
          this.setListImage()
        })
      } catch (e) {
        console.log(e)
      }
    },
    setVariantAttribute() {
      const variants = this.infoProduct.productVariants
      variants.forEach((variant) => {
        variant.attributes = []
        variant.variantAttributes.forEach((item) => {
          variant.attributes.push(item.attributeId)
          item.name = this.attributes.find((att) => att.id === item.attributeId)?.name || '';
        })
      })
    },
    setListImage() {
      const lstImage = this.infoProduct.images.map((image, index) => ({
        name: `Image-${index + 1}`,
        url: image.url,
        status: 'success',
      }));

      this.listImage = lstImage;
      console.log(this.listImage, 'lstImage')
    },
    async handeCreateProduct() {
      try {
        await Promise.all([
          this.validForm()
        ])
      } catch (e) {
        console.log(e)
      }
    },
    async handeUpdateProduct() {
      try {
        await Promise.all([
          this.validForm()
        ])
        console.log(this.infoProduct)
      } catch (e) {
        console.log(e)
      }
    },

    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formInfoProduct.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            reject('Lỗi validate form chính');
          }
        });
      })
    },
    async handleChangeFile(file, fileList) {
      const maxFileSize = 5 * 1024 * 1024;

      if (file.size > maxFileSize) {
        this.$message.error('Dung lượng tệp không được vượt quá 5MB');
        const index = fileList.findIndex(item => item.uid === file.uid);
        if (index !== -1) {
          fileList.splice(index, 1);
        }
        return;
      }
      // Kiểm tra định dạng (chỉ cho phép .jpg và .png)
      const allowedFormats = ['image/jpeg', 'image/png'];

      if (!allowedFormats.includes(file.raw.type)) {
        this.$message.error('Chỉ hỗ trợ định dạng .jpg và .png');
        const index = fileList.findIndex(item => item.uid === file.uid);
        if (index !== -1) {
          fileList.splice(index, 1);
        }
        return;
      }
      // console.log(file, fileList)
      const formData = new FormData()
      formData.append('file', file.raw)
      formData.append('user_id', this.user.id)
      formData.append('server_name', 'wine')

      await this.apiUploadFile(formData).then((res) => {
        if (res !== undefined) {
          console.log(this.infoProduct.listImage)
        } else {
          const index = fileList.findIndex(item => item.uid === file.uid);
          if (index !== -1) {
            fileList.splice(index, 1);
          }
        }
      })
    },
    handleRemove(file, fileList) {
      const index = fileList.findIndex(item => item.uid === file.uid);
      if (index !== -1) {
        fileList.splice(index, 1);
      }
    },
  },
  async created() {
    this.user = JSON.parse(getUserInfo())
    await this.setDataDefault()
    if (this.isEdit) {
      this.id_product = this.$route.params.id_product
      await this.initData()
    }
  },
  watch: {
    nbVariant(newVal) {
      if (newVal < 0) {
        this.nbVariant = 0;
        return;
      }

      const currentVariants = this.infoProduct.productVariants.length;

      if (newVal > currentVariants) {
        // Tạo các nhóm biến thể mới, giữ lại dữ liệu trước đó
        for (let i = currentVariants; i < newVal; i++) {
          const existingVariant = this.savedVariants?.[i] || {
            name: `Variant ${i + 1}`,
            price: 0,
            quantity: 0,
            variantAttributes: [],
            variantAttributesValue: {}
          };
          this.infoProduct.productVariants.push(existingVariant);
        }
      } else if (newVal < currentVariants) {
        // Lưu các biến thể bị xóa
        this.savedVariants = this.infoProduct.productVariants.slice();
        // Xóa các nhóm biến thể dư
        this.infoProduct.productVariants.splice(newVal);
      }
    }
  }
}
</script>
