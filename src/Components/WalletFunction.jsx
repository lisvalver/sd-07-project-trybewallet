import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciAPI from '../actions/currenceAPI';
import { addExpense, updateExpense, editExUpdate } from '../actions/wallet.action';

class WalletFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: {
        method: 'Dinheiro',
        tag: 'Lazer',
        description: '',
        currency: 'USD',
        value: 0,
        exchangeRates: {},
      },
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() { this.handleFetch(); }

  async handleFetch() {
    const { apiFetch } = this.props;
    const { expenses } = this.state;
    const exchangeRates = await apiFetch();
    this.setState({
      expenses: { ...expenses, exchangeRates },
    });
  }

  async handleChange(event) {
    event.preventDefault();
    const { addExp } = this.props;
    const { handleFetch } = this;
    await handleFetch();
    const { expenses } = this.state;
    addExp(expenses);
    this.setState({
      expenses: {
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        currency: 'USD',
        value: 0,
        exchangeRates: { ...expenses.exchangeRates },
      } });
  }

  handleInput(label, newValue) {
    this.setState((state) => ({ ...state,
      expenses: { ...state.expenses, [label]: newValue } }));
  }

  render() {
    const { currencies } = this.props;
    const { expenses } = this.state;
    const { value, method, description, tag, currency } = expenses;
    const filterCurrency = Object.keys(currencies).filter((acc) => acc !== 'USDT');
    return (
      <div className="container-function">
        <form onSubmit={ this.handleChange }>
          <label htmlFor="valor">
            Valor:
            <input
              type="text"
              id="valor"
              className="input-function"
              data-testid="value-input"
              onChange={ (event) => this.handleInput('value', event.target.value) }
              value={ value }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              id="descricao"
              data-testid="description-input"
              onChange={ (event) => this.handleInput('description', event.target.value) }
              value={ description }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.handleInput('currency', event.target.value) }
            >
              {filterCurrency.map((curr) => (
                <option
                  value={ curr }
                  key={ curr }
                  data-testid={ curr }
                >
                  {curr}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Metodo de pagamento:
            <select
              id="pagamento"
              data-testid="method-input"
              onChange={ (event) => this.handleInput('method', event.target.value) }
              value={ method }
            >
              <option value="null">  </option>
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito">Cartão de débito</option>

            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ (event) => this.handleInput('tag', event.target.value) }
            >
              <option value="null"> </option>
              <option value="Alimentação"> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Transporte"> Transporte </option>
              <option value="Saúde"> Saúde </option>
            </select>
          </label>
          <button className="btn-wallet" type="submit">
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  apiFetch: () => dispatch(currenciAPI()),
  addExp: (expenses) => dispatch(addExpense(expenses)),
  editUpdate: (expense) => dispatch(updateExpense(expense)),
  editExUpdate: (updateEx) => dispatch(editExUpdate(updateEx)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isEdit: state.wallet.isEdit,
  updateEx: state.wallet.updateEx,
});

WalletFunction.propTypes = {
  currencies: PropTypes.objectOf.isRequired,
  apiFetch: PropTypes.func.isRequired,
  addExp: PropTypes.func.isRequired,
  // pdateEx: PropTypes.objectOf.isRequired,
  // editUpdate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletFunction);
