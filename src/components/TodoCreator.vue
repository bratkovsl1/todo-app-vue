<script setup>
import { ref } from 'vue'
import VButton from '@/components/UI/VButton.vue'

const todo = ref()

const createTodo = () => {
  if(todo.value) {
    emit('createTodo', todo.value)
    todo.value = ''
  }
}

const emit = defineEmits(['createTodo'])
</script>
<template>
  <div class='todo-creator'>
    <input
      class='todo-creator__input'
      type="text"
      placeholder='Add a new todo'
      v-model.trim='todo'
      @keyup.enter='createTodo'
    >
    <v-button 
      class='todo-creator__button'
      @click='createTodo'
    >
      Create
    </v-button>
  </div>
</template>

<style lang='scss' scoped>
@import '@/assets/styles/main';

.todo-creator {
  display: flex;
  border: 1px solid $main-color-border;

  &__input {
    padding: 12px;
    background-color: #1D1D1D;
    border: none;
    border-radius: 4px;
    color: $main-color-text;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &__button {
    border: none;
  }
}
</style>