import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { state } = this.props;
    // console.log(state);
    return (
    <div>TrybeWallet</div>
    )
  }
}

const mapStatetoProps = (state) => ({
  state: state,
})

export default connect(mapStatetoProps)(Wallet);
