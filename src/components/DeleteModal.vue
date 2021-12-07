<template>

    <Modal>
        <template #title>  
            Delete Todo          
        </template>

        <template #body>  
            삭제하시겠습니까?          
        </template>

        <template #footer>   

            <button 
                type="button" 
                class="btn btn-secondary"
                @click="onClose"
            >
                닫기
            </button>

            <button 
                type="button" 
                class="btn btn-danger"
                @click="onDelete"
            >
                삭제하기
            </button>
         
        </template>
    </Modal>
  
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
    components : {
        Modal
    },
    setup(props, { emit }) {
        const onClose = () => {
            emit('close');
        }
        const onDelete = () => {
            emit('delete');
        }
        return  {
            onClose,
            onDelete
        }
    }

}
</script>

<style>

</style>