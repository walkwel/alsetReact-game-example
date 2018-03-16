import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite } from 'react-game-kit/lib';
import character2 from '../assets/character-brunette.png';

 class Bot2 extends Component {
  static propTypes = {
    keys: PropTypes.object,
    store: PropTypes.object,
    index: PropTypes.number,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.isLeaving = false;

    this.state = {
      characterState: 4,
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { characterPosition, stageX, stageY } = this.props.store;
    const { scale } = this.context;
    const { x, y } = characterPosition[this.props.index];

    const targetX = x + stageX[this.props.index];
    const targetY = y + stageY[this.props.index];

    return {
      width: 100,
      height: 100,
      position: 'absolute',
      transform: `translate(${targetX * scale}px, ${targetY * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  update() {
    const {store, index, player} = this.props;
    const {body} = this.body;
      let characterState = 4;

      if (store.game) {
        if(player) {
          player(store, index, body)
        }
        this.setState({
          characterState: store.characterState[index],
          repeat: characterState < 5,
        });
      }
  };

  render() {
    const x = this.props.store.characterPosition[this.props.index].x;
    const y = this.props.store.characterPosition[this.props.index].y;

    return (
        <div id={this.props.mode + '-player2'} style={this.getWrapperStyles()}>
          <Body
              args={[x, y, 64, 64]}
              inertia={Infinity}
              ref={b => {
                this.body = b;
              }}
          >
            <Sprite
                repeat={this.state.repeat}
                onPlayStateChanged={this.handlePlayStateChanged}
                src={character2}
                scale={this.context.scale*2}
                state={this.state.characterState}
                steps={[6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 5, 5, 5, 5, 12, 12, 12, 12, 5]}
            />
          </Body>
        </div>
    );
  }

}
export default observer(Bot2)
