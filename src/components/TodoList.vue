<script setup>
import TodoItem from '@/components/TodoItem.vue'
import EmptyState from './shared/EmptyState.vue';

defineProps({
  todoList: {
    type: Array,
    required: true
  }
})

defineEmits(['removeTodo', 'editTodo', 'toggleCompleted'])
</script>

<template>
  <ul v-if='todoList.length'>
    <h2>In progress</h2>
    <transition-group>
      <TodoItem
      v-show='!todo.completed'
        v-for="(todo, index) in todoList"
        :key="todo.id"
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
        v-show='todo.completed'
        v-for="(todo, index) in todoList"
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