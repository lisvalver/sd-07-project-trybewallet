import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { login } = this.props;
    console.log(login);
    return (
      <div>
        <div className="App-header">
          <h1 data-testid="email-field">
            Email:
            {login}
          </h1>
        </div>
        TrybeWallet
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
});

Wallet.propTypes = {
  login: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
