import React, { Component } from 'react';
import CoinAnime from '../services/CoinFrames';

class CoinAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      frame: 6,
    });

    this.spinCoinAnime = this.spinCoinAnime.bind(this);
  }

  spinCoinAnime() {
    const { frame } = this.state;
    const totalFrames = 6;
    setTimeout(() => {
      this.setState({
        frame: frame === 1 ? totalFrames : frame - 1,
      });
    }, 100);
  }

  render() {
    const { frame } = this.state;
    requestAnimationFrame(this.spinCoinAnime);
    return (
      <div>
        {CoinAnime(frame)}
      </div>
    );
  }
}

export default CoinAnimation;
