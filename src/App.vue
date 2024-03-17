<script setup lang="ts">
import Menu from './components/menu.vue'
import login from './components/login.vue'
import register from './components/register.vue'
</script>

<template>
 <Menu/>
 <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
