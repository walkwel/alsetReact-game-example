import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ALSET_ReactGame from '../modules/ALSET-ReactGame/index.jsx';
import GameStoreBot from '../modules/ALSET-ReactGame/store/game-store-bot'
import GameStore1 from '../modules/ALSET-ReactGame/store/game-store1'
import Matter from 'matter-js';


class Example1 extends Component {
  constructor(){
    super()
    this.state = {
      gameState: [true, true, true],
      isLeaving: false,
    };
      this.lastX = 0;
    this.getCommands = this.getCommands.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  move(body, x, y) {
      Matter.Body.setVelocity(body, { x, y });
  };


getCommands(store, index, body) {
  let botPositionX = parseInt(body.position.x);
  let botPositionY = parseInt(body.position.y);

  let botLengthToCoin;
  let data = [], dataMin = [];
  for(let i = 0; i < store.coinPosition.length; i++) {
      botLengthToCoin = store.sort(store.coinPosition[i].x, botPositionX, store.coinPosition[i].y, botPositionY);
      data.push(botLengthToCoin);
      dataMin.push(botLengthToCoin[0].minCoin);
  }
  let dataMinCoin = Math.min.apply(null, dataMin);
  let found = data.find((loc) => {
      return loc[0].minCoin === dataMinCoin;
  });

  let coinPosX = parseInt(found[0].x);
  let coinPosY = parseInt(found[0].y);
  store.botsTest(store.characterPosition[0].x, store.characterPosition[0].y, store.characterPosition[1].x, store.characterPosition[1].y);

  const randomPosition = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  if(store.botBesideBot) {
      let calculationPosition = randomPosition[Math.floor(Math.random() * randomPosition.length)];
      if(index === 0) {
          this.move(body, calculationPosition, calculationPosition);
          store.setCharacterState(1, index);
      } else {
          if(calculationPosition < 0) {
              calculationPosition = -calculationPosition;
              this.move(body, calculationPosition, calculationPosition);
          } else {
              calculationPosition = +calculationPosition;
              this.move(body, calculationPosition, calculationPosition);
          }
          store.setCharacterState(4, index);
      }
  } else {
      if(coinPosX < botPositionX) {
          this.move(body, -1, 0);
          if(index === 0) {
              store.setCharacterState(1, index);
          } else {
              store.setCharacterState(4, index);
          }
          store.setDirection({left: 'true', right: 'false', up: 'false', down: 'false'}, index);
      } else if(coinPosX > botPositionX) {
          this.move(body, 1, 0);
          if(index === 0) {
              store.setCharacterState(0, index);
          } else {
              store.setCharacterState(1, index);
          }
          store.setDirection({left: 'false', right: 'true', up: 'false', down: 'false'}, index);
      } else if(coinPosY < botPositionY) {
          this.move(body, 0, -1);
          store.setCharacterState(2, index);
          store.setDirection({left: 'false', right: 'false', up: 'true', down: 'false'}, index);
      } else if(coinPosY > botPositionY) {
          this.move(body, 0, 1);
          store.setCharacterState(3, index);
          store.setDirection({left: 'false', right: 'false', up: 'false', down: 'true'}, index);
      }
  }
  store.setCharacterPosition(body.position, index);
}

handleDispatch(store, startNewGame, pauseGame, gameId) {
  if(startNewGame) {
      store.playersScore[0].score = 0;
      store.playersScore[1].score = 0;
      store.playersRoundScore[0].score = 0;
      store.playersRoundScore[1].score = 0;
      store.winner = '';
      if(store.game === false) {
          store.game = !store.game
      }
      this.handleClick(gameId)
  }
  if(pauseGame) {
      store.game = !store.game
  }
}

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <ALSET_ReactGame 
         gameId={1}
         gameState={this.state.gameState}
         gameStore={GameStoreBot}
         gameStoreOfStone = {GameStore1}
         key="player-vs-bot"
         mode='player-vs-bot'
         player={(store, index, body) => this.getCommands(store, index, body)}
         coins={[0,0,0,0]}
         rounds={3}
         coinInRound={7}
         gamePauseKey={32}
         handleClick={this.handleClick}
         coinsPosition={[{x: 500, y: 285}, {x: 200, y: 324}, {x: 700, y: 200}]}
         playersPosition={[{x: 64, y: 64 }, {x: 899, y: 450}]}
         onDispatch={(store, startNewGame, pauseGame, gameId) => this.handleDispatch(store, startNewGame, pauseGame, gameId)}
        />
      </div>
    );
  }
  
  handleClick(i) {
    const data = this.state.gameState.slice();
    data[i] = !this.state.gameState[i];
    this.setState({
        gameState: data,
    });
}
}


export default Example1;
