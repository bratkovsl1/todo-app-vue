<script setup>
import { ref } from 'vue';

const filter = ref('all');

defineEmits(['filterTodo'])
</script>

<template>
  <select v-model='filter' @click='$emit("filterTodo", filter)'>
    <option value="all">All</option>
    <option value="completed">Completed tasks</option>
    <option value="active">In progress</option>
  </select>
</template>
<style lang='scss' scoped>

</style>