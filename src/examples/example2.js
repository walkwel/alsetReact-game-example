import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ALSET_Game from '../app2-components/modules/ALSET-game/index';
import Header from '../app2-components/components/header';


class Game extends Component{
    constructor(){
        super();
        this.state={
            showMode : true,
            showScore : true,
            scores : {player1Score : 0, player2Score: 0},
            winner : null,
            playGame : null
        }
        this.onScoreUpdate = this.onScoreUpdate.bind(this);
        this.onWin = this.onWin.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.toggleScore=this.toggleScore.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.scores={player1Score : 0, player2Score: 0};

    }
     onScoreUpdate(playerScores){
        if(playerScores.player1Score === this.state.scores.player1Score &&  playerScores.player2Score === this.state.scores.player2Score){
            return;
        }
        console.log("geting name & score",playerScores);
        this.setState({scores : playerScores});
      }
      onWin(winner){
        console.log("Winner..",winner);
       // this.setState({winner : winner});
      }
      onPlay(){
       this.setState({playGame:'play'})
       console.log("called")
      }
      onPause(playEvent){
        console.log(playEvent,"pause")
      }
      toggleMode(){
        this.setState({showMode : !this.state.showMode});
      }
      toggleScore(){
        this.setState({showScore : !this.state.showScore});
      }
    render(){
        const { showMode ,scores, showScore, winner, playGame} = this.state;
        return (
            <div style={{ height: '600px', width: '100%' }}>
                <Header  
                    scores={scores} 
                    toggleScore={()=>this.toggleScore()}
                    toggleMode={()=>this.toggleMode()}
                    winner={winner}
                    onPlay = {()=>this.onPlay()}
                />
                <ALSET_Game 
                    key={0}
                    gameId={0} 
                    showMode={showMode} 
                    showScore={showScore} 
                    onScoreUpdate={(playerScores)=>this.onScoreUpdate(playerScores)} 
                    onWin={(winner)=>this.onWin(winner)}
                    play = {playGame}
                    onPause = {(playEvent)=>this.onPause(playEvent)}
                    control = {'play'}
                />
            </div>
        )
    }
}

export default Game;