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
    };
  }

  componentDidMount() {
    console.log('montei');
    const { getWallet } = this.props;
    getWallet();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { currencies, getWallet, getExpenses} = this.props;
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
                { totalExpenses }
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
            id="metodoDePagamento"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          {/* </label> */}
          <label htmlFor="categoriesId" name="categories">
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
          </label>
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
  getWallet: PropTypes.element.isRequired,
  currencies: PropTypes.element.isRequired,
  email: PropTypes.element.isRequired,
  expenses: PropTypes.element.isRequired,
  getExpenses: PropTypes.element.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
