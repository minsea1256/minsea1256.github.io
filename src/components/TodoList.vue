<template>
    <!-- 기본 목록 출력 형태 작성 -->
    <!-- <div 
        v-for="(item, index) in todos" 
        :key="item.id" 
        class="card mt-2"
    > -->

    <List 
        :items="todos"
    >
        <template #default="{ item, index }">

            <div 
                class="card-body p-2 d-flex align-items-center"
                @click="moveToPage(item.id)"
                style="cursor:pointer"
            >

                <div class="flex-grow-1">
                    <!-- 
                v-model 은 양향 이라서 
                어디서 바꾸었는지 코드 분석 불가능 
                -->
                    <!-- <input type="checkbox" v-model="item.completed" class="form-check-input">         -->
                    <input 
                        type="checkbox" 
                        :checked="item.completed" 
                        @change="toggleTodo(index, $event)"
                        @click.stop                   
                    >
                    <span 
                        class="ml-3"
                        :class="{todo:item.completed}"  
                    >
                        {{ item.subject }}
                    </span>
                </div>

                <div>
                    <button 
                        class="btn btn-danger btn-sm" 
                        @click.stop="openModal(index)"
                    >
                        Delete
                    </button>
                </div>

            </div>

        </template>

        
        
    </List>   
    <!-- </div> -->

    <teleport to="#modal">
        <DeleteModal
            v-if="showModal"
            @close="closeModal"
            @delete="deleteTodo"
        >            
        </DeleteModal>
    </teleport>

    
</template>

<script>
    import { useRouter } from 'vue-router';
    import DeleteModal from '@/components/DeleteModal.vue';
    import { ref } from 'vue'; 

    import List from '@/components/List.vue' 

    export default {
        components: {
            DeleteModal,
            List
        },

        // props: ['todos'],
        props: {
            todos: {
                type: Array,
                required: true
            }
        },

        emits: [
            'toggle-todo', 'delete-todo'
        ],

        setup(props, { emit }) {

            const router = useRouter();
            const showModal = ref(false);
            
            const toggleTodo = (index, event) => {
                // console.log('토글되네요~' + event.target.checked);
                emit('toggle-todo', index, event.target.checked);
            }
            // 모달창 띄우기
            let todoDeleteId = ref(null);
            const openModal = (index) => {
                 showModal.value = true;
                 todoDeleteId.value = index;
            }
            const closeModal = () => {
                showModal.value = false;
                todoDeleteId.value = null;
            }

            const deleteTodo = () => {
                emit('delete-todo', todoDeleteId.value);                
                showModal.value = false;
                todoDeleteId.value = null;
            }
            
            const moveToPage = (todoId) => {
                // console.log(todoId);
                // router.push('/todos/' + todoId);
                router.push({
                    name: 'Todo',
                    params: {
                        id: todoId
                    }
                });
            }

            return {
                toggleTodo,
                deleteTodo,
                moveToPage,
                showModal,

                openModal,
                todoDeleteId,
                closeModal
            }
        }
    }
</script>

<style>

</style>