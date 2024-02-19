<template>
    <div class="observer" ref="el" />
    <!-- 在其他组件使用方式如下 -->
    <!-- <ol style="height: 100px; border: 1px solid red; overflow:scroll;">
        <li>222</li>
        <li>222</li>
        <li>222</li>
        <li>222</li>
        <LoadMore @load-more="() => console.log('load')"></LoadMore>
    </ol> -->
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['load-more'])

let el = ref()
let observer = ref()

const createObserver = () => {
    observer.value = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            console.log("emit('load-more')")
            emit('load-more');
        }
    });
    observer.value.observe(el.value);
}

onMounted(() => {
    console.log(el.value, 'test')
    createObserver();
})

onUnmounted(() => {
    observer.value.disconnect();
})
</script>
  