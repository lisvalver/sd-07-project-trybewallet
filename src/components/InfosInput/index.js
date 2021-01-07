import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, walletAction } from '../../actions';
import NewForm from './styles';

class InfosInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { callAPI } = this.props;
    callAPI();
  }

  handleChange({ target: { name, value } }) {
    const { currencies } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      exchangeRates: currencies,
    }));
  }

  handleSubmit() {
    const { addExpense, updateTotal, currencies, callAPI } = this.props;

    callAPI();
    addExpense(this.state);
    updateTotal();

    this.setState((stat) => ({
      id: stat.id + 1,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: currencies,
    }));
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { optionCurrencies } = this.props;
    return (
      <NewForm>
        <label htmlFor="value-input">
          Valor:
          <input
            name="value"
            type="number"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {optionCurrencies.map((option) => (
              <option key={ option[0] } data-testid={ option[0] } value={ option[0] }>
                { option[0] }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
            name="method"
            id="method-input"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            name="tag"
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            type="text"
            id="description-input"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <input
          type="button"
          value="Adicionar despesa"
          id="send-btn"
          onClick={ this.handleSubmit }
        />
      </NewForm>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  optionCurrencies: Object.entries(wallet.currencies)
    .filter((currency) => currency[0] !== 'USDT'),
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  callAPI: () => dispatch(fetchAPI()),
  addExpense: (payload) => dispatch(walletAction.addExpense(payload)),
  updateTotal: () => dispatch(walletAction.updateTotal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfosInput);

InfosInput.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionCurrencies: PropTypes.arrayOf(PropTypes.array).isRequired,
  addExpense: PropTypes.func.isRequired,
  updateTotal: PropTypes.func.isRequired,
  callAPI: PropTypes.func.isRequired,
};
