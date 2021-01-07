import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    // const { currencies } = this.props;
    return <div>TrybeWallet</div>;
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currency,
});

export default connect(
  mapStateToProps,
)(Wallet);
