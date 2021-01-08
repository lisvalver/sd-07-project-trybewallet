import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesValue from './ExpensesValue';

export class HeaderWallet extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{email}</h3>
        <h3>
          Despesa Total: R$
          <ExpensesValue />
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(HeaderWallet);

HeaderWallet.propTypes = {
  email: PropTypes.string.isRequired,
};
