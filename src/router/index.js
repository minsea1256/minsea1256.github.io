import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';
import TodoCreate from '../pages/todos/create/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            // 내용의 URL
            path: '/',
            // 보여질 내용 컴포넌트.vue
            component: Home,
            // 이름을 붙여서 URL 연결하기
            name: 'Home'
        },
        {
            path: '/todos',
            component: Todos,
            name: 'Todos'
        }, 
        {
            path: '/todos/create',
            component: TodoCreate,
            name: 'TodoCreate'
        },
        {
            path: '/todos/:id',
            component: Todo,
            name: 'Todo'
        }
    ]
});

export default router;