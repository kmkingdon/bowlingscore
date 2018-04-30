<template>
  <div class="score">
      <div class="heading">
        <h1 class="frame">1</h1>
        <h1 class="frame">2</h1>
        <h1 class="frame">3</h1>
        <h1 class="frame">4</h1>
        <h1 class="frame">5</h1>
        <h1 class="frame">6</h1>
        <h1 class="frame">7</h1>
        <h1 class="frame">8</h1>
        <h1 class="frame">9</h1>
        <h1 class="frame">10</h1>
      </div>
      <div class="first-attempts">
        <h2 v-for="score in firstAttempts[this.index]" v-bind:key="score">{{score}}</h2>
      </div>
      <div class="second-attempts">
        <h3 v-for="score in secondAttempts[this.index]" v-bind:key="score">{{score}}</h3>
      </div>
      <div class="final-score">
        <h4>Total Score:</h4>
        <h5>{{this.totalScore[this.index]}}</h5>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Score',
  components: {
  },
  props: ['index'],
  data() {
    return {
    };
  },
  computed: mapGetters([
      'firstAttempts',
      'secondAttempts',
      'totalScore',
  ]),
  methods:{
      ...mapActions([
  ]),
  },
  mounted(){
  }
};
</script>

<style scoped>
    .score{
        grid-row: 1/2;
        grid-column: 2/3;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 33% 33% 33%;
        grid-template-columns: 80% 20%;
    }

    .heading{
        grid-row: 1/2;
        grid-column: 1/2;
        display: flex;
        flex-flow: row;
        background-color: grey;
    }

    .heading h1 {
        width: 10%;
        height: 100%;
        color: white;
        text-align: center;
        padding-top: .5rem;
        box-sizing: border-box;
        border: solid black 1px;
    }

    .first-attempts{
        grid-row: 2/3;
        grid-column: 1/2;
        display: flex;
        flex-flow: row;
    }

    .first-attempts h2 {
        width: 10%;
        height: 100%;
        text-align: center;
        padding-top: .5rem;
        box-sizing: border-box;
        border: solid black 1px;
    }

     .second-attempts{
        grid-row: 3/4;
        grid-column: 1/2;
        display: flex;
        flex-flow: row;
    }

    .second-attempts h3 {
        width: 10%;
        height: 100%;
        text-align: center;
        padding-top: .5rem;
        box-sizing: border-box;
        border: solid black 1px;
    }

    .final-score {
        grid-row: 1/4;
        grid-column:2/3;
        display: flex;
        flex-flow: column;
    }

    .final-score h4 {
        width: 100%;
        height: 33%;
        text-align: center;
        padding-top: .5rem;
        background-color: grey;
        box-sizing: border-box;
        border: solid black 1px;
    }

    .final-score h5 {
        width: 100%;
        height: 67%;
        text-align: center;
        padding-top: 1rem;
        font-size: 2rem;
        box-sizing: border-box;
        border: solid black 1px;
    }

   


</style>