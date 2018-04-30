import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameData: {
      number: 0,
      names:[]
    },
    currentPlayerData: {
      currentPlayerName: '',
      currentPlayerIndex: 0,
      firstAttempt: null,
      secondAttempt: null
    },
    firstAttempts: [[], [], [], []],
    secondAttempts: [[], [], [], []],
    totalScore: [0, 0, 0, 0],
  },
  mutations: {
    savePlayersState(state, playersArray){
      state.gameData.names = playersArray;
      state.currentPlayerData.currentPlayerName = playersArray[0];
    },
    saveScoresState(state) {
      state.firstAttempts[state.currentPlayerData.currentPlayerIndex].push(state.currentPlayerData.firstAttempt);

      if(state.currentPlayerData.secondAttempt !== null) {
        state.secondAttempts[state.currentPlayerData.currentPlayerIndex].push(state.currentPlayerData.secondAttempt);
      } else {
        state.secondAttempts[state.currentPlayerData.currentPlayerIndex].push(null);
      }

      let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt));
      state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;

      if(state.currentPlayerData.currentPlayerIndex < (state.gameData.names.length - 1)) {
        state.currentPlayerData.currentPlayerIndex++;
        state.currentPlayerData.currentPlayerName = state.gameData.names[state.currentPlayerData.currentPlayerIndex];
        state.currentPlayerData.firstAttempt = null;
        state.currentPlayerData.secondAttempt = null;
      } else {
        state.currentPlayerData.currentPlayerIndex = 0;
        state.currentPlayerData.currentPlayerName = state.gameData.names[state.currentPlayerData.currentPlayerIndex];
        state.currentPlayerData.firstAttempt = null;
        state.currentPlayerData.secondAttempt = null;
      }
    }
  },
  actions: {
    savePlayersStore({commit}, event){
      let playersArray= [];

      playersArray.push(event.target[0].value);
      
      if (event.target[1] !== undefined && event.target[1].classList.value === "nameInput"){
        playersArray.push(event.target[1].value);
      };

      if (event.target[2] !== undefined && event.target[2].classList.value === "nameInput") {
        playersArray.push(event.target[2].value);
      };

      if (event.target[3] !== undefined && event.target[3].classList.value === "nameInput") {
        playersArray.push(event.target[3].value);
      };

      commit('savePlayersState', playersArray);
    },
    saveScoresStore({ commit }) {
      commit('saveScoresState');
    }
  },
  getters: {
    gameData: state => state.gameData,
    currentPlayerData: state => state.currentPlayerData,
    firstAttempts: state => state.firstAttempts,
    secondAttempts: state => state.secondAttempts,
    totalScore: state => state.totalScore,
  }
})
