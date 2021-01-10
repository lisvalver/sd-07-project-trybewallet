import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expense: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { emailState } = this.props;
    const { expense, currency } = this.state;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{ emailState }</p>
          <p data-testid="total-field">{ expense }</p>
          <p data-testid="header-currency-field">{ currency }</p>
        </header>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
});

Wallet.propTypes = {
  emailState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
