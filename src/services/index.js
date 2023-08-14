import { BASE_URL } from '@/constants';

export default {
  async fetchTodoLists() {
    const response = await fetch(`${BASE_URL}?_limit=8`);
    return await response.json();
  },
  async postTodo(data) {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  },

  async deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  async patchTodo(title, index) {
    const response = await fetch(`${BASE_URL}/${index}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
      }),
    });
    return await response.json();
  },
};

// by Alexander Sobko ---> tg @Neyriks
