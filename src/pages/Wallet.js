import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { state: { user: { email } } } = this.props;
    return (
      <div className="top-bar">
        <h1>Wallet</h1>
        <div className="top-bar-info">
          <p ata-testid="email-field">
            Email:
            {' '}
            {email}
          </p>
          <p
            ata-testid="total-field"
          >
            Despesa Total: R$ 0,00
            {' '}
            <span
              data-testid="header-currency-field"
            >
              BRL
            </span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  state,
});

Wallet.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStatetoProps)(Wallet);
