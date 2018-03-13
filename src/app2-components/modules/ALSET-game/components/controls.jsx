import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Controls extends Component {
  static propTypes = {
    store: PropTypes.object,
  };
  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { play, onPause } = this.props
    return (
      <div className='controls-wraper'>
        <div
          onClick={() => {
            this.props.store.mode = 'restart';
            this.props.store.score = [0, 0];
            setTimeout(() => {
              this.props.store.mode = 'play';
             // this.props.store.mode = play;
            }, 1000);
          }}
         className='controls-wraper-child'
        >
          {'restart'}
        </div>
        {this.props.store.mode == 'play' ? (
          <div
            onClick={() => {
              this.props.store.mode = 'pause';
              onPause('pause')
            }}
            className='controls-wraper-child'
          >
            {'pause'}
          </div>
        ) : (
          <div
            onClick={() => {
              this.props.store.mode = 'play';
             // this.props.store.mode = play;
            }}
            className='controls-wraper-child'
          >
            {'resume'}
          </div>
        )}
      </div>
    );
  }
}
export default observer(Controls);
