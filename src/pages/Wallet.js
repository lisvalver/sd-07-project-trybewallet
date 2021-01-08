import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      atualExpenses: 0,
    };
  }

  render() {
    return(
      <div>
        <header>
          <h3 data-testid="email-field">{ this.props.email }</h3>
          <h4 data-testid="total-field">{ this.state.atualExpenses }</h4>
          <h4 data-testid="header-currency-field">{ this.props.currencies }</h4>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
