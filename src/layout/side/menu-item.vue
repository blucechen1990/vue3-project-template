<template>
    <template v-for="(menu, index) of menus" :key="index">
        <el-sub-menu :index="`${parentPath}_${menu.path}`"  v-if="menu.children?.length">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>{{ menu.meta?.title }}</span>
            </template>
            <menu-item :menus="menu.children" :parent-path="menu.path" ></menu-item>
        </el-sub-menu>

        <el-menu-item :index="`${parentPath}_${menu.path}`" v-else>
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                {{ menu.meta?.title }}
            </template>
        </el-menu-item>
    </template>
</template>
<script setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import {onMounted} from 'vue'

defineOptions({
    name: 'menu-item',
})
const props = defineProps({
    menus: {
        type: Array,
        default() {
            return []
        }
    },
    parentPath: {
        type: String,
        default() {
            return ''
        }
    }
})

onMounted(() => {
    console.log(props.menu);
})
</script>