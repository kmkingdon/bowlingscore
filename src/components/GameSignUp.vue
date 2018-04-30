<template>
  <div id="signUp">
    <div v-if="!startGame" id="start">
        <img v-on:click="startGame = true" src="../assets/ball.png" alt="ball">
        <h1>Setup Game</h1>
    </div>
    <div v-if="startGame" id="form">
        <form>
            <label for="number">How many people will be playing?</label>
            <select v-model="gameData.number" name="number">
                <option value="">Select a Number of Players</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
            </select>
        </form>
        <form v-if="gameData.names.length === 0" v-on:submit.prevent="savePlayers">
            <label for="name">Player Names</label>
            <input required class="nameInput" v-if="gameData.number >= 1" type="text" placeholder="Player 1 Name">
            <input required class="nameInput" v-if="gameData.number >= 2" type="text" placeholder="Player 2 Name">
            <input required class="nameInput" v-if="gameData.number >= 3" type="text" placeholder="Player 3 Name">
            <input required class="nameInput" v-if="gameData.number >= 4" type="text" placeholder="Player 4 Name">
            <input id="savePlayers" v-if="gameData.number >= 1" type="submit" value="Save Player Names">
        </form>
        <ol id="playerList" v-if="gameData.names.length > 0" type="1">
            <h2>Players:</h2>
            <li v-for="name in gameData.names" v-bind:key="name">{{name}}</li>
            <router-link id="startGame" to="game">Start Game</router-link>
        </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'GameSignUp',
  components: {
  },
  data() {
    return {
        startGame: false,
    };
  },
  computed: mapGetters([
      'gameData'
  ]),
  methods: {
    ...mapActions([
        'savePlayersStore'
  ]),
    savePlayers(event){
        this.$store.dispatch("savePlayersStore", event);
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
    #signUp{
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
        z-index: -1;
    }

    #start{
        height: 55vh;
        width: 40vw;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    #start img{
        height: 55vh;
        width: auto;
        z-index: 0;
        position: absolute;
        cursor: pointer;
    }

    #start h1 {
        z-index: 1;
        position: relative;
        font-size: 3rem;
        color: white;
        cursor: pointer;
    }

    #form {
        width: 80%;
        height: 100%;
    }

    #form form{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    #form label {
        width: 100%;
        text-align: center;
        margin: 1.5rem 0rem;
        font-size: 1.5rem;
    }

    #form select {
        width: 60%;
        text-align: center;
        font-size: 1rem;
    }

     #form input {
        width: 60%;
        text-align: center;
        font-size: 1rem;
        margin: .5rem 0rem;
    }

    #savePlayers {
        width: 40% !important;
        height: 2rem;
        background-color: red;
        color: white;
        border-radius: 5px;
    }

    #playerList{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 3rem;
    }

    #playerList h2 {
        width: 100%;
        text-align: center;
        margin: 1.5rem 0rem;
        font-size: 1.5rem;
    }

    #playerList li{
        font-size: 1.2rem;
        margin: .5rem 0rem;
        padding: .5rem 0rem;
        width: 40%;
        text-align: center;
        background: white;
    }

    #startGame {
        width: 40%;
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