<template>
  <el-form ref="formRef" :model="model" :scroll-to-error="true" v-bind="$attrs">
    <div class="flex-container">
      <el-form-item
        v-for="(item, index) of items"
        class="my-form-item"
        :style="getMergedFormItemStyle(item)"
        :key="item.prop"
        v-bind="item.formItemOtherAttrs"
        :prop="item.prop"
        :label="
          item.type === 'button'
            ? ''
            : `${item.label}${
                labelColon ? (typeof labelColon === 'boolean' ? ':' : labelColon) : ''
              }`
        "
        v-label-inner
      >
        <!-- 预览模式 -->
        <template v-if="isPreview">
          {{ model[item.prop] }}
        </template>

        <!-- 当需要一些定制化要求高的场景： 譬如 模糊查询， 一般需要远程查询数据的就需要自己定义slot -->
        <!-- 这里是根据自定义插槽名称生成的插槽 -->
        <template v-else-if="item.slotName">
          <slot :name="item.slotName"></slot>
        </template>

        <!-- 正数输入 -->
        <template
          v-else-if="item.type === 'input' && typeof item.positiveNumPrecision === 'number'"
        >
          <el-input
            v-bind="item.attrs"
            v-model="model[item.prop]"
            v-positive-num-precision="item.positiveNumPrecision"
            @change="changeVal($event, item.prop)"
          />
        </template>

        <!-- 文本输入框 - 有前缀后缀 -->
        <template v-else-if="item.type === 'input' && (item.prepend || item.append)">
          <el-input
            v-bind="item.attrs"
            v-model="model[item.prop]"
            @change="changeVal($event, item.prop)"
          >
            <template v-if="item.prepend" #prepend>{{ item.prepend }}</template>
            <template v-if="item.append" #append>{{ item.append }}</template>
          </el-input>
        </template>

        <!-- 文本输入框 -->
        <template v-else-if="item.type === 'input'">
          <el-input
            v-bind="item.attrs"
            v-model="model[item.prop]"
            @change="changeVal($event, item.prop)"
          />
        </template>

        <!-- 文本域textarea -->
        <template v-else-if="item.type === 'textarea'">
          <el-input
            type="textarea"
            v-bind="item.attrs"
            v-model="model[item.prop]"
            @change="changeVal($event, item.prop)"
          />
        </template>

        <!-- 文本域textarea -->
        <template v-else-if="item.type === 'inputNumber'">
          <el-input-number v-bind="item.attrs" v-model="model[item.prop]" />
        </template>

        <!-- 基本select-->
        <template v-else-if="item.type === 'select'">
          <el-select
            v-bind="item.attrs"
            v-model="model[item.prop]"
            @change="changeVal($event, item.prop)"
            @focus.once="onNormalSelectFocus(item)"
          >
            <el-option
              v-for="(opt, index) of item.options || []"
              :key="index"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </template>

        <!-- 远程模糊搜索select 需要配置 searchFn(callback)-->
        <!-- v-select-loadmore="loadMore(item)" -->
        <template v-else-if="item.type === 'searchSelect'">
          <el-select
            style="width: 100%"
            remote
            filterable
            :teleported="false"
            v-bind="item.attrs"
            v-model="model[item.prop]"
            @change="onChangeSearchSelect($event, item.prop, item)"
            @focus.once="onSelectFocus($event, item)"
            :remote-method="onSearch.bind(null, item)"
          >
            <el-option
              v-for="(item, index) in item.options || []"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>

        <!-- 单选 -->
        <template v-else-if="item.type === 'radio'">
          <el-radio-group v-bind="item.attrs" v-model="model[item.prop]">
            <el-radio v-for="(opt, index) of item.options || []" :key="index" :value="opt.value">{{
              opt.label
            }}</el-radio>
          </el-radio-group>
        </template>

        <!-- 多选 -->
        <template v-else-if="item.type === 'checkbox'">
          <el-checkbox-group v-bind="item.attrs" v-model="model[item.prop]">
            <el-checkbox
              v-for="(opt, index) of item.options || []"
              :key="index"
              :label="opt.label"
              :value="opt.value"
            ></el-checkbox>
          </el-checkbox-group>
        </template>

        <!-- 日期 -->
        <template v-else-if="item.type === 'datePicker'">
          <!-- type可以在attrs配置： 详细文档见element-plus官网 -->
          <el-date-picker type="date" v-bind="item.attrs" v-model="model[item.prop]" />
        </template>

        <!-- 时间 -->
        <template v-else-if="item.type === 'timePicker'">
          <!-- type可以在attrs配置： 详细文档见element-plus官网 -->
          <el-time-picker v-bind="item.attrs" v-model="model[item.prop]" />
        </template>

        <!-- button -->
        <template v-else-if="item.type === 'button'">
          <!-- type可以在attrs配置： 详细文档见element-plus官网 -->
          <el-button
            type="primary"
            :class="{ 'form-btn-tp': isNeedTopMargin(index) }"
            v-bind="item.attrs"
            :icon="item.search == 'search' ? Search : null"
            @click="onClickBtn(item)"
            >{{ item.label }}</el-button
          >
        </template>
      </el-form-item>
      <el-form-item v-if="$attrs.search" class="my-form-item">
        <el-button type="primary" @click="search" :icon="Search">Search</el-button>
      </el-form-item>
      <el-form-item v-if="$attrs.reset" class="my-form-item">
        <el-button type="primary" plain @click="reset">Reset</el-button>
      </el-form-item>
    </div>
  </el-form>
  <!-- 
    item 数据结构
    item: {
      type: 'input', // 类型
      label: 'name',
      prop: 'a2',
      labelWith: null, // label宽度， 默认可以不设置，自适应
      itemWidth: null, // 具体内容宽度， 默认可以不设置
      slotName: null, // 自定义插槽内容， 需要自定义名称， 根据名称会自动生成:name="slotName"
      attrs: { // 属性，具体可以看element-plus > el-form-item > 文档
        type: 'textarea'
      },
      formItemOtherAttrs: {}, // el-form-item 属性
    },
    -->
