import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTotal } from '../actions';

class Header extends Component {
  componentDidUpdate() {
    const { update } = this.props;
    update();
  }

  render() {
    const { email, totalExpenses } = this.props;

    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          {totalExpenses ? totalExpenses.toFixed(2) : 0 }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  update: () => dispatch(updateTotal()),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
