import React, { Component } from 'react';
import { TileMap } from 'react-game-kit';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Score extends Component {
  static propTypes = {
    store: PropTypes.object,
    left: PropTypes.string,
    right: PropTypes.string,
    playerId: PropTypes.number,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
  }

  render() {
   // let playerNum = this.props.playerId + 1;
    return (
      <div className='score-wraper' style={{left: this.props.left, right: this.props.right}}>
        {/* {'Player ' + playerNum + ': ' + this.props.store.score[this.props.playerId]} */}
        {`Player 1 : ${this.props.store.playersScore[0].score}`}
      </div>
      // player1Score: this.props.store.playersScore[0].score,
      //       player2Score: this.props.store.playersScore[1].score,
      //       player1Round: this.props.store.playersRoundScore[0].score,
      //       player2Round: this.props.store.playersRoundScore[1].score,
      //       rounds: this.props.store.rounds,
      //       coinInRound: this.props.store.coinInRound,
      //       winner: this.props.store.winner,
      //       player1Direction: this.props.store.playerDirection[0],
      //       player2Direction: this.props.store.playerDirection[1],
    );
  }
}
export default observer(Score);
