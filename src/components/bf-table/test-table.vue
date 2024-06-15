<script setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: 'test', name2: '11' },
  { id: 2, name: 'test', name2: 'ttt' }
])

const tableOption = ref({
  columns: [
    { prop: 'name', label: 'Name' },
    { prop: 'test2', slotName: 'custom-slot', label: 'Custom' }, // 自定义内容
    { prop: 'name2', label: 'Name2' }
  ],
  operationColumn: {
    btns: [{ prop: 'btn1', title: '操作列button' }]
  },
  page: {
    total: 50
  }
})

const onChangePage = (data) => {
  console.log(data)
}
const operateColClick = (prop, row) => {
  console.log(prop, row)
}
</script>

<template>
  <div>
    <bf-table
      :tableOption="tableOption"
      :tableData="tableData"
      @changePage="onChangePage"
      @operateColClick="operateColClick"
    >
      <template #custom-slot="{ row }">
        <span style="color: red">自定义列内容 {{ row }}</span>
      </template>
    </bf-table>
  </div>
</template>

<style scoped></style>
