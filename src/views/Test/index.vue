<script setup>
import {inject} from 'vue'
// import LoadMore from '@/components/LoadMore/index.vue'

const message = inject('message')

const show = () => {
  console.log(message)
  ElMessage(message.value.test)
}


</script>

<template>
  <h1>test</h1>
  <input type="text" v-focus v-positive-num-precision="2">
 
  <header>
    {{ message.test }}
    <el-button type="primary" @click="show">我是 ElButton</el-button>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/demo">demo</RouterLink>
        <RouterLink to="/user">user</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
