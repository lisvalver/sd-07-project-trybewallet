import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses() {
    const { expenses } = this.props;
    console.log(expenses);
  }

  render() {
    const { email } = this.props;

    return (
      <div>
        <span data-testid="email-field">
          Email:
          { email }
        </span>
        <span data-testid="total-field">
          0
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
