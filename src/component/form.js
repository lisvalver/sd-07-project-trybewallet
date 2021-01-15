import React from 'react';
import { connect } from 'react-redux';
import currencyApi from '../services/currency';
import { addExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.inputChange = this.inputChange.bind(this);
    this.handleButton = this.handleButton.bind(this);

    this.state = {
      valor: 0,
      currency: [],
      moeda: '',
      pagamento: 'Dinheiro',
      tag: 'Alimentação',
      despesa: '',
      expenses: [],
    };
  }

  componentDidMount() {
    this.getKeysObject();
  }

  async getKeysObject() {
    const currencyObject = await currencyApi();
    const currency = Object.keys(currencyObject);
    this.setState({
      currency: currency.filter((curr) => curr !== 'USDT'),
    });
  }

  inputChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleButton() {
    const { addExp } = this.props;
    const {
      valor,
      moeda,
      pagamento,
      tag,
      expenses,
      despesa } = this.state;

    const exchangeRate = await currencyApi();

    if (expenses.length === 0) {
      const expense = {
        id: 0,
        value: valor,
        description: despesa,
        currency: moeda,
        method: pagamento,
        tag,
        exchangeRates: exchangeRate,
      };

      await this.setState({
        expenses: [expense],
      });

      addExp([expense]);
    } else {
      const expense = {
        id: expenses.length,
        value: valor,
        description: despesa,
        currency: moeda,
        method: pagamento,
        tag,
        exchangeRates: exchangeRate,
      };

      await this.setState({
        expenses: [...expenses, expense],
      });

      await attAddExp();
    }
  }

  async attAddExp() {
    const { expenses } = this.state;
    await addExp(expenses);
  }

  render() {
    const { currency } = this.state;
    return (
      <div>
        <form>

          <label htmlFor="valor">
            Valor
            <input
              id="valor"
              name="valor"
              type="number"
              data-testid="value-input"
              onChange={ this.inputChange }
            />
          </label>

          <label htmlFor="despesa">
            Descrição
            <input
              id="despesa"
              name="despesa"
              type="text"
              data-testid="description-input"
              onChange={ this.inputChange }
            />
          </label>

          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="moeda"
              data-testid="currency-input"
              onChange={ this.inputChange }
            >
              {currency.map((curr) => (
                <option
                  data-testid={ curr }
                  key={ curr }
                  value={ curr }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="pagamento">
            Método Pagamento
            <select
              id="pagamento"
              name="pagamento"
              data-testid="method-input"
              onChange={ this.inputChange }
            >
              <option
                value="Dinheiro"
              >
                Dinheiro
              </option>
              <option
                value="Cartão de crédito"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
              >
                Cartão de débito
              </option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.inputChange }
            >
              <option
                value="Alimentação"
              >
                Alimentação
              </option>
              <option
                value="Lazer"
              >
                Lazer
              </option>
              <option
                value="Trabalho"
              >
                Trabalho
              </option>
              <option
                value="Transporte"
              >
                Transporte
              </option>
              <option
                value="Saúde"
              >
                Saúde
              </option>
            </select>
          </label>
          <button
            onClick={ () => this.handleButton() }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExp: (exp) => dispatch(addExpenses(exp)),
});

export default connect(null, mapDispatchToProps)(Form);
