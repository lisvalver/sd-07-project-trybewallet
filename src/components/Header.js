import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTotal } from '../actions';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    const totalNumber = total;
    return (
      <header>
        <div className="container-login">
          <div className="name-login">
            Email:
          </div>
          <h2 data-testid="email-field">{email}</h2>
          <br />
          <div>Despesa Total:</div>
          <span data-testid="total-field" value="0">{totalNumber}</span>
          <br />
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendAddTotal: (total) => dispatch(addTotal(total)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
