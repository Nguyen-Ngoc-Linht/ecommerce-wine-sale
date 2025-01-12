<template>
  <div>
    <FormProduct :is-create="true"></FormProduct>
  </div>
</template>
<script>
import FormProduct from "@/pages/cms/quan-ly-san-pham/FormProduct.vue";
export default {
  layout: 'cms',
  components: {
    FormProduct,
  },
  data() {
    return {}
  }
}
</script>
