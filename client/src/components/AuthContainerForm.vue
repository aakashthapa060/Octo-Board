<script setup>
	const props = defineProps({
		title: String,
		des: String
	})
</script>

<template>
  <div class="container">
    <div class="user-form">
      <div class="user-form-header">
        <h2>{{title}}</h2>
        <p>{{des}}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-form {
    width: 600px;
    padding: 20px;
    .user-form-header {
      margin-bottom: 30px;
      h2 {
        font-size: 40px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
