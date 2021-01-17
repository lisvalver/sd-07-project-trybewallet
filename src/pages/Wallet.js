import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoedaAPI, addExpensesToStore } from '../actions';
import CoinOption from '../componentes/CoinOption';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
      atualExpenses: 0,
      total: 0,
      id: -1,
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
  }

  componentDidMount() {
    const { getAPI } = this.props;
    getAPI();
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  addExpenses() {
    const { addingExpenses, curr } = this.props;
    const { total, atualExpenses, id } = this.state;
    const moeda = curr;
    let newTotal = parseInt(total, 10) + parseInt(atualExpenses, 10);
    let newId = parseInt(id, 10);
    // newId === 0 ? this.setState({ id: newId }) : this.setState({ id: newId }, newId += 1);
    this.setState({currency: moeda}, () => { addingExpenses(this.state) });
    this.setState({ total: newTotal });
    this.setState({ id: newId + 1 });
  }

  render() {
    const { email } = this.props;
    const { description, atualExpenses, total, currency, method, tag } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h4 data-testid="total-field">{ total }</h4>
          <h4 data-testid="header-currency-field">{ currency }</h4>
        </header>
        <form>
          <label htmlFor="atualExpenses">
            Adicione valor da despesa
            <input
              name="atualExpenses"
              type="number"
              data-testid="value-input"
              value={ atualExpenses }
              onChange={ this.handleEvent }
            />
          </label>
          <label htmlFor="discription">
            Descrição da despesa
            <input
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleEvent }
            />
          </label>
          <CoinOption name="currency" />
          <label htmlFor="method">
            Selecione Método de Pagamento:

          </label>
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleEvent }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débitoo</option>
            </select>
          <label htmlFor="tag">
            Tag:

          </label>
            <select
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleEvent }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          <button type="button" onClick={ this.addExpenses } >Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getAPI: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getAPI: () => dispatch(fetchMoedaAPI()),
  addingExpenses: (payload) => dispatch(addExpensesToStore(payload)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  curr: state.wallet.curr,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
