<script setup>
import { isExceedMaxN } from '@/utils/fns'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['onFileChange'])

// 文件类型

const props = defineProps({
  limit: {
    type: Number,
    default() {
      return 5
    }
  },
  accept: {
    type: String,
    default: () => `.xls,.xlsx`
  },
  maxFileSize: {
    type: Number,
    default: () => 5 // 文件大小限制最大5M
  }
})

const onChange = (file) => {
  if (isExceedMaxN(props.maxFileSize, file.size)) {
    return ElMessage.warning(`The file size exceeds ${props.maxFileSize}M`)
  }
  emit('onFileChange', file)
}
</script>
<template>
  <el-upload
    :auto-upload="false"
    :accept="accept"
    :limit="limit"
    :on-change="onChange"
    :show-file-list="false"
  >
    <slot>
      <el-button type="primary" plain>
        <el-icon class="mr-2"><Upload /></el-icon>
        Import
      </el-button>
    </slot>
  </el-upload>
</template>

<style scoped lang="scss"></style>
