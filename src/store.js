import Vue from 'vue';
import Vuex from 'vuex';
import router from 'vue-router';

Vue.use(Vuex);

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
    totalScore: ["0", "0", "0", "0"],
    spareBonus: [false, false, false, false],
    strikeBonus: [false, false, false, false],
    doubleStrikeBonus: [false, false, false, false],
    bonusSpare: [false, false, false, false],
    bonusStrike: [false, false, false, false],
    finalScore: [false, false, false, false],
    gameOver: false
  },
  mutations: {
    savePlayersState(state, playersArray){
      //create current player list and sets first player to current player
      state.gameData.names = playersArray;
      state.currentPlayerData.currentPlayerName = playersArray[0];
    },
    saveScoresState(state) {
      //add scores to player arrays
      //add first attemp
      state.firstAttempts[state.currentPlayerData.currentPlayerIndex].push(state.currentPlayerData.firstAttempt);

      //add second attempt(adds nothing if it is a strike)
      if(state.currentPlayerData.secondAttempt !== null) {
        state.secondAttempts[state.currentPlayerData.currentPlayerIndex].push(state.currentPlayerData.secondAttempt);
      } else {
        state.secondAttempts[state.currentPlayerData.currentPlayerIndex].push("");
        state.currentPlayerData.secondAttempt = 0;
      }

      if (state.secondAttempts[state.currentPlayerData.currentPlayerIndex].length === 10) {
        if (parseInt(state.currentPlayerData.firstAttempt) === 10) {
          //If last frame is a strike allows two bonus rolls
          state.bonusStrike.splice(state.currentPlayerData.currentPlayerIndex, 1, true);
        } else if (parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt) === 10) {
          //If last frame is a spare allows one bonus roll
          state.bonusSpare.splice(state.currentPlayerData.currentPlayerIndex, 1, true);
        } else {
          //If not a strike or spare, finalizes score
          state.finalScore.splice(state.currentPlayerData.currentPlayerIndex, 1, true);
        }
      }



      //calculate total score including bonuses
      if (state.doubleStrikeBonus[state.currentPlayerData.currentPlayerIndex] === true) {
          //if the doubleStrikeBonus is on calculates the bonus for having two strikes in a row
          let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt) + parseInt(state.currentPlayerData.secondAttempt));
          state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
          if (parseInt(state.currentPlayerData.firstAttempt) === 10) {
            state.doubleStrikeBonus[state.currentPlayerData.currentPlayerIndex] = true;
          } else {
            state.doubleStrikeBonus[state.currentPlayerData.currentPlayerIndex] = false;
            state.strikeBonus[state.currentPlayerData.currentPlayerIndex] = false;
          }
        } else if (state.strikeBonus[state.currentPlayerData.currentPlayerIndex] === true) {
          //if the strikeBonus is on calculates the bonus for having a strike and adds the next two rolls to the score
          let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt) + parseInt(state.currentPlayerData.secondAttempt));
          state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
          if (parseInt(state.currentPlayerData.firstAttempt) === 10) {
            state.strikeBonus[state.currentPlayerData.currentPlayerIndex] = true;
          } else {
            state.strikeBonus[state.currentPlayerData.currentPlayerIndex] = false;
          }
        } else if (state.spareBonus[state.currentPlayerData.currentPlayerIndex] === true) {
          //if the spareBonus is on adds the first roll to the score as a bonus
          let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt));
          state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
          state.spareBonus[state.currentPlayerData.currentPlayerIndex] = false;
        } else {
          //if no bonus is on adds the scores of the rolls to the total score
          let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt));
          state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
        }
      
        

      //Turn on spare, strike , and doublestrike bonus
      if ((parseInt(state.currentPlayerData.firstAttempt) === 10) && (state.strikeBonus[state.currentPlayerData.currentPlayerIndex] === true)){
        state.doubleStrikeBonus[state.currentPlayerData.currentPlayerIndex] = true;
      } else if ((parseInt(state.currentPlayerData.firstAttempt) === 10) ) {
        state.strikeBonus[state.currentPlayerData.currentPlayerIndex] = true;
      } else if ((parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt)) === 10) {
        state.spareBonus[state.currentPlayerData.currentPlayerIndex] = true;
      }
      
      //Alternate current player and reset values
      if(state.secondAttempts[state.currentPlayerData.currentPlayerIndex].length < 10) {
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
      } else {
        //resets values for bonus attempt
        state.currentPlayerData.firstAttempt = null;
        state.currentPlayerData.secondAttempt = null;
      }

      //Counter and logic to watch for end of game and show restart game button
      let counter = 0;
      state.finalScore.forEach(value => {
        if (value) {
          counter++
        }
      })

      if (counter === state.gameData.names.length) {
        state.bonusSpare.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
        state.bonusStrike.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
        state.gameOver = true;
      }
    },
    saveBonusState(state) {
      //saves first attempt to state
      state.firstAttempts[state.currentPlayerData.currentPlayerIndex].push(state.currentPlayerData.firstAttempt);

      //saves second attempt to state and saves 0 if it is a spare bonus only
      if (state.currentPlayerData.secondAttempt !== null) {
        state.secondAttempts[state.currentPlayerData.currentPlayerIndex].push(state.currentPlayerData.secondAttempt);
      } else {
        state.secondAttempts[state.currentPlayerData.currentPlayerIndex].push("");
        state.currentPlayerData.secondAttempt = 0;
      }

      //adds bonus based on what strike bonus is turned on
      if (state.doubleStrikeBonus[state.currentPlayerData.currentPlayerIndex] === true) { 
        //if doubleStrike bonus is on, adds first bonus roll twice
        let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + (2 * parseInt(state.currentPlayerData.firstAttempt)) + (parseInt(state.currentPlayerData.secondAttempt)));
        state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
        state.finalScore.splice(state.currentPlayerData.currentPlayerIndex, 1, true);
        state.bonusStrike.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
      } else if (state.strikeBonus[state.currentPlayerData.currentPlayerIndex] === true) {
        //if strike bonus is on, adds the bonus to score
        let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt) + parseInt(state.currentPlayerData.secondAttempt));
        state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
        state.finalScore.splice(state.currentPlayerData.currentPlayerIndex, 1, true);
        state.bonusStrike.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
      } else if (state.spareBonus[state.currentPlayerData.currentPlayerIndex] === true) {
        //if spare bonus is on, adds single bonus roll to score
        let total = (parseInt(state.totalScore[state.currentPlayerData.currentPlayerIndex]) + parseInt(state.currentPlayerData.firstAttempt));
        state.totalScore[state.currentPlayerData.currentPlayerIndex] = total;
        state.finalScore.splice(state.currentPlayerData.currentPlayerIndex, 1, true);
        state.bonusSpare.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
      }

      //Alternates players and resets current player after bonus rolls
      if (state.currentPlayerData.currentPlayerIndex < (state.gameData.names.length - 1)) {
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

      //Counter and logic to watch for end of game and show restart game button
      let counter = 0;
      state.finalScore.forEach(value => {
        if(value){
          counter++
        }
      })

      if (counter === state.gameData.names.length){
        state.bonusSpare.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
        state.bonusStrike.splice(state.currentPlayerData.currentPlayerIndex, 1, false);
        state.gameOver = true;
      }
    },
    resetGameState(state){
      //resets all state to start new game
      state.gameData = {
        number: 0,
        names: []
      };

      state.currentPlayerData = {
        currentPlayerName: '',
        currentPlayerIndex: 0,
        firstAttempt: null,
        secondAttempt: null
      };

      state.firstAttempts = [[], [], [], []];
      state.secondAttempts = [[], [], [], []];
      state.totalScore = ["0", "0", "0", "0"];
      state.spareBonus = [false, false, false, false];
      state.strikeBonus = [false, false, false, false];
      state.doubleStrikeBonus = [false, false, false, false];
      state.bonusSpare = [false, false, false, false];
      state.bonusStrike = [false, false, false, false];
      state.finalScore = [false, false, false, false];
      state.gameOver =  false;
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
    },
    saveBonusStore({ commit }) {
      commit('saveBonusState');
    },
    resetGame({commit}) {
      commit('resetGameState');
    }
  },
  getters: {
    gameData: state => state.gameData,
    currentPlayerData: state => state.currentPlayerData,
    firstAttempts: state => state.firstAttempts,
    secondAttempts: state => state.secondAttempts,
    totalScore: state => state.totalScore,
    spareBonus: state => state.spareBonus,
    strikeBonus: state => state.strikeBonus,
    doubleStrikeBonus: state => state.doubleStrikeBonus,
    bonusSpare: state => state.bonusSpare,
    bonusStrike: state => state.bonusStrike,
    finalScore: state => state.finalScore,
    gameOver: state => state.gameOver
  }
})
