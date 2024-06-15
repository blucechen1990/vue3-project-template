<script setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({})
const formRules = ref({})
const formItems = ref([
  {
    type: 'input',
    prop: 'name',
    label: "Sender's Name",
    attrs: {
      placeholder: 'Name',
      maxlength: 50
    }
  },
  {
    type: 'input',
    prop: 'company',
    label: 'Company Name',
    attrs: {
      placeholder: 'Company Name',
      maxlength: 50
    }
  },
  {
    type: 'select',
    prop: 'select1',
    label: 'select1',
    options: [{ label: 'xx', value: 'test' }],
    attrs: {
      placeholder: 'select1'
    }
  },
  {
    type: 'input',
    prop: 'company1',
    label: 'slotName',
    slotName: 'test' // 自定义选项
  },
  {
    type: 'button',
    prop: 'button1',
    label: 'button1'
  },
  {
    type: 'button',
    prop: 'button2',
    label: 'button2'
  }
])
const refv = ref('')
</script>

<template>
  <h2>设置列数自动分配宽度cols</h2>
  <bf-form
    ref="formRef"
    :cols="2"
    :model="formData"
    :rules="formRules"
    label-position="top"
    :items="formItems"
  >
    <template #test>
      <el-input v-positive-num-precision="2" v-model="refv" />
    </template>
  </bf-form>
  <h2>不设置列数cols 自适应</h2>
  <bf-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-position="left"
    :items="formItems"
  >
    <template #test>
      <el-input v-positive-num-precision="2" v-model="refv" />
    </template>
  </bf-form>
</template>

<style scoped></style>
