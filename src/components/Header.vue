<template>
  <div id="header">
      <h1>Bowling</h1>
      <img src="../assets/bowlingpins.png" alt="bowling pins">
      <h1>Assistant</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Header',
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
  ]),
  methods: mapActions([
  ]),
  mounted(){
  }
};
</script>

<style scoped>
    #header{
        grid-row: 1/2;
        grid-column: 1/4;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        background-color: cornflowerblue;
    }

    #header h1{
        font-size: 4rem;
        color: white;
    }

    #header img {
        height: 95%;
        width: 10rem;
        margin: 0rem 3rem;
    }
</style>