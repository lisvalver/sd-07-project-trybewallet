import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <header className="header">
          <p> Carteira - Trybe Wallet</p>
          <p data-testid="email-field">
            Email:
            {user.email}
          </p>
          <p data-testid="total-field">
            Despesa Total: R$ 0,00
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </header>
      </div>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Wallet);
