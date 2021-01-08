import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends Component {
  render() {
    const { email } = this.props;

    return (
      <header>
        <p>Trybe</p>
        <p data-testid="email-field">
          {`Email: ${email}`}
        </p>
        <p data-testid="total-field">{`Despesa Total: ${0}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
