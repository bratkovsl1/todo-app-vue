<script setup>
import { ref, onMounted, watch, computed } from 'vue';

import services from '@/services';

import TodoCreator from '@/components/TodoCreator.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFilter from '@/components/TodoFilter.vue';

import VButton from '@/components/UI/VButton.vue';

const todoList = ref([]);
const filter = ref('all');

const fetchTodoList = () => {
  services.fetchTodoLists().then((data) => (todoList.value = data));
};

const createTodo = (todo) => {
  const newTodo = {
    title: todo,
    completed: false,
    id: Math.round(Math.random() * 100),
  };

  services.postTodo(newTodo).then(() => todoList.value.push(newTodo));
};

const removeTodo = (id) => {
  services
    .deleteTodo(id)
    .then(
      () => (todoList.value = todoList.value.filter((todo) => todo.id !== id))
    );
};

const editTodo = (event, id) => {
  filteredTodos.value[id].title = event;
  services.patchTodo(event, id);
};

const toggleCompleted = (id) => {
  todoList.value = todoList.value.map((t) => {
    const todo = t;
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
};

const clearTodos = () => {
  todoList.value = [];
  localStorage.clear();
};

const filteredTodos = computed(() => {
  if (filter.value === 'completed') {
    return todoList.value.filter((todo) => todo.completed);
  } else if (filter.value === 'active') {
    return todoList.value.filter((todo) => !todo.completed);
  } else {
    return todoList.value;
  }
});

const filterTodos = (value) => {
  filter.value = value;
};

watch(
  todoList,
  (newTodoValue) => {
    localStorage.setItem('todos', JSON.stringify(newTodoValue));
  },
  { deep: true }
);

onMounted(() => {
  if (localStorage.getItem('todos') === '[]') {
    fetchTodoList();
  }
  todoList.value = JSON.parse(localStorage.getItem('todos')) || fetchTodoList();
});
</script>

<template>
  <main class="container">
    <h1 class="todos__title">Todos</h1>
    <TodoCreator @create-todo="createTodo"></TodoCreator>

    <div class='todos__controls'>
      <TodoFilter @filter-todo="filterTodos" />
  
      <VButton @click="clearTodos">Clear</VButton>
    </div>
    <TodoList
      @remove-todo="removeTodo"
      @edit-todo="editTodo"
      @toggle-completed="toggleCompleted"
      :todo-list="filteredTodos"
    >
    </TodoList>
  </main>
</template>

<style lang="scss" scoped>
.todos {
  &__title {
    text-align: center;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
