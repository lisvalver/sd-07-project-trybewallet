import React from 'react';
import { connect } from 'react-redux'
import store from '../store/index'

const Header = (props) => {
  const { totalExpense } = props;
  // console.log(props.state.wallet.expenses);
  // const expenses = props.state.wallet;
  // console.log(expenses);
    
  const { state: { user } } = props;
  const dez = 10;
  
  return (
    <div>
      <span data-testid="email.field" htmlFor="email">
        Email: <span data-testid="email-field">{Object.values(user.email)}</span>
      </span>
      <span data-testid="total-field">Despesa total: {parseFloat(totalExpense, dez).toFixed(2)} </span>
      <span data-testid="header-currency-field">BRL</span>
    </div>
  )
};

function mapStateToProps(state) {
  // console.log(state);
  return {
    state
  }
}

export default connect(mapStateToProps)(Header);