</template>

<script setup>
import { ref, useAttrs } from 'vue'
import { Search } from '@element-plus/icons-vue'
// 组件名称
defineOptions({
  name: 'bf-form'
})

const attrs = useAttrs()

const formRef = ref(null)

// form 属性
const props = defineProps({
  itemContentWidth: {
    type: [Number, String],
    default: 'auto'
  },
  items: Array,
  cols: Number,
  model: { type: Object, default: () => ({}) },
  labelWidthIsAuto: Boolean,
  // label后面是否显示冒号，或者其他自定义字符
  labelColon: [Boolean, String],
  isPreview: Boolean // 是否是预览模式
})

const emit = defineEmits(['change', 'btnClick'])

// input select 等的change事件
const changeVal = (val, propKey) => {
  emit('change', propKey, val)
}

// button click事件
const onClickBtn = (item) => {
  emit('btnClick', item)

  // 如果配置了调用方法，可以直接被调用
  if (typeof item.callback == 'function') {
    item.callback()
  }
}

// 表单项布局
const getMergedFormItemStyle = (formItem) => {
  const itemStyle = {}

  // 有列设置直接根据列就行布局
  if (props.cols) {
    // 如果自定义宽度了， 根据自定义宽度， 否则根据cols计算
    if (formItem.itemContentWidth) {
      itemStyle.width = Number.parseFloat(formItem.itemContentWidth) + 'px'
    } else {
      itemStyle.width = `calc(${100 / props.cols}% - 12px)`
    }
  } else if (formItem.itemContentWidth) {
    // 如果自定义宽度了， 根据自定义宽度
    itemStyle.width = Number.parseFloat(formItem.itemContentWidth) + 'px'
  } else if (props.itemContentWidth) {
    // 既没有cols 也没有自定义宽度 根据宽度然后自适应
    itemStyle.width = Number.parseFloat(props.itemContentWidth) + 'px'
  }
  return { ...itemStyle, ...formItem?.style }
}

