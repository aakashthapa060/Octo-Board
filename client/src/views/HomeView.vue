<script setup>
  import {onMounted} from 'vue'
  import {userStore} from '../stores/usersAuth.js';
  const userAuth = userStore();
  
  onMounted(async () => {
    const user_uri = "http://localhost:3000/api/v1/users/user";
    try {
      const response = await fetch(user_uri, {
        method: "GET",
        credentials:"include"
      });
      const data = response.json();
      console.log(data);
    } catch(e) {
      // statements
      console.log(e);
    }
  })



</script>

<template>
  <main>
    {{userAuth.user}}
    {{userAuth.isAuthenticated}}

    <button @click.prevent = "action">ClickMe</button>
    
  </main>
</template>

<style lang="scss" scoped></style>
