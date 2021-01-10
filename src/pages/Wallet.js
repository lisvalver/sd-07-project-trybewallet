import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoedaAPI } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      atualExpenses: 0,
    };

    this.currenciesOption = this.currenciesOption.bind(this);
  }

  componentDidMount() {
    const { getAPI } = this.props;
    getAPI();
  }

  currenciesOption() {
    const { currencies } = this.props;
    const choosedCoin = Object.entries(currencies);
    const filtered = choosedCoin.filter(
      (currencie) => currencie[0] !== 'USDT',
    );
    return filtered;
  }

  render() {
    const { email, currencies } = this.props;
    const { atualExpenses } = this.state;
    const currenciesOption = this.currenciesOption();

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h4 data-testid="total-field">{ atualExpenses }</h4>
          <h4 data-testid="header-currency-field">{ currencies }</h4>
        </header>
        <form>
          <label htmlFor="addExpenses">
            Adicione valor da despesa
            <input name="addExpenses" type="number" data-testid="value-input" />
          </label>
          <label htmlFor="discription">
            Descrição da despesa
            <input name="discription" type="text" data-testid="description-input" />
          </label>
          <select>
            {currenciesOption.map((currencie) => (
              <option
                key={ currencie[0] }
                value={ currencie[0] }
                data-testid={ currencie[0] }
              >
                {currencie[0]}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(fetchMoedaAPI()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
