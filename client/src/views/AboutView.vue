<script setup>
  import {userStore} from '../stores/usersAuth.js';
  import {onMounted} from 'vue'

  const userAuth = userStore();

</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>dsd{{userAuth.isAuthenticated}}</p>


  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