const onChangeSearchSelect = (selectVal, propKey, item) => {
  emit('change', propKey, selectVal, item)
}

// 模糊查询 select 搜索列表
const onSearch = (item, searchVal) => {
  if (typeof item.searchFn === 'function') {
    item.searchVal = searchVal
    item.searchFn(searchVal, function resolveOptions(list) {
      item.options = list.length ? list : []
    })
  }
}

// 模糊查询 select 首次获取焦点查询一次
const onSelectFocus = (event, item) => {
  onSearch(item)
}

// 普通select选择从后台获取选项时调用一次
const onNormalSelectFocus = (item) => {
  if (typeof item.searchFn === 'function') {
    item.searchFn(function resolveOptions(list) {
      item.options = list.length ? list : []
    })
  }
}

// 加载更多列表
const loadMore = (item) => {
  if (typeof item.searchFn === 'function') {
    item.searchFn(item.searchVal, function resolveOptions(list) {
      item.options = item.options.concat(list.length ? list : [])
    })
  }
}

// 是否让lable宽度一样， 不一样就是自适应， 设置 labelWidthIsAuto = true
const vLabelInner = {
  mounted: (el) => {
    const labelWrapDom = el && el.querySelector('.el-form-item__label-wrap')
    if (labelWrapDom && props.labelWidthIsAuto) {
      labelWrapDom.classList.add('label-inner-wrap-ml')
    }
  }
}

// button 样式
const isNeedTopMargin = (index) => {
  if (
    attrs['label-position'] !== 'top' ||
    (attrs['label-position'] === 'top' && index === props.items?.length - 1)
  ) {
    return false
  }
  return true
}

// 查询
const search = () => {
  typeof attrs.search === 'function' && attrs.search(props.model)
}

// 重置
const reset = () => {
  formRef.value.resetFields()
  typeof attrs.reset === 'function' && attrs.reset()
}

// 暴露的接口
defineExpose({
  form: formRef
})
</script>
<style scoped lang="scss">
.flex-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  :deep(.el-form-item__label) {
    min-height: 22px;
  }

  :deep(.el-select) {
    // 默认如果没下拉选项， 宽度有问题， 故设置默认宽度
    min-width: 192px;
  }

  :deep(.el-input--suffix) {
    min-width: 199px;
  }

  :deep(.el-form-item__content) {
    .el-date-editor {
      width: 100%;
    }
  }

  .my-form-item {
    margin-right: 12px;
    position: relative;
    :deep(.label-inner-wrap-ml) {
      margin-left: auto !important;
    }
  }
  .form-btn-tp {
    margin-top: 30px;
  }
}
</style>

<!-- 
  使用方式
  1. 不加 cols 自适应
  <bf-form 
    ref="shipperFormRef" 
    label-position="top"
    :model="shipperForm"      // 表单数据
    :rules="shipperFormRules" // 表单规则
    :items="shipperFormItems" // 表单项配置
  >
  </bf-form>

  2. 加cols 自动分列
  <bf-form 
    ref="shipperFormRef" 
    :cols="2"   // 表单分几列
    :model="shipperForm" 
    :rules="shipperFormRules" 
    label-position="top"
    :items="shipperFormItems"
  >
    <template #test> // 自定义插槽内容
      <el-input v-positive-num-precision="2" v-model="refv"  />
    </template>
  </bf-form>

  2. 增加 search reset 按钮
  <bf-form 
    ref="shipperFormRef" 
    :model="shipperForm" 
    :rules="shipperFormRules" 
    label-position="top"
    :items="shipperFormItems"
    :search="search"
    :reset="reset"
  >
  </bf-form>
 -->
