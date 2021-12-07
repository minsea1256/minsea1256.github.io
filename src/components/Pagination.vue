<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">

        <!-- 이전버튼 자리 -->
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" 
          @click="onClick(currentPage-1)" 
          style="cursor:pointer"
          >Previous</a>
        </li>

        <!-- 반복이 되어야 한다. totlaPage 만큼  -->
        <li 
          v-for="page in totalPage" 
          :key="page" 
          class="page-item"
          :class="currentPage == page ? 'active' : '' "
        >        
          <a class="page-link" 
          @click="onClick(page)" 
          style="cursor:pointer">
            {{ page }}
          </a>
        </li>
        <!-- 다음페이지 이동 버튼 -->
        <li 
          v-if="currentPage !== totalPage" 
          class="page-item"
        >
          <a class="page-link"
           @click="onClick(currentPage + 1)" 
           style="cursor:pointer">Next</a>
        </li>
      
      </ul>
    </nav>
</template>

<script>
export default {
    props : {
        totalPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },

    emits: ['click'],
    
    setup(props, { emit }) {
        const onClick = (page) => {
            emit('click', page);
        }
        return {
            onClick
        }
    }

}
</script>

<style>

</style>