<template>

    <div v-if="loading">
        Loading...
    </div>

    
    <form 
        v-else 
        @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
               <Input 
                :error="subjectError"
                label="Subject"
                v-model:subject="todo.subject"                
                />
            </div>

            <!-- 
                내용을 수정.. 편집하는 form  
                상태를 바꾸는 버튼은 필요없다.
            -->
            <div 
                v-if="editing"
                class="col-6"
            >
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button class="btn" :class="todo.completed ? 'btn-success' : 'btn-danger' " type="button"
                            @click="toggleTodoStatus">
                            {{ todo.completed ? 'Completed' : 'Incompleted' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 내용을 입력하는 장소  -->
            <div class="col-12">
                <div class="form-group">
                    <label>내용</label>
                    <textarea 
                        v-model="todo.body"
                        class="form-control" 
                        cols="30" 
                        rows="10"
                    ></textarea>
                </div>
                
                <div v-if="bodyError" class="text-danger">
                    {{ bodyError }}
                </div>

            </div>
            
        </div>

        <button 
            class="btn btn-primary" 
            type="submit" 
            :disabled="todoUpdated"
        >
           {{ editing ? '수정하기' : '추가하기' }}

        </button>

        <button type="button" class="btn btn-outline-dark ml-2" @click="moveToListPage">
            Cancel
        </button>
    </form>
</template>

<script>
    import {useRoute,useRouter} from 'vue-router';
    import axios from '@/axios';
    import {ref, computed} from 'vue';
    import _ from 'loadsh';
    import { useToast} from '@/composables/toast'
    import Input from '@/components/Input.vue'

    export default {
        components: {
            Input
        },

        props: {
            editing: {
                type: Boolean,
                default: false
            }
        },

        setup(props) {
           
            const route = useRoute();
            const router = useRouter();
            const todo = ref({
                subject: '',
                completed: false,
                body: ''
            }); // 계속 변하는 데이터

            // 내용의 빈것이 있는지를 체크한다.
            const subjectError = ref('');
            const bodyError = ref('');

            const originalTodo = ref(null); // 원본 보관용
            const loading = ref(true);
            const userId = route.params.id;
            // Toast 관련     
            const {
                showToast,
                toastMessage,
                toastAlertType,
                triggerToast
            } = useToast();

            const getTodo = async () => {
                loading.value = true;
                try {
                    
                    const res = await axios.get(`todo/${userId}`);
                    // console.log(res.data);
                    todo.value = {...res.data};
                    originalTodo.value = {...res.data};
                    loading.value = false;

                } catch (error) {
                    loading.value = false;
                    console.log(error);
                    triggerToast('서버가 연결되지 않습니다. 확인해 주세요', 'danger');
                }
            }

            const toggleTodoStatus = () => {
                todo.value.completed = !todo.value.completed;
            }

            const todoUpdated = computed(() => {
                return _.isEqual(todo.value, originalTodo.value);
            });

            const moveToListPage = () => {
                router.push({
                    name: 'Todos'
                });
            }           

            const onSave = async () => {
                try {
                    subjectError.value = '';
                    bodyError.value = '';
                    if(!todo.value.subject) {
                        subjectError.value = '제목을 입력하세요.'
                        return;
                    }
                    if(!todo.value.body) {
                        bodyError.value = '내용을 입력하세요.'
                        return;
                    }

                    let res;
                    const data = {
                        subject: todo.value.subject,
                        completed: todo.value.completed,
                        body: todo.value.body
                    }

                    if(props.editing) {
                       res = await axios.put(`todo/${userId}`, data);
                        // 새롭게 데이터를 갱신한다.
                        originalTodo.value = {...res.data};
                        triggerToast("업데이트가 되었습니다");
                    }else{
                       res = await axios.post('todo', data)
                        triggerToast("추가 되었습니다");
                        todo.value.subject = '';
                        todo.value.body = '';

                        // 목록으로 이동하기
                        router.push({
                            name: 'Todos'
                        });

                    } 




                } catch (error) {
                    console.log(error);
                    triggerToast("서버 업데이트에 실패하였습니다.", 'danger');
                }

            }

            // editing  == true
            if(props.editing) {
                getTodo();
            } else {                
                loading.value = false;
            }

            return {

                todo,
                loading,
                toggleTodoStatus,
                moveToListPage,
                
                onSave,
                todoUpdated,

                subjectError,
                bodyError,

                showToast,
                toastMessage,
                toastAlertType
            }

        }

    }
</script>



<style scoped>
    .text-danger {
        color: blue;
    }
</style>