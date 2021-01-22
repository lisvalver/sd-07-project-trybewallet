import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciAPI from '../actions/currenceAPI';
import { updateExpense } from '../actions/wallet.action';
import '../App.css';

class WalletEdit extends React.Component {
  constructor(props) {
    super(props);
    const { updateEx } = this.props;
    if (Object.keys(updateEx).length > 0) {
      this.state = {
        editState: {
          value: updateEx.value,
          currency: updateEx.currency,
          method: updateEx.method,
          tag: updateEx.tag,
          description: updateEx.description,
          id: updateEx.id,
          exchangeRates: updateEx.exchangeRates,
        },
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
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

  handleChange(name, newValue) {
    this.setState((state) => ({ ...state,
      editState: { ...state.editState, [name]: newValue } }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { updateExf } = this.props;
    const { editState } = this.state;
    const { expenses } = this.state;
    const { handleFetch } = this;
    await handleFetch();
    updateExf(editState);
    this.setState({
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currency: 'USD',
      value: 0,
      id: '',
      exchangeRates: { ...expenses.exchangeRates },
    });
  }

  render() {
    const { editState } = this.state;
    const { value, description, currency, method, tag } = editState;
    const { currencies } = this.props;
    const filterCurrency = Object.keys(currencies).filter((acc) => acc !== 'USDT');
    return (
      <div className="container-function">
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="valor">
            Valor:
            <input
              type="text"
              id="valor"
              className="input-function"
              data-testid="value-input"
              onChange={ (event) => this.handleChange('value', event.target.value) }
              value={ value }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              id="descricao"
              data-testid="description-input"
              onChange={ (event) => this.handleChange('description', event.target.value) }
              value={ description }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.handleChange('currency', event.target.value) }
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
              onChange={ (event) => this.handleChange('method', event.target.value) }
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
              onChange={ (event) => this.handleChange('tag', event.target.value) }
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
            editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateEx: state.wallet.updateEx,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateExf: (expense) => dispatch(updateExpense(expense)),
  apiFetch: () => dispatch(currenciAPI()),
});

WalletEdit.propTypes = {
  updateEx: PropTypes.objectOf.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  updateExf: PropTypes.func.isRequired,
  apiFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletEdit);
