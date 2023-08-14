<script setup></script>
<template>
 <button class="primary-button">
  <slot></slot>
 </button>
</template>
<style lang='scss' scoped>
@import '@/assets/styles/main';
.primary-button {
  background-color: $secondary-bg-color;
  color: $main-color-text;
  border: 1px solid $secondary-bg-color;
  border: 1px solid #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  cursor: pointer;
}
</style>