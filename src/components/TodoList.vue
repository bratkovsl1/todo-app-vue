<script setup>
import { computed } from 'vue'

import TodoItem from '@/components/TodoListItem.vue'
import EmptyState from './shared/EmptyState.vue';

const props = defineProps({
  todoList: {
    type: Array,
    required: true
  }
})

const completedTasks = computed(() => {
  return props.todoList.filter(todo => todo.completed)
});

const uncompletedTasks = computed(() => {
  return props.todoList.filter(todo => !todo.completed);
});

defineEmits(['removeTodo', 'editTodo', 'toggleCompleted'])
</script>

<template>
  <ul v-if='todoList.length'>
    <h2>In progress</h2>
    <transition-group>
      <TodoItem
        v-for="(todo, index) in uncompletedTasks" :key="todo.id"
        :todo="todo"
        :index="index"
        @remove-todo='$emit("removeTodo", todo.id)'
        @edit-todo='$emit("editTodo", $event, index)'
        @toggle-completed='$emit("toggleCompleted", todo.id)'
      >
      </TodoItem>
    </transition-group>
    <h2>Done</h2>
    <transition-group>
      <TodoItem
        v-for="(todo, index) in completedTasks" 
        :key="todo.id"
        :todo="todo"
        :index="index"
        @remove-todo='$emit("removeTodo", todo.id)'
        @edit-todo='$emit("editTodo", $event, index)'
        @toggle-completed='$emit("toggleCompleted", todo.id)'
      >
      </TodoItem>
    </transition-group>
  </ul>
  <template v-else>
    <EmptyState></EmptyState>
  </template>
</template>

<style lang='scss' scoped>
</style>