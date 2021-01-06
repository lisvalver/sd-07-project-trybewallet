import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div>
        <header>
          <h2 data-testid="email-field">
            Email:
            { email }
          </h2>
          <h2 data-testid="total-field">Despesa total: 0</h2>
          <h2 data-testid="header-currency-field">Câmbio: BRL</h2>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
