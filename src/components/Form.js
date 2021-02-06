import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoeda, addExpenses, addEditExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.hadleEdit = this.hadleEdit.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleAdd() {
    const { fetchAPI } = this.props;
    const { id } = this.state;
    fetchAPI();
    const { addExpense, currencies } = this.props;
    const exchangeRates = {
      ...currencies,
    };
    addExpense({ exchangeRates, ...this.state });
    this.setState({ id: id + 1 });
    this.setState({
      value: '0',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    });
  }

  hadleEdit() {
    const { idEdit, edittingExpense, currencies } = this.props;
    const exchangeRates = {
      ...currencies,
    };
    edittingExpense({ exchangeRates, ...this.state, id: idEdit }, idEdit);
    this.setState({
      value: '0',
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, editON, expenses, idEdit } = this.props;
    const currExpense = expenses.filter((item) => item.id === idEdit)[0];
    return (
      <div>
        {
          currencies.length === 0 ? (
            <span>Loading...</span>
          ) : (
            <form>
              <label htmlFor="value">
                Valor da despesa:
                <input
                  value={ editON ? currExpense.value : value }
                  required
                  id="value"
                  type="number"
                  name="value"
                  data-testid="value-input"
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="description">
                Descrição da despesa:
                <input
                  id="description"
                  required
                  value={ editON ? currExpense.description : description }
                  type="text"
                  name="description"
                  data-testid="description-input"
                  onChange={ this.handleChange }
                />
              </label>

              <label htmlFor="currency">
                Moeda:
                <select
                  name="currency"
                  value={ editON ? currExpense.currency : currency }
                  id="currency"
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                >
                  {Object.keys(currencies).map((coin) => (
                    (coin !== 'USDT')
                      && (
                        <option key={ coin } data-testid={ coin }>
                          {coin}
                        </option>
                      )
                  ))}
                </select>
              </label>

              <label htmlFor="method">
                Método de pagamento:
                <select
                  id="method"
                  name="method"
                  required
                  value={ editON ? currExpense.method : method }
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option selected disabled value="">Selecione</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>

              <label htmlFor="tag">
                Tag:
                <select
                  id="tag"
                  required
                  value={ editON ? currExpense.tag : tag }
                  name="tag"
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option selected disabled value="">Selecione</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>

              <button
                onClick={ editON ? this.hadleEdit : this.handleAdd }
                type="submit"
              >
                {editON ? 'Editar despesa' : 'Adicionar despesa'}
              </button>

            </form>
          )
        }
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchMoeda()),
  addExpense: (expenses) => dispatch(addExpenses(expenses)),
  edittingExpense: (payload, id) => dispatch(addEditExpenses(payload, id)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  editON: state.wallet.editON,
  idEdit: state.wallet.idEdit,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  edittingExpense: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  editON: PropTypes.bool.isRequired,
  idEdit: PropTypes.number.isRequired,
  fetchAPI: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
