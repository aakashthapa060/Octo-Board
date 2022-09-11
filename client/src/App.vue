<script setup>
import { RouterLink, RouterView } from "vue-router";
import {onMounted} from 'vue';
import {userStore} from './stores/usersAuth.store.js';
const userAuth = userStore();

onMounted(async () => {
  userAuth.checkUser();
})

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
