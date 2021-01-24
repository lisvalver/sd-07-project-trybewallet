import React from 'react';
import { connect } from 'react-redux';
import { getCurrencies, buttonExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      methodOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  async componentDidMount() {
    const { getCurrenciesDispatch } = this.props;
    await getCurrenciesDispatch();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((previuosState) => ({
      expense: { ...previuosState.expense, [name]: value },
    }));
  }

  async buttonClick() {
    const { buttonExpensesDispatch, getCurrenciesDispatch } = this.props;
    const { expense } = this.state;
    await getCurrenciesDispatch();
    buttonExpensesDispatch(expense);
    this.setState({ expense: {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    } });
  }

  render() {
    const { currenciesState } = this.props;
    const { methodOptions, tagOptions, expense } = this.state;
    const { value, description, currency, method, tag } = expense;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            className="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            <option selected>Selecione a sua moeda</option>
            {currenciesState.map((c) => (
              <option key={ c } data-testid={ c }>
                {c}
              </option>
            ))}
          </select>
          <select
            className="method-input"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option selected>Selecione o método de pagamento</option>
            {methodOptions.map((m) => (
              <option key={ m } data-testid={ m }>
                {m}
              </option>
            ))}
          </select>
          <select
            className="tag-input"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option selected>Selecione a categoria da despesa</option>
            {tagOptions.map((t) => (
              <option key={ t } data-testid={ t }>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={ this.buttonClick }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesDispatch: () => dispatch(getCurrencies()),
  buttonExpensesDispatch: (ex) => dispatch(buttonExpenses(ex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
