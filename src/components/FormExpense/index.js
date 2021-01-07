import React from 'react';
import { connect } from 'react-redux';
import { addExpense, getCurrencies } from '../../actions';

class FormExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrenciesProp } = this.props;
    getCurrenciesProp();
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  render() {
    const { currencies, addExpenseProp } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form action="">
          <input
            type="text"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map(
              (curr) => curr[0] !== 'USDT' && (
                <option key={ curr[0] } data-testid={ curr[0] }>
                  {curr[0]}
                </option>
              ),
            )}
          </select>
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ () => addExpenseProp(this.state) }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesProp: () => dispatch(getCurrencies()),
  addExpenseProp: (data) => dispatch(addExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
