<template>
  <div id="gameDash">
      <div class="scorebox" v-for="(name , index) in gameData.names" v-bind:key="name">
          <h1>{{name}}</h1>
          <Score :index="index" :class="(currentPlayerData.currentPlayerName === name) ? 'current' : ''"/>
      </div>
      <div id="entry" :class="finalScore[currentPlayerData.currentPlayerIndex] || bonusSpare[currentPlayerData.currentPlayerIndex] || bonusStrike[currentPlayerData.currentPlayerIndex] ? 'hidden': ''">
          <h2>Current Player: {{currentPlayerData.currentPlayerName}}</h2>
          <form v-on:submit.prevent="saveScoresStore">
              <label for="first">First Bowl:</label>
              <input v-model="currentPlayerData.firstAttempt" type="number" max="10" min="0" placeholder="Pins">
              <label v-if="(currentPlayerData.firstAttempt !== null) && (currentPlayerData.firstAttempt < 10) " for="first">Second Bowl:</label>
              <input v-if="currentPlayerData.firstAttempt !== null && (currentPlayerData.firstAttempt < 10)" v-model="currentPlayerData.secondAttempt" type="number" :max="10 - currentPlayerData.firstAttempt"  min="0" placeholder="Pins">
              <input id="saveScores" type="submit" value="Save Scores">
          </form>
      </div>
      <div id="bonus-spare" v-if="bonusSpare[currentPlayerData.currentPlayerIndex]">
          <h2>Bonus Roll: {{currentPlayerData.currentPlayerName}}</h2>
          <form v-on:submit.prevent="saveBonusStore">
              <label for="first">Bonus:</label>
              <input v-model="currentPlayerData.firstAttempt" type="number" max="10"  min="0" placeholder="Pins">
              <input id="saveScores" type="submit" value="Save Bonus">
          </form>
      </div>
      <div id="bonus-strike" v-if="bonusStrike[currentPlayerData.currentPlayerIndex]">
          <h2>Bonus Roll: {{currentPlayerData.currentPlayerName}}</h2>
          <form v-on:submit.prevent="saveBonusStore">
              <label for="first">Bonus 1:</label>
              <input v-model="currentPlayerData.firstAttempt" type="number" max="10" min="0" placeholder="Pins">
              <label for="first">Bonus 2:</label>
              <input v-model="currentPlayerData.secondAttempt" type="number" max="10" min="0" placeholder="Pins">
              <input id="saveScores" type="submit" value="Save Bonus">
          </form>
      </div>
      <router-link to="/" id="startOver" v-if="gameOver" @click.native="resetGame">Restart Game</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Score from '@/components/Score.vue';

export default {
  name: 'GameDashboard',
  components: {
      Score
  },
  data() {
    return {
    };
  },
  computed: mapGetters([
      'gameData',
      'currentPlayerData',
      'totalScore',
      'bonusSpare',
      'bonusStrike',
      'finalScore',
      'gameOver'
  ]),
  methods: {
      ...mapActions([
        'saveScoresStore',
        'saveBonusStore',
        'resetGame'
  ])
  },
  mounted(){
  }
};
</script>

<style scoped>
 #gameDash{
        grid-row: 2/3;
        grid-column: 1/4;
        width: 100vw;
        height: 90vh;
        background-image: url("../assets/Bowling-Alley.jpg");
        background-repeat: no-repeat;
        background-position: top;
        background-size: cover;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: center;
  }

  .scorebox {
      width: 90vw;
      height: 12vh;
      background-color: white;
      border: solid black 1px;
      margin: 1rem 0rem;
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 10vw 80vw;
  }

  .scorebox h1 {
      grid-row: 1/2;
      grid-column: 1/2;
      justify-self: center;
      align-self: center;
      font-size: 1.5rem;
  }

  .current{
      box-shadow: 5px 5px red;
  }

  #entry {
      width: 90%;
      height: 10%;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      background-color: white;
      border: solid black 1px;
  }

  #entry h2 {
      margin: 0rem 1rem;
  }

  #entry label {
      margin: 0rem .5rem;
  }
  #entry input {
      width: 3rem;
  }

  #saveScores{
        background-color: red;
        color: white;
        border-radius: 5px;
        padding: .5rem;
        margin-left: 1rem;
        width: 5rem !important;
  }
  #bonus-spare {
      width: 90%;
      height: 10%;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      background-color:grey;
      border: solid black 1px;
  }

  #bonus-spare h2 {
      margin: 0rem 1rem;
  }

  #bonus-spare label {
      margin: 0rem .5rem;
  }
  #bonus-spare input {
      width: 3rem; 
  }

  #bonus-strike {
      width: 90%;
      height: 10%;
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      background-color:grey;
      border: solid black 1px;
  }

  #bonus-strike h2 {
      margin: 0rem 1rem;
  }

  #bonus-strike label {
      margin: 0rem .5rem;
  }
  #bonus-strike input {
      width: 3rem;
  }

  .hidden {
      display: none !important;
  }

  #startOver{
    width: 30%;
    height: 2rem;
    background-color: red;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
    padding-top: .5rem;
  }
</style>