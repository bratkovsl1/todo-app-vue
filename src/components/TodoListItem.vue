<script setup>
import VButton from '@/components/UI/VButton.vue';
import { ref } from 'vue';

defineProps({
  todo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const isEdit = ref(false);

const isEditing = () => {
  isEdit.value = !isEdit.value
};

const editTodo = (title, index) => {
  emit('editTodo', title, index);
};

const removeTodo = (id) => {
  emit('removeTodo', id)
};

const emit = defineEmits(['removeTodo', 'editTodo', 'toggleCompleted']);
</script>
<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggleCompleted', todo.id)"
    />
    <input
      type="text"
      v-if="isEdit"
      :value="todo.title"
      @change="editTodo($event.target.value, todo.id)"
      @keydown.enter='isEditing'
    />
    <span v-else>{{ todo.title }}</span>
    <div class="todo-item__controls">
      <v-button @click="isEditing"> edit </v-button>
      <v-button @click.once="removeTodo(todo.id)"> delete </v-button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/main';

.todo-item {
  margin-top: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $secondary-bg-color;
  border-radius: 4px;

  &__title {
    font-weight: 600;
  }

  &__controls {
    display: flex;
    gap: 5px;
  }
}
</style>
