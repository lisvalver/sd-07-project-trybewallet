import React, { Component } from 'react'
import { coinAnime } from '../services/svgIndex'

class CoinAnimation extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      frame: 6
    })
  
    this.spinCoinAnime = this.spinCoinAnime.bind(this)
  }

  spinCoinAnime() {
    const { frame } = this.state
    setTimeout(() => {this.setState({ frame: frame === 1 ? 6 : frame - 1 })}, 100)
  }

  render() {
    requestAnimationFrame(this.spinCoinAnime)
    return (
      <div>
        {coinAnime(this.state.frame)}
      </div>
    )
  }
}

export default CoinAnimation
