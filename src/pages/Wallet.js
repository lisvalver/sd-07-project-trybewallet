import React from 'react';
import { connect } from 'react-redux';
import getCurrencies from '../services/api';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = ({
      currencies: [],
    });
  }

  componentDidMount() {
    getCurrencies()
      .then((response) => {
        delete response.USDT;
        const currencies = Object.keys(response);
        this.setState({
          currencies,
        });
      });
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
          </p>
          <p data-testid="total-field">
            0
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>

        <form>
          <input data-testid="value-input" />
          <input data-testid="description-input" />
          <select data-testid="currency-input">
            {currencies.map((currency, i) => (
              <option
                key={ i }
                data-testid={ currency }
              >
                {currency}
              </option>))}
          </select>
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
