<template>
  <div class="elc-pagination">
    <el-pagination
      :current-page="page"
      :page-size="size"
      :page-sizes="[10, 15, 20]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pagination',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      small: false,
      background: false
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('update:size', val)
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('update:page', val)
      this.$emit('current-change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.elc-pagination {
  padding: 2px 10px;
  .el-pagination__total {
    font-size: 12px;
  }
  .el-input__wrapper {
    border: 1px solid #ebebec;
    border-radius: 4px;
    font-size: 12px;
  }
}
.btn-prev {
  background: none !important;
}
.btn-next {
  background: none !important;
}
.el-pager li {
  background: none !important;
  padding-top: 4px;
}
</style>

