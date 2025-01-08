<template>
  <el-table
    v-loading="listLoading"
    :data="data"
    row-key="id"
    fit
    style="width: 100%"
    class="cell-main-3 custom-table"
    :row-class-name="tableRowClassName"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-if="selectRow"
      type="selection"
      width="55"
    >
    </el-table-column>
    <el-table-column
      v-if="STT"
      class="padding-table"
      label="STT"
      width="50"
    >
      <template #default="{ $index }">
        <span>{{ (page - 1) * size + $index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      v-for="field in fields"
      :key="field.key"
      :label="field.label"
      :prop="field.prop"
      :width="field.width"
      :sortable="field.sort"
    >
      <template v-if="$scopedSlots[field.prop]" #default="{ row }">
        <slot :name="field.prop" :row="row" />
      </template>
      <template v-else #default="{ row }">
        <div>
          <span style="text-align: justify" class="nowrap-text">{{ row[field.prop] }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'EwTable',
  props: {
    listLoading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    STT: {
      type: Boolean,
      default: false
    },
    selectRow: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      default: () => []
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      selectedRows: []
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.selectedRows = rows
      this.$emit('listRowSelect', this.selectedRows)
    },
    tableRowClassName({ row }) {
      return this.selectedRows.includes(row) ? 'row-selected' : ''
    }
  }
}
</script>

<style scoped lang="scss">
.el-table th.el-table__cell {
  color: #C61654 !important;
  background-color: #F8F9FA;
  font-weight: bold;
}

.el-table .row-selected {
  --el-table-tr-bg-color: #FCECAA !important;
}

.el-table-column--selection .cell .el-checkbox__input .el-checkbox__inner {
  height: 18px;
  width: 18px;
  border: 2px #292663 solid;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #292663;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #292663;
}

.nowrap-text {
  white-space: normal;
  word-break: break-word;
  text-align: justify;
}

.custom-table {
  .el-table th.el-table__cell > .cell {
    color: #C61654 !important;
  }
}
</style>

<style>
.el-table th.el-table__cell>.cell {
  color: #C61654 !important;
}
</style>
