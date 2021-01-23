import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addExpenses, fetchCurrence, deleteExpenses, addActionForm } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      editExpense: false,
      expenseEdit: {},
      form: {
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
        id: 0,
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delExpenseFunc = this.delExpenseFunc.bind(this);
    this.editForm = this.editForm.bind(this);
    this.saveNewForm = this.saveNewForm.bind(this);
  }

  componentDidMount() {
    const { getCurrence } = this.props;
    getCurrence();
  }

  editForm({ target: { id } }) {
    this.setState((previousState) => ({
      ...previousState,
      editExpense: true,
    }));
    console.log(id);
    const { expenses } = this.props;
    console.log(expenses[id]);
    this.setState((previousState) => {
      const { value,
        description,
        currency,
        method,
        tag,
        id: id2,
      } = expenses[id];

      return ({
        ...previousState,
        form: {
          value,
          description,
          currency,
          method,
          tag,
          id: id2,
        },
      });
    });
    const { editExpense } = this.state;
    console.log(editExpense);
  }

  saveNewForm() {
    this.setState((previousState) => ({
      ...previousState,
      editExpense: false,
    }));
  }

  async handleClick() {
    const { getCurrence, addXablau, currencies, editFormAction } = this.props;
    const { total, editExpense } = this.state;
    console.log(currencies);
    await getCurrence();
    this.setState((previousState) => ({
      ...previousState,
      form: {
        ...previousState.form,
        exchangeRates: currencies,
      },
    }));
    const { form } = this.state;
    if (!editExpense) {
      addXablau(form);
    } else {
      editFormAction(form);
    }
    const valueConverted = form.value * currencies[form.currency].ask;
    const acum = parseFloat(total) + parseFloat(valueConverted);
    await this.setState((previouState) => ({
      ...previouState,
      form: {
        ...previouState.form,
        value: valueConverted,
        exchangeRates: currencies,
      },
      total: acum,
    }));

    this.setState((previouState) => ({
      ...previouState,
      form: {
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        id: previouState.form.id + 1,
        description: '',
        value: 0,
      },
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((previousState) => ({
      ...previousState,
      form: {
        ...previousState.form,
        [name]: value,
      },
    }));
  }

  delExpenseFunc({ target: { value } }) {
    const { delExpenseActions, expenses } = this.props;
    const newEspenses = expenses.filter((item) => item.id !== Number(value));
    delExpenseActions(newEspenses);
  }

  render() {
    const { email, expenses } = this.props;
    const { total, form } = this.state;
    // console.log(this.props);
    const moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{total}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        Trybe Wallet
        <Link to="/">
          <button type="button"> Voltar </button>
        </Link>

        <form>
          <input
            type="text"
            placeholder="Valor da despesa"
            data-testid="value-input"
            name="value"
            value={ form.value }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            name="description"
            value={ form.description }
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {moedas.map((element, key) => ((element !== 'USDT') && (
                <option
                  key={ key }
                  value={ element }
                  data-testid={ element }
                >
                  { element }
                </option>
              )))}

            </select>
          </label>
          <label htmlFor="method">
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Editar despesa
          </button>
        </form>
        <section>
          <table>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.map((e, index) => (
              <tr key={ index }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{e.value}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>
                  {parseFloat(e.exchangeRates[e.currency].ask * e.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    id={ index }
                    data-testid="edit-btn"
                    onClick={ this.editForm }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ index }
                    onClick={ this.delExpenseFunc }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrence: () => dispatch(fetchCurrence()),
  addXablau: (expenses) => dispatch(addExpenses(expenses)),
  delExpenseActions: (expenses) => dispatch(deleteExpenses(expenses)),
  editFormAction: (expenses) => dispatch(addActionForm(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getCurrence: PropTypes.func.isRequired,
  addXablau: PropTypes.func.isRequired,
  editFormAction: PropTypes.func.isRequired,
  delExpenseActions: PropTypes.func.isRequired,
  currencies: PropTypes.shape().isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};
