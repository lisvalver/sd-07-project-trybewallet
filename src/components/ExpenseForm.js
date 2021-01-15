import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { EXPENSE, FETCHCODE } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  handleClick(event) {
    const { addExpense, updateCurrencies } = this.props;
    const { id } = this.state;
    event.preventDefault();
    updateCurrencies();
    addExpense(this.state);
    this.setState({ id: Number(id) + 1 });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          className="input"
          type="text"
          placeholder="Valor"
          id="value"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrSelect() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          className="input"
          placeholder="Moeda"
          id="currency"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {(Object.keys(currencies).sort()).map((curr) => (
            curr !== 'USDT' ? (
              <option key={ curr } value={ curr } data-testid={ curr }>
                {curr}
              </option>
            ) : (
              'erro'
            )
          ))}
        </select>
      </label>
    );
  }

  renderMethodSelect() {
    const meethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método:
        <select
          className="input"
          id="method"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {meethod.map((item) => (
            <option key={ item } value={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const taag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          className="input"
          id="tag"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {taag.map((item) => (
            <option key={ item } value={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderDescrInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          className="input"
          type="text"
          placeholder="Sua descrição"
          id="description"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <section className="form">
        <div>
          {loading ? (
            'LOADING'
          ) : (
            <form>
              {this.renderValueInput()}
              {this.renderCurrSelect()}
              {this.renderMethodSelect()}
              {this.renderTagSelect()}
              {this.renderDescrInput()}
              <button className="button" type="button" onClick={ this.handleClick }>
                Adicionar despesa
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  loading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expenses) => dispatch(EXPENSE(expenses)),
  updateCurrencies: () => dispatch(FETCHCODE()),
});

ExpenseForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.number).isRequired,
  loading: PropTypes.bool.isRequired,
  updateCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
