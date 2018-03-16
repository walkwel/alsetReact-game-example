import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import { observer } from 'mobx-react';

class WinLoseScreen extends Component {
  static propTypes = {
    store: PropTypes.object,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      winner: this.props.store.winner,
    }
    this.winText = '';
    this.getWrapperStyles = this.checkScore.bind(this);
    this.restart = this.restart.bind(this);
    this.setCoinPositions = this.setCoinPositions.bind(this);
    this.setPlayerPosition = this.setPlayerPosition.bind(this);
    // this.update = this.update.bind(this);
    // this.gatherToWin = this.props.store.config.gatherToWin;
  }

  
  // update() {
  //   if (this.props.store.playersScore[0].score >= this.gatherToWin || this.props.store.playersScore[1].score >= this.gatherToWin) {
  //     this.props.store.mode = 'pause';
  //   }
  // }

  // componentDidMount() {
  //   Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  // }

  // componentWillUnmount() {
  //   Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  // }

  checkScore() {
    if (this.props.store.playersScore[0].score >= 5) {
      this.winText = 'Player 1 Wins!!!';
      return true;
    }
    else if (this.props.store.playersScore[1].score >= this.gatherToWin) {
      this.winText = 'Player 2 Wins!!!';
      return true;
    }
    else{
      return false;
    }
  }

  restart(e) {
    e.preventDefault();
    const {store, onDispatch, gameId} = this.props;

    if(onDispatch) {
        onDispatch(store, true, false, gameId );
    }
    this.setCoinPositions();
    this.setPlayerPosition();
}

setCoinPositions() {
  const {coinsPosition, store, coins} = this.props;
  if(coinsPosition) {
      store.coinPosition = coinsPosition;
      if(coinsPosition.length !== coins.length) {
          if(coinsPosition.length < coins.length) {
              for(let i = coinsPosition.length; i < coins.length; i++) {
                  store.setCoinPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
              }
          } else {
              console.error('Mode: ' + this.props.mode + ' - Error, coins ' + coins.length  + ' < ' + coinsPosition.length + ' coinsPosition, you can add coin');
          }
      }
  } else {
      store.coinPosition = coins.map(() => {return ({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500})});
  }
}

setPlayerPosition() {
  const {playersPosition, store } = this.props;
  if(playersPosition) {
      store.characterPosition = playersPosition;
      if(playersPosition.length !== 2) {
          for(let i = playersPosition.length; i < 2; i++) {
              store.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i)
          }
      }
  } else {
      for(let i = 0; i < 2; i++) {
          if(i === 0) {
              store.setCharacterPosition({x: 64, y: 64}, i);
          } else if(i === 1) {
              store.setCharacterPosition({x: 899, y: 450}, i);
          } else {
              store.setCharacterPosition({x: Math.random() * (100 - 800) + 800, y: Math.random() * (100 - 500) + 500}, i);
          }
      }
  }
}

  render() {
    return (
      <div>
      {this.checkScore() ? (
        <div className='winLose-wrapper'>
        <h1 style={{ textAlign: 'center', marginTop: '20%', color: '#fff' }}>{this.winText}</h1>
        <button className='winLose-screen' style={{cursor:'pointer'}}
          onClick={(event) => {
            this.restart(event);
          }}
        >
          Restart Game
        </button>
      </div>
       ) : [] }
      }
      
      </div>
      
    );
  }
}
export default observer(WinLoseScreen);
