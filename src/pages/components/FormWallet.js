import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/ducks/wallet/actions';

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        description: '',
        value: 0,
        currency: '',
        method: '',
        tag: '',
      },
    };
    this.renderCoins = this.renderCoins.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCoins } = this.props;
    // setTimeout(() => console.log("Currencies:", this.props.currencies), 3000)
    getCoins();
  }

  handleChanges({ target }) {
    const { name, value } = target;
    this.setState((prevState) => ({
      expenses: { ...prevState.expenses, [name]: value },
    }));
  }

  async handleClick() {
    const { expenses } = this.state;
    const { submitExpenses, getCoins } = this.props;
    await getCoins();
    submitExpenses(expenses);
  }

  renderCoins() {
    const { currencies } = this.props;
    return (
      currencies.map((coin) => (
        <option key={ coin } data-testid={ coin }>{coin}</option>
      ))
    );
  }

  render() {
    // const { isFetching } = this.props;
    const { expenses: { description, value, currency, method, tag } } = this.state;

    return (
      <form>

        <input
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ (event) => this.handleChanges(event) }
        />

        <input
          placeholder="Valor"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ (event) => this.handleChanges(event) }
        />

        <select
          placeholder="Moeda"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ (event) => this.handleChanges(event) }
        >
          <option value="Seleção">Selecione uma opção</option>
          {this.renderCoins()}
        </select>

        <select
          placeholder="Método de pagamento:"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => this.handleChanges(event) }
        >
          <option value="Seleção">Selecione uma opção</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          placeholder="Tag"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => this.handleChanges(event) }
        >
          <option value="Seleção">Selecione uma opção</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(actions.fetchCoins()),
  submitExpenses: (values) => dispatch(actions.submitExpenses(values)),
});

FormWallet.propTypes = {
  getCoins: PropTypes.func.isRequired,
  submitExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
