import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, totalExpense } = this.props;
    return (
      <>
        <h2 data-testid="email-field">{ email }</h2>
        <h2 data-testid="total-field">{ totalExpense.toString() }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

Header.defaultProps = {
  totalExpense: 0,
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number,
};

export default connect(mapStateToProps)(Header);
