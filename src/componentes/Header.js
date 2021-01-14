import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 0,
      cambio: 'BRL',
    };
  }

  render() {
    const { total, cambio } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header data-testid="email-field">
          {email}
        </header>
        <p data-testid="total-field">
          {`Total: ${total}`}
        </p>
        <p data-testid="header-currency-field">
          {`Cambio: ${cambio}`}
        </p>
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
