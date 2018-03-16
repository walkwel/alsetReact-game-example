import React, { Component } from 'react';

import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import Matter from 'matter-js';
import { observer } from 'mobx-react';

//components
import Background from './components/background.jsx';
import Character from './components/character.jsx';
import Character1 from './components/character1';
import Stone from './components/stone.jsx';
import Grass from './components/grass.jsx';
import Score from './components/score.jsx';
import Info from './components/info.jsx';
import Controls from './components/controls.jsx';
import WinLoseScreen from './components/winLoseScreen.jsx';
import Coin from './components/coin'
// stores
import GameStore1 from './store/game-store1.jsx';
import GameStore2 from './store/game-store2.jsx';
import GameStore3 from './store/game-store3.jsx';
import GameStore4 from './store/game-store4.jsx';
import GameStoreBot from './store/game-store-bot'

//import images
import CharacterBlonde from './assets/character-blonde.png';
import CharacterBrunette from './assets/character-brunette.png';
import './style.css'

import config from '../../config'

export default class Game extends Component {
  constructor(props) {
    super(props);
    let GameStore;
    if (this.props.gameId === 0) GameStore = GameStore1;
    else if (this.props.gameId === 1) GameStore = GameStore2;
    else if (this.props.gameId === 2) GameStore = GameStore3;
    else if (this.props.gameId === 3) GameStore = GameStore4;
    if (props.player1) this.keyListener1 = { status: false };
    else this.keyListener1 = new KeyListener();
    if (props.player2) this.keyListener2 = { status: false };
    else this.keyListener2 = new KeyListener();
    this.updateHandler = this.updateHandler.bind(this);
    this.getCommands = this.getCommands.bind(this);
  }
 
  componentWillMount(){
    // const { gameStore, rounds, coinInRound } = this.props;
    // if(rounds) {
    //   gameStore.rounds = rounds;
    // }
    // if(coinInRound) {
    //   gameStore.coinInRound = coinInRound;
    // }
     this.setCoinPositions();
    this.setPlayerPosition();
  }

  componentDidMount() {
      if (this.keyListener1 && this.keyListener1.status !== false && this.props.firstPlayer) {
        console.log("with props player1")
      const {left,right,up,down} = this.props.firstPlayer
      this.keyListener1.subscribe([
        left, right, up, down 
      ]);
    }
    else if (this.keyListener1 && this.keyListener1.status !== false) {
      console.log("no props player1")
        this.keyListener1.subscribe([
           this.keyListener1.LEFT,
           this.keyListener1.RIGHT,
           this.keyListener1.UP,
           this.keyListener1.DOWN,
        ]);
      }
    
      if (this.keyListener2 && this.keyListener2.status !== false && this.props.secondPlayer) {
        console.log("with props player2")
      const {left,right,up,down} = this.props.secondPlayer
      this.keyListener2.subscribe([
        left, right, up, down 
      ]);
    }
    else if (this.keyListener2 && this.keyListener2.status !== false){
      console.log("no props player2")
     this.keyListener2.subscribe([
      74, 76, 73, 75
    ]);
    }
    }

    setCoinPositions() {
      const {coinsPosition, gameStore, coins} = this.props;
      if(coinsPosition) {
          gameStore.coinPosition = coinsPosition;
          if(coinsPosition.length !== coins.length) {
              if(coinsPosition.length < coins.length) {
                  for(let i = coinsPosition.length; i < coins.length; i++) {
                      gameStore.setCoinPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
                  }
              } else {
                  console.error('Mode: ' + this.props.mode + ' - Error, coins ' + coins.length  + ' < ' + coinsPosition.length + ' coinsPosition, you can add coin');
              }
          }
      } else {
          gameStore.coinPosition = coins.map(() => {return ({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500})});
      }
  }

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
     // store.setCharacterPosition(body.position, index);
  }

setPlayerPosition() {
  const {playersPosition, gameStore } = this.props;
  if(playersPosition) {
      gameStore.characterPosition = playersPosition;
      if(playersPosition.length !== 2) {
          for(let i = playersPosition.length; i < 2; i++) {
              gameStore.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
          }
      }
  } else {
      for(let i = 0; i < 2; i++) {
          if(i === 0) {
              gameStore.setCharacterPosition({x: 64, y: 64}, i);
          } else if(i === 1) {
              gameStore.setCharacterPosition({x: 899, y: 450}, i);
          } else {
              gameStore.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i);
          }
      }
  }
}

