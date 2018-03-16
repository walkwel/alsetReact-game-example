import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ALSET_ReactGame from '../modules/ALSET-ReactGame/index.jsx';
import config from '../config'

class Example3 extends Component {
  constructor(){
    super()
    this.playerControlChecker = this.playerControlChecker.bind(this)
    const defaultControlKey = {
      player1:{
        left : 37,
        right : 39,
        up : 38,
        down : 40 
      },
      player2:{
        left : 74,
        right : 76,
        up : 73,
        down : 75 
      }
    }
  }
  playerControlChecker() {
    let player1 = config.player1
    let player2 = config.player2
    if(player1.left === player2.left || player1.right === player2.right
    || player1.up === player2.up || player1.down === player2.down) {
      return false
    }
    return true
  }

  render() {
    let player1 = config.player1
    let player2 = config.player2
    if(this.playerControlChecker())
    {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <ALSET_ReactGame firstPlayer = {player2}  />
      </div>
    );
  }
  else {
    alert("Change your control key")
    return null
  }
  }
}


export default Example3;