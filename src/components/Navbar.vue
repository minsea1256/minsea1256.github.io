<template>
  <!-- 메뉴자리 -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link 
      class="navbar-brand" 
      :to="{ name: 'Home' }"
    >
      Home
    </router-link> 

    <router-link 
      class="nav-item mr-2" 
      :to="{ name: 'Todos' }"
    >
      Todos
    </router-link>

    <router-link 
      class="nav-item mr-auto" 
      :to="{ name: 'TodoCreate' }"
    >
      할일 추가
    </router-link>

  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>