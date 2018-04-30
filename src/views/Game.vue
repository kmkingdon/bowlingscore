<template>
  <div class="game">
    <Header />
    <GameDashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import GameDashboard from '@/components/GameDash.vue';

export default {
  name: 'Game',
  components: {
    GameDashboard,
    Header
  }
}
</script>

<style scoped>

#game {
  display: grid;
  grid-template-rows: 10vh 90vh;
  grid-template-columns: 15vw 70vw 15vw;
  width: 100vw;
  height: 100vh;
}
</style>
