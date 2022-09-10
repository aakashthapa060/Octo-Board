<script setup>
defineProps({
  errorMessage: String,
});
</script>

<template>
  <small class="error-text">{{ errorMessage }}</small>
</template>

<style lang="scss" scoped>
.error-text {
  color: $primary-orange;
  font-size: 15px;
}
</style>
