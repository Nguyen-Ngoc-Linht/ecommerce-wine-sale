<template>
  <div>
    <FormProduct :is-edit="true"></FormProduct>
  </div>
</template>
<script>
import FormProduct from "@/pages/cms/quan-ly-san-pham/FormProduct.vue";
export default {
  layout: 'cms',
  components: {FormProduct},
  data() {
    return {}
  }
}
</script>
