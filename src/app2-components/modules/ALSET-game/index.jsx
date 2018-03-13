import React, { Component } from 'react';

import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import Matter from 'matter-js';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

// components
import Background from './components/background.jsx';
import Character from './components/character.jsx';
import Stone from './components/stone.jsx';
import Grass from './components/grass.jsx';
import Score from './components/score.jsx';
import Info from './components/info.jsx';
import Controls from './components/controls.jsx';
import WinLoseScreen from './components/winLoseScreen.jsx';
// stores
import GameStore1 from './store/game-store1.jsx';
import GameStore2 from './store/game-store2.jsx';
import GameStore3 from './store/game-store3.jsx';
import GameStore4 from './store/game-store4.jsx';

//import images
import CharacterBlonde from './assets/character-blonde.png';
import CharacterBrunette from './assets/character-brunette.png';
import './style.css'

class Game extends Component {
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
  }

  componentDidMount() {
    if (this.keyListener1 && this.keyListener1.status !== false)
      this.keyListener1.subscribe([
        this.keyListener1.LEFT,
        this.keyListener1.RIGHT,
        this.keyListener1.UP,
        this.keyListener1.DOWN,
      ]);
    if (this.keyListener2 && this.keyListener2.status !== false) this.keyListener2.subscribe([73, 74, 75, 76]);
  }

  componentWillUnmount() {
    if (this.keyListener1) this.keyListener1.unsubscribe();
    if (this.keyListener2) this.keyListener2.unsubscribe();
  }
  componentWillReceiveProps(nextProps){}
  render() {
    let GameStore;
    if (this.props.gameId === 0) GameStore = GameStore1;
    else if (this.props.gameId === 1) GameStore = GameStore2;
    else if (this.props.gameId === 2) GameStore = GameStore3;
    else if (this.props.gameId === 3) GameStore = GameStore4;
    if (this.props.config) GameStore.config = this.props.config;
    const { showScore=true, showMode=true, onScoreUpdate, onWin, play, onPause, control}=this.props;
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
            <Character
              keys={this.keyListener1}
              store={GameStore}
              imgSrc={CharacterBlonde}
              key={0}
              index={0}
              gameId={this.props.gameId}
            />
            <Character
              keys={this.keyListener2}
              store={GameStore}
              imgSrc={CharacterBrunette}
              key={1}
              index={1}
              gameId={this.props.gameId}
            />
            {GameStore.stonesData.map((stone, index) => {
              return <Stone store={GameStore} gameId={this.props.gameId} key={index} index={index} />;
            })}
            {showScore && <Score store={GameStore} left={'0'} right={'none'} playerId={0} />}
            {showScore && <Score store={GameStore} left={'none'} right={'0'} playerId={1} />}
            {showMode &&  <Info gameId={this.props.gameId} />}
            <Controls store={GameStore} 
            play = {play}
            onPause = {(playEvent)=>onPause(playEvent)}
            />
            <WinLoseScreen store={GameStore} 
            onScoreUpdate = {(playerScores)=>onScoreUpdate(playerScores)}
            onWin={(winner)=>onWin(winner)}
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
Game.propTypes = {
  showScore: PropTypes.bool.isRequired,
  showMode: PropTypes.bool.isRequired,
  onScoreUpdate: PropTypes.func.isRequired
}

export default observer(Game);
