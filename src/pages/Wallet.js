import React from 'react';
import { connect } from 'react-redux';

import WalletHeader from '../components/WalletHeader';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseValue,
      description,
      selectedCurrency
    };
  }

  componentDidMount() {

  }
  render() {
    const { expenseValue, description, selectedCurrency } = this.state;
    return (
      <div>
        <WalletHeader />
        <form>
          <label>
            Valor:
            <input
              type="number"
              data-testid="value-input"
              value={ expenseValue }
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              value={ description }
            />
          </label>
          <label>
            Moeda:
            <select
              type="text"
              data-testid="description-input"
              value={ selectedCurrency }
            >
              {currencies.map((currency) => {
                return (<option key={ currency }value={ currency }>{ currency }</option>);})}
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchData()),
});

connect(mapStateToProps, mapDispatchToProps)(Wallet);

export default Wallet;
