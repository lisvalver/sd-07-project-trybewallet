import React from 'react';
import { connect } from 'react-redux'

const Header = (props) => {  
  const { state: { user } } = props;
  
  return (
    <div>
      <span data-testid="email.field" htmlFor="email">
        Email: <span data-testid="email-field">{Object.values(user.email)}</span>
      </span>
      <span data-testid="total-field">Despesa total: {0} </span>
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