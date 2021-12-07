<template>
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <!-- Delete Todo -->
                    <slot name="title"></slot>    
                </h5>
                <button type="button" class="close">
                    <span @click="onClose">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>
                    <slot name="body"></slot>    
                </p>
            </div>
            <div class="modal-footer">

                <slot name="footer"></slot>

                
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props, { emit }) { 
        const onClose = () => {
            emit('close');
        }      
        return  {
             onClose,
        }
    }
}
</script>

<style>
    .modal-wrapper{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
    }
</style>