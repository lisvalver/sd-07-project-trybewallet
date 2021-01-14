import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpense: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { totalExpense, currency } = this.state;
    console.log(email);
    // const initialValue = 0;

    return(
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { totalExpense.toFixed(2) }
            </span>
            <span data-testid="header-currency-field">
              { currency }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Header);
