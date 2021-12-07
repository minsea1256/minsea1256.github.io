<template>

  <form class="d-flex" @submit.prevent="onSubmit">

    <div class="flex-grow-1 mr-5">
      <input class="form-control" type="text" v-model="todo" placeholder="할일을 입력하세요.">
    </div>

    <div>
      <button class="btn btn-primary">Add</button>
    </div>
  </form>

  <div v-show="hasBlank" style="color: red;">일정을 입력해주세요.</div>

</template>

<script>
  import {
    ref
  } from 'vue';

  export default {

    emits: [
      'add-todo'
    ],

    setup(props, { emit }) {

      let todo = ref('');
      // todo.value 에 내용이 있고, 없는 경우에 대한 처리
      let hasBlank = ref(false);
      // 목록추가 기능
      const onSubmit = () => {

        if (todo.value === '') {
          hasBlank.value = true;
        } else {
          emit('add-todo', {
            id: Date.now(),
            subject: todo.value,
            completed: false
          });

          todo.value = '';
          hasBlank.value = false;
        }
      }


      return {
        todo,
        hasBlank,
        onSubmit
      }
    }

  }
</script>

<style>

</style>