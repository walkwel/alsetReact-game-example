import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ALSET_Game from './modules/ALSET-game/index.jsx';


class App extends Component {
  constructor(){
    super()
    this.onScoreUpdate = this.onScoreUpdate.bind(this);
    this.onWin = this.onWin.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }
  onScoreUpdate(playerScores){
    console.log("geting name & score",playerScores)
  }
  onWin(winner){
    console.log("Winner..",winner)
  }
  onPlay(playEvent){
    console.log(playEvent)
  }
  onPause(playEvent){
    console.log(playEvent,"pause")
  }
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <ALSET_Game key={0} gameId={0} onScoreUpdate={(playerScores)=>this.onScoreUpdate(playerScores)} 
        onWin={(winner)=>this.onWin(winner)}
        onPlay = {(playEvent)=>this.onPlay(playEvent)} onPause = {(playEvent)=>this.onPause(playEvent)}/>
      </div>
    );
  }
}


export default App;
