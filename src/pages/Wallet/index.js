import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return <div>{email}</div>;
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.defaultProps = { email: 'ada@lovelace.com' };
Wallet.propTypes = { email: PropTypes.string };

export default connect(mapStateToProps)(Wallet);
