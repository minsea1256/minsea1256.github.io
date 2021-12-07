<template>

   <div class="form-group">
        <label>{{ label }}</label>
        <input 
            type="text" 
            :value="subject" 
            @input="onInput"
            class="form-control"
        >
        <div v-if="error" class="text-red">
            {{ error }}
        </div>
    </div>    

</template>

<script>
export default {
    props :  {
        error : {
            type:String,
            required: true
        },
        label : {
            type:String,
            required: true
        },
        subject : {
            type:String,
            required: true
        }
    },
    setup(props, { emit }){
        const onInput = (event) => {
            // console.log(event.target.value);
            emit('update:subject', event.target.value);
        }
        return {
            onInput
        }
    }
}
</script>

<style scoped>
    .text-red {
        color: red;
    }    
</style>