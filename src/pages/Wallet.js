import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet, requestExpenses } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      currencyValue: 0,
    };
  }

  componentDidMount() {
    const { getWallet } = this.props;
    getWallet();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { currencies, getWallet, getExpenses } = this.props;
    await getWallet();
    this.setState((previous) => (
      {
        exchangeRates: { ...previous.exchangeRates, ...currencies },
        id: previous.id + 1,
      }
    ));
    getExpenses(this.state);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      return acc + exchangeRates[currency].ask * value;
    }, 0);
    console.log(currencies);
    const totalValue = Number.parseFloat(totalExpenses).toFixed(2);
    return (
      // isFetching ? <p>Loading...</p>
      // : (
      <div>
        <header className="header-user">
          <h1>TrybeWallet</h1>
          <div className="info-fields">
            <div className="emailContainer" data-testid="email-field">
              <p>{ email }</p>
            </div>
            <div className="despesaContainer" data-testid="total-field">
              <p className="despesaTot">
                Despesa Total: R$
              </p>
              <p className="varExpenses">
                { totalValue }
              </p>
              <p className="currency" data-testid="header-currency-field">BRL</p>
            </div>
          </div>
        </header>
        <div className="info-budget">
          <label htmlFor="budget">
            Valor:
            <input
              className="value"
              type="number"
              id="budget"
              name="value"
              data-testid="value-input"
              onChange={ (e) => this.handleChange(e) }
            />
          </label>

          <label htmlFor="currency" name="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              onChange={ (e) => this.handleChange(e) }
            >
              {Object.keys(currencies).map((item) => (item !== 'USDT' ? (
                <option key={ item } value={ item } data-testid={ item }>{ item }</option>
              ) : (
                false
              )))}
            </select>
          </label>
          {/* <label htmlFor="metodo-de-pagamento" name="method"> */}
          Método de Pagamento:
          <select
            className="metPag"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          {/* </label> */}
          Tag:
          <select
            className="metPag"
            data-testid="tag-input"
            id="categoriesId"
            name="tag"
            onChange={ (e) => this.handleChange(e) }
          >
            {/* <option defaultValue value="Escolha">Faça sua escolha</option> */}
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <label htmlFor="budget">
            Descrição:
            <input
              className="description"
              type="text"
              id="budget"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <div className="btnAdd">
            <button type="button" onClick={ () => this.handleClick() }>
              Adicionar despesa
            </button>
          </div>
        </div>
        <section className="ItemsTable">
          <table>
            <thead>
              <tr>
                <th className="description">Descrição</th>
                <th className="description">Tag</th>
                <th className="description">Método de pagamento</th>
                <th className="description">Valor</th>
                <th className="description">Moeda</th>
                <th className="description">Câmbio utilizado</th>
                <th className="description">Valor convertido</th>
                <th className="description">Moeda de conversão</th>
                <th className="description">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody className="request">
              { Object.values(expenses).map((item, index) => (
                <tr key={ index }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{item.value}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>{item.currency}</td>
                  <td>{totalValue}</td>
                  <td>Real</td>
                  <div className="button-td">
                    <button
                      className="btnEditar"
                      type="button"
                      data-testid="delete-btn"
                    >
                      Editar
                    </button>
                    <button
                      className="btnExcluir"
                      type="button"
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    // )
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    getWallet: () => dispatch(fetchWallet()),
    getExpenses: (arrayExpenses) => dispatch(requestExpenses(arrayExpenses)),
  });

const mapStateToProps = ({ user: { email },
  wallet: { currencies, isFetching, expenses } }) => ({
  email,
  currencies,
  isFetching,
  expenses,
});

Wallet.propTypes = {
  getWallet: PropTypes.func.isRequired,
  currencies: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.element.isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
