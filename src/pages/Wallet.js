import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { state } = this.props;
    console.log(state);
    return (
      <div>TrybeWallet</div>
    );
  }
}

const mapStatetoProps = (state) => ({
  state,
});

Wallet.propTypes = {
  state: PropTypes.shape.isRequired,
};

export default connect(mapStatetoProps)(Wallet);
