<template>

  <div>

    <div class="d-flex justify-content-between mb-3">
      <h2>TO-DO List</h2>
      <button 
        class="btn btn-primary"
        @click = "moveToCreatePage"
      >
        할일추가
      </button>
    </div>

    <!-- 검색폼 -->
    <input 
      type="text" 
      v-model="searchTxt" 
      @keyup.enter="searchTodo"
      placeholder="Search"       
      class="form-control mb-2"
    >
    <!-- TodoSimpleForm.vue으로 이동 -->
    <!-- emit에서 전달된 경우 
        @하위 emit 이벤트명 = 상위컴포넌트 함수명-->
    <!-- <TodoSimpleForm @add-todo="addTodo" /> -->

    <div style="color:red">{{error}}</div>
    <!-- 할일 출력
        @하위 = "상위"
        :하위 = "상위" -->
    <TodoList v-bind:todos="todos" @toggle-todo="toggleTodo" @deleteTodo="deleteTodo" />
    <!-- {{todos}} -->
    <!-- 기본 목록 출력 형태 작성 -->
    <div v-if="!todos.length" style="color:red;">
      추가된 목록이 없습니다.
    </div>

    <hr />

    <Pagination 
      v-if="todos.length"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @click="getTodos"
    >

    </Pagination>

  </div>
</template>

<script>
  import {computed, ref, watch} from 'vue';
  import TodoList from '@/components/TodoList.vue';
  import axios from '@/axios';
  import { useToast } from '@/composables/toast';
  import { useRouter } from 'vue-router';
  import Pagination from '@/components/Pagination.vue'

  export default {
    components: {
      TodoList,  
      Pagination   
    },
    setup() {
        
      // Toast 관련     
      const {
        showToast, 
        toastMessage,
        toastAlertType,
        triggerToast
      } = useToast();

      let todos = ref([]);
      let error = ref('');

      // Pagination 관련
      // 화면당 보여줄 목록 개수
      let limit = 5;
      // 현재 페이지
      let currentPage = ref(1);
      let totalPage = computed(() => {
        return Math.ceil(numberOfTodos.value / limit);
      });

      // 총 todo의 개수
      let numberOfTodos = ref(0); 

      // 검색어 
      let searchTxt = ref('');
      // 새로운 글을 입력하면 항상 페이지를 1로 맞추어 준다.
      let timer = null;

      watch(searchTxt, () => {                
        clearTimeout(timer);
        timer = setTimeout(function(){            
            getTodos(1);
        }, 2000);
      });
            
      // DB 할일 데이터 가져오기
      const getTodos = async (page = currentPage.value) => {
        
        // 현재 페이지의 값을 갱신한다.
        currentPage.value = page;

        try {
          const res = await axios.get(`todo?_sort=id&_order=desc&subject_like=${searchTxt.value}&_page=${currentPage.value}&_limit=${limit}`);
          // console.log(res);
          todos.value = res.data;
          // 총 목록개수 파악
          numberOfTodos.value = res.headers['x-total-count'];
          // console.log(numberOfTodos.value);
        } catch (err) {
          console.log(err);
          error.value = "목록을 가져오지 못했습니다."
          triggerToast('목록을 가져오지 못했습니다.', 'danger');
        }

      }
      getTodos();      
      
      // 목록기능 추가
      const addTodo = async (_todo) => {
        // todo 데이터를 추가한다.
        // axios.push('db주소',데이터)
        error.value = '';
        try {
          await axios.post('todo', {
            subject: _todo.subject,
            completed: _todo.completed
          });
          // todos.value.push(res.data);
          getTodos(1);

        } catch (err) {
          console.log(err);
          error.value = "할일 추가에 실패하였습니다"
          triggerToast('할일 추가에 실패하였습니다.', 'danger');
        }
      }
      // 할일 토글 기능
      const toggleTodo = async (_index, _checked) => {       
        error.value = '';        
        let update_id = todos.value[_index].id;
        try {
          await axios.patch(`todo/${update_id}`, {
            completed: _checked
          });
          todos.value[_index].completed = _checked;
        } catch (err) {
          console.log(err);
          error.value = '업데이트에 실패하였습니다';
          todos.value[_index].completed = _checked;
          triggerToast('업데이트에 실패하였습니다', 'danger');
          // props로 전달하도록 코드 추가가 필요하다.
        }
      }
      // 할일 삭제 기능
      const deleteTodo = async (index) => {
        console.log('할일이 삭제 되었어요.' + index);
        // todos.value.splice(index, 1);
        error.value = '';
        // index를 통해서 순서를 파악하는 것은 아니다.
        // 실제 삭제할 DB의 id를 파악하여서 전달해야한다.
        let delete_id = todos.value[index].id;

        try {
          await axios.delete(`todo/${delete_id}`);
          // todos.value.splice(index, 1);
          getTodos(1);

        } catch (err) {

          console.log(err);
          error.value = '데이터 삭제에 실패하였습니다.';
          triggerToast('데이터 삭제에 실패하였습니다.', 'danger');

        }
      }

      const searchTodo = () => {
        clearTimeout(timer);
        getTodos(1);
      }

      const router = useRouter();
      const moveToCreatePage = () => {
        router.push({
          name: 'TodoCreate'
        });
      }

      return {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        searchTxt,
        error,
        totalPage,
        currentPage,
        getTodos,
        searchTodo,        
        showToast, 
        toastMessage,
        toastAlertType,
        moveToCreatePage

      }
    }
  }
</script>

<style>
  .mystyle {
    color: red;
  }

  /* 할일 완료 여부에 따른 css */
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>