import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.sumOfExpenses = this.sumOfExpenses.bind(this);
  }

  sumOfExpenses() {
    const { totalExpenses } = this.props;
    const rec = totalExpenses.reduce((result, number) => result + number, 0);
    return rec;
  }

  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <h5 data-testid="total-field">{totalExpenses.length > 0 ? this.sumOfExpenses() : 0}</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
