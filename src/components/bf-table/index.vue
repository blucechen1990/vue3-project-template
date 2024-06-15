<template>
  <div class="bf-table">
    <!-- 表格 -->
    <el-table
      :border="true"
      stripe
      class="custom-tb"
      :header-cell-style="{ background: '#FAFAFA' }"
      fit
      :height="tableOption.height"
      :data="tableData"
      v-bind="$attrs"
    >
      <!-- 复选框 -->
      <el-table-column
        v-if="tableOption.selection"
        type="selection"
        align="center"
        fixed="left"
        width="55"
      />
      <!-- 序号 -->
      <el-table-column
        v-if="tableOption.index"
        align="center"
        type="index"
        width="80"
        :label="tableOption.indexLabel || 'index'"
      />
      <!-- 正常列展示 -->
      <el-table-column
        v-for="item of tableOption.columns"
        :key="item.prop"
        v-bind="item"
        :align="item.align || 'center'"
      >
        <template #default="{ row, column, ind }">
          <!-- 自定义内容使用自己配置的 slot -->
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="row" :column="column" :index="ind"></slot>
          </template>

          <!-- 使用默认slot -->
          <template v-else>
            {{ row[item.prop] }}
          </template>
        </template>

        <!-- 自定义col header slot  -->
        <template #header="{ column }">
          <slot :name="item.slotHeader" :column="column"></slot>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <template v-if="tableOption.operationColumn">
        <el-table-column
          :fixed="tableOption.operationColumn.fixed"
          :label="tableOption.operationColumn.label || 'Operation'"
          align="center"
          :min-width="tableOption.operationColumn.minWidth"
        >
          <template #default="{ row }">
            <el-button
              v-for="btn in tableOption.operationColumn.btns"
              :key="btn.prop"
              :type="btn.type || 'primary'"
              :size="btn.size || 'small'"
              :plain="btn.plain || false"
              :link="btn.link || false"
              @click="operate(btn, row)"
            >
              {{ btn.title }}
            </el-button>
          </template>
        </el-table-column>
      </template>

      <!-- 空数据展示 -->
      <template #empty>
        <slot name="empty">
          <!-- 默认内容 -->
          <div class="img-wrap flex flex-direction justify-center">
            <img
              v-if="tableOption.receiver"
              style="width: 168px; height: 168px"
              src="~@/assets/images/noreceiver.png"
              alt="no rereiver"
            />
            <img
              v-else
              style="width: 168px; height: 168px"
              src="~@/assets/images/nodata.png"
              alt="no data"
            />
          </div>
          <span>暂无数据</span>
        </slot>
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="tableOption.page"
      v-model:page-size="tableOption.page.pageSize"
      v-model:current-page="tableOption.page.currentPage"
      background
      :layout="tableOption.page.layout || 'total, sizes, prev, pager, next, jumper'"
      :class="['pagenation', tableOption.className]"
      :page-sizes="tableOption.page.pageSizes || [10, 20, 40, 80]"
      :pager-count="tableOption.page.pageCounter || 7"
      :total="tableOption.page.total"
      @change="changePage"
    />
  </div>
</template>

<script setup>
// 组件名称
defineOptions({
  name: 'bf-table'
})

const emit = defineEmits(['operateColClick', 'changePage'])

const props = defineProps({
  tableOption: {
    type: Object,
    default: () => ({})
  },
  tableData: {
    type: Array
  }
})

// 分页组件事件
// current-page 改变时触发
const changePage = (page, pageSize) => {
  emit('changePage', { page, pageSize })
}

// 表格列操作, 如果btn 配置了callback方法，就调callback
const operate = (btnItem, row) => {
  if (typeof btnItem.callback == 'function') {
    btnItem.callback(row, btnItem)
  } else {
    emit('operateColClick', btnItem.prop, row)
  }
}
</script>
<style lang="scss" scoped>
.bf-table {
  width: 100%;

  :deep(.el-table) {
    margin: 0 0 20px;
  }
  .group-btns {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .btn-position-left {
    justify-content: start;
  }
  .btn-position-right {
    justify-content: end;
  }
  .btn-position-between {
    justify-content: space-between;
  }

  .pagenation {
    display: flex;
    justify-content: end;
  }
}
.custom-tb {
  width: 100%;
}
</style>