componentWillUnmount() {
  if (this.keyListener1) this.keyListener1.unsubscribe();
  if (this.keyListener2) this.keyListener2.unsubscribe();
}

 
  render() {
    const {firstPlayer, secondPlayer} = this.props
    let GameStore;
    if (this.props.gameId === 0) GameStore = GameStore1;
    else if (this.props.gameId === 1) GameStore = GameStore2;
    else if (this.props.gameId === 2) GameStore = GameStore3;
    else if (this.props.gameId === 3) GameStore = GameStore4;
    if (this.props.config) GameStore.config = this.props.config;
    return (
      <Loop>
        <Stage className='index-bg-color'>
          <World
            onUpdate={this.updateHandler}
            onInit={this.physicsInit}
            onCollision={this.colissionHandler}
            gravity={{
              x: 0,
              y: 0,
              scale: 0.001,
            }}
          >
            <Grass />
            {this.props.player ? (
            <Character
            store={this.props.gameStore}
            imgSrc={CharacterBlonde}
            key={0}
            index={0}
            gameId={this.props.gameId}
            mode={this.props.mode}
            player={this.props.player}
          />
          ) : (
            <Character
            store={this.props.gameStore}
            mode={this.props.mode}
            keys={this.keyListener2}
            index={0}
        />
          )}
           {this.props.player1 ? (
                <Character1
                    store={this.props.gameStore}
                    mode={this.props.mode}
                    index={1}
                    player={this.props.player1}
                    imgSrc={CharacterBrunette}
                />
            ) : (
                <Character1
                    store={this.props.gameStore}
                    mode={this.props.mode}
                    keys={this.keyListener1}
                    imgSrc={CharacterBrunette}
                    player={this.props.player1}
                    index={1}
                />
            )}
             {this.props.coins.map((index, key) => (
            <Coin
                key={key}
                store={this.props.gameStore}
                mode={this.props.mode}
                index={key}
            />
         ))}
            <Score store={this.props.gameStore} left={'0'} right={'none'} playerId={0} />
            {/* <Score store={GameStore} left={'none'} right={'0'} playerId={1} /> */}
            <Info gameId={this.props.gameId} />
            <Controls store={GameStore} />
            <WinLoseScreen 
            mode={this.props.mode}
            store={this.props.gameStore}
            coinsPosition={this.props.coinsPosition}
            coins={this.props.coins}
            onDispatch={this.props.onDispatch}
            playersPosition={this.props.playersPosition}
            gameId={this.props.gameId}
            handleClick={this.props.handleClick}
            />
          </World>
        </Stage>
      </Loop>
    );
  }
  physicsInit(engine) {}
  colissionHandler(engine) {}
  updateHandler(engine) {
    let player1Direction;
    let player2Direction;
    let GameStore;
    if (this.props.gameId === 0) GameStore = GameStore1;
    else if (this.props.gameId === 1) GameStore = GameStore2;
    else if (this.props.gameId === 2) GameStore = GameStore3;
    else if (this.props.gameId === 3) GameStore = GameStore4;
    if (GameStore.mode === 'pause') return;
    let WorldData = {
      players: GameStore.characterPosition,
      stones: GameStore.stonesData,
    };
    if (this.props.player1)  player1Direction = this.props.player1(WorldData);
    if (this.props.player2)  player2Direction = this.props.player2(WorldData);
    if (player1Direction) {
      if (player1Direction.left) GameStore.characterState[0] = 9;
      else if (player1Direction.right) GameStore.characterState[0] = 11;
      else if (player1Direction.up) GameStore.characterState[0] = 8;
      else if (player1Direction.down) GameStore.characterState[0] = 10;
    }
    if (player2Direction) {
      if (player2Direction.left) GameStore.characterState[1] = 9;
      else if (player2Direction.right) GameStore.characterState[1] = 11;
      else if (player2Direction.up) GameStore.characterState[1] = 8;
      else if (player2Direction.down) GameStore.characterState[1] = 10;
    }
    GameStore.createNewStones();
  }

}

Game.defaultProps={
  gameId : config.gameId
}


