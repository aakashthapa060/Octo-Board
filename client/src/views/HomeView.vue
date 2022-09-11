<script setup>
  import {onMounted} from 'vue'
  import {userStore} from '../stores/usersAuth.store.js';
  const userAuth = userStore();
  
  onMounted(async()=> {
    const projects_uri = "http://localhost:3000/api/v1/projects/projects";
    try {
      const response = await fetch(projects_uri, {
        credentials: "include"
      });
      const data = await response.json();
      if(data.status && data.redirect){
        window.location.href = "/login"
      }
      else{
        
      }
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
