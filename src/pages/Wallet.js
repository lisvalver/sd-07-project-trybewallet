import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenseCurrency, removeExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.mountExpense = this.mountExpense.bind(this);
    this.updateTotalExpenses = this.updateTotalExpenses.bind(this);
    this.deleteTableElement = this.deleteTableElement.bind(this);

    this.state = {
      api: [],
      valor: 0,
      descricao: '',
      moeda: 'USD',
      metodo: '',
      tag: '',
      atualiza: '',
    };
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => {
        response.json().then((obj) => {
          const array = [];
          Object.keys(obj).forEach((element) => {
            array.push(obj[element]);
          });
          this.setState({ api: array });
        });
      });
  }

  mountExpense() {
    const { expenses } = this.props;
    const {
      valor,
      descricao,
      moeda,
      metodo,
      tag,
    } = this.state;
    const expense = {
      id: expenses.length,
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag,
      exchangeRates: {},
    };
    return expense;
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  updateTotalExpenses(expenses) {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      const { value, exchangeRates, currency } = expense;
      Object.keys(exchangeRates).forEach((element) => {
        const { ask, code, codein } = exchangeRates[element];
        if (code === currency && codein !== 'BRLT') {
          totalExpenses += (parseFloat(value) * parseFloat(ask));
        }
      });
    });
    return (parseFloat(totalExpenses.toFixed(2)));
  }

  deleteTableElement(e) {
    const { target } = e;
    const container = target.parentNode;
    const { parentNode } = container;
    const { id } = parentNode;
    const { expenses, remove } = this.props;
    expenses.splice(id, 1);
    this.setState({ atualiza: '' });
    remove(expenses);
  }

  render() {
    const { email, add, expenses } = this.props;
    const { api, valor, moeda } = this.state;
    return (
      <div className="wallet">
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { this.updateTotalExpenses(expenses) }
            </span>
          </p>
          <p>
            Currency :
            <span data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </header>
        <form className="wallet-form">
          <label htmlFor="valor">
            Valor:
            <input
              required
              data-testid="value-input"
              name="valor"
              value={ valor }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              required
              data-testid="description-input"
              name="descricao"
              onChange={ this.handleChange }
            />
          </label>
          <select
            required
            data-testid="currency-input"
            name="moeda"
            value={ moeda }
            onChange={ this.handleChange }
          >
            {api.map((element, index) => {
              const { code, codein } = element;
              if (codein !== 'BRLT') {
                return (
                  <option
                    key={ index }
                    data-testid={ code }
                    value={ code }
                  >
                    { code }
                  </option>
                );
              }
              return ('');
            })}
          </select>
          <select
            required
            data-testid="method-input"
            name="metodo"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
              Cartão de débito
            </option>
          </select>
          <select
            required
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ () => {
              const retorno = this.mountExpense();
              add(retorno);
            } }
          >
            Adicionar despesa
          </button>
        </form>
        <table className="table">
          <thead>
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
          </thead>
          <tbody>
            {expenses.map((expense, index) => {
              const {
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              let convertedValue = 0;
              let selectedCurrency = '';
              let usedAsk = 0;
              Object.keys(exchangeRates).forEach((element) => {
                const { ask, code, codein, name } = exchangeRates[element];
                if (code === currency && codein !== 'BRLT') {
                  selectedCurrency = name;
                  usedAsk = parseFloat(ask).toFixed(2);
                  convertedValue = (parseFloat(value) * parseFloat(ask));
                }
              });
              return (
                <tr
                  key={ index }
                  id={ index }
                >
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ selectedCurrency }</td>
                  <td>{ usedAsk }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td className="btn-table">
                    <button type="button" data-testid="edit-btn">E</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteTableElement }
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(getExpenseCurrency(value)),
  remove: (value) => dispatch(removeExpense(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })),
  email: PropTypes.string,
  add: PropTypes.func,
  remove: PropTypes.func,
};

Wallet.defaultProps = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })),
  email: PropTypes.string,
  add: PropTypes.func,
  remove: PropTypes.func,
};
