<template>
  <div class="home">
    <Header />
    <GameSignUp />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import GameSignUp from '@/components/GameSignUp.vue';

export default {
  name: 'home',
  components: {
    GameSignUp,
    Header
  }
}
</script>

<style scoped>

#home {
  display: grid;
  grid-template-rows: 10vh 90vh;
  grid-template-columns: 15vw 70vw 15vw;
  width: 100vw;
  height: 100vh;
}
</style>
