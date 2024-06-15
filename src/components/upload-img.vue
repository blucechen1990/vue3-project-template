<script setup>
import { isExceedMaxN } from '@/utils/fns'
import { Plus, Delete, CircleClose } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { nextTick } from 'vue'

const props = defineProps({
  limit: {
    type: Number,
    default() {
      return 5
    }
  },
  accept: {
    type: String,
    default: () => `.jpg,.png,.jpeg`
  },
  maxFileSize: {
    type: Number,
    default: () => 5 // 文件大小限制最大5M
  }
})

const fileList = defineModel({ default: [] })

const deleteImg = (rawFile) => {
  fileList.value = fileList.value.filter((file) => file.uid !== rawFile.uid)
}

const onChange = (file) => {
  if (isExceedMaxN(props.maxFileSize, file.size)) {
    nextTick(() => {
      fileList.value.pop()
    })
    return ElMessage.warning(`The file size exceeds ${props.maxFileSize}M`)
  }
}
</script>
<template>
  <el-upload
    class="upload-img"
    list-type="picture-card"
    :auto-upload="false"
    :accept="accept"
    :limit="limit"
    :on-change="onChange"
    v-model:file-list="fileList"
  >
    <div class="flex flex-col justify-between items-center">
      <el-icon size="18">
        <Plus />
      </el-icon>
      Upload image
    </div>

    <template #tip>
      <div class="el-upload__tip">Not more than {{ limit }}m.</div>
    </template>

    <template #file="{ file }">
      <div class="flex flex-col justify-between items-center">
        <span class="relative flex-grow">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <el-icon size="20" class="close" @click="deleteImg(file)"><CircleClose /></el-icon>
        </span>

        <div class="w-[120px] text-nowrap overflow-hidden text-ellipsis">
          {{ file.name }}
        </div>
      </div>
    </template>
  </el-upload>
</template>

<style scoped lang="scss">
.upload-img {
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #fff;
    &:hover {
      box-shadow: 0 0 3px;
      color: red;
    }
  }
}
</style>
