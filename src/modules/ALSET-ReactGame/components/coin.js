import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { Body, Sprite, TileMap } from 'react-game-kit/lib';
import StoneImg from '../assets/gem.png';

class Coin extends Component {
    static propTypes = {
        store: PropTypes.object,
        index: PropTypes.number,
    };

    static contextTypes = {
        engine: PropTypes.object,
        scale: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.getCoinStyle = this.getCoinStyle.bind(this);
    }

    componentDidMount() {
        Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
    }

    componentWillUnmount() {
        Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
    }

    getCoinStyle() {
        const { coinPosition, stageX, stageY } = this.props.store;
        const { scale } = this.context;
        const { x, y } = coinPosition[this.props.index];

        const targetX = x + stageX[this.props.index];
        const targetY = y + stageY[this.props.index];

        return {
            position: 'absolute',
            width: 30,
            height: 30,
            transform: `translate(${targetX * scale}px, ${targetY * scale}px)`,
            transformOrigin: 'left top',
        };
    }

    move(body, x, y) {
        Matter.Body.setVelocity(body, { x, y });
    };

    update() {
        const { store, index } = this.props;
        const { body } = this.body;

        if (!this.isLeaving) {
            store.setCoinPosition(body.position, index);
            this.isLeaving = true;
        } else {
            const coin = document.getElementById(this.props.mode + '-coin' + index);
            const player1 = document.getElementById(this.props.mode + '-player1');
            const player2 = document.getElementById(this.props.mode + '-player2');

            let coinPositionX = Math.random() * (100 - 800) + 800;
            let coinPositionY = Math.random() * (100 - 500) + 500;

            if(store.rect2Rect(coin, player1)) {
                store.setScore(0);
                store.setCoinPosition({x: coinPositionX, y: coinPositionY}, index);
            }
            // if(store.rect2Rect(coin, player2)) {
            //     store.setScore(1);
            //     store.setCoinPosition({x: coinPositionX, y: coinPositionY}, index);
            // }
        }
    };

    render() {
        let x = this.props.store.coinPosition[this.props.index].x;
        let y = this.props.store.coinPosition[this.props.index].y;

        return (
            <div id={this.props.mode + "-coin" + this.props.index} style={this.getCoinStyle()}>
                <Body
                    args={[x, y, 30, 30]}
                    inertia={Infinity}
                    ref={b => {
                        this.body = b;
                    }}
                >
                <TileMap className='stone-tilemap-style' src={StoneImg} rows={1} columns={1} tileSize={64} layers={[[1]]} />
                </Body>
            </div>
        );
    }

}
export default observer(Coin)
