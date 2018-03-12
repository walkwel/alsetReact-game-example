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
    this.winText = '';
    this.getWrapperStyles = this.checkScore.bind(this);
    this.update = this.update.bind(this);
    this.gatherToWin = this.props.store.config.gatherToWin;
  }

  update() {
    if (this.props.store.score[0] >= this.gatherToWin || this.props.store.score[1] >= this.gatherToWin) {
      this.props.store.mode = 'pause';
    }
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  checkScore() {
    if (this.props.store.score[0] >= this.gatherToWin) {
      this.winText = 'Player 1 Wins!!!';
      return true;
    }else if (this.props.store.score[1] >= this.gatherToWin) {
      this.winText = 'Player 2 Wins!!!';
      return true;
    }else{
      return false;
    }
  }

  render() {
    const isDisplay = this.checkScore();
    return (
      <div>
      { isDisplay &&
        <div className='winLose-wrapper'>
        <h1 style={{ textAlign: 'center', marginTop: '20%', color: '#fff' }}>{this.winText}</h1>
        <button className='winLose-screen'
          onClick={() => {
            this.props.store.mode = 'restart';
            this.props.store.score = [0, 0];
            setTimeout(() => {
              this.props.store.mode = 'play';
            }, 1000);
          }}
        >
          Restart Game
        </button>
      </div>
      }
      </div>
      
    );
  }
}
export default observer(WinLoseScreen);
