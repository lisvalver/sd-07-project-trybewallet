import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseTotal, deleteExpense, editeExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      editItem: {},
      valor: '',
      descricao: '',
      moeda: 'USD',
      pgto: 'Dinheiro',
      categoria: 'Alimentação',
      edit: false,
      api: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.Prepare = this.Prepare.bind(this);
    this.createTable = this.createTable.bind(this);
    this.arredonda = this.arredonda.bind(this);
    this.editClick = this.editClick.bind(this);
    this.newButton = this.newButton.bind(this);
    this.api = this.api.bind(this);
    this.moedas = this.moedas.bind(this);
  }

  componentDidMount() {
    this.api();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async api() {
    const expenseResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const expenseJSON = await expenseResponse.json();
    this.setState({
      api: expenseJSON,
    });
  }

  moedas() {
    const { api, moeda } = this.state;
    const arrayObject = Object.keys(api);
    const arrFilter = arrayObject.filter((element) => element !== 'USDT');
    return (
      <select
        id="moeda"
        value={ moeda }
        name="moeda"
        data-testid="currency-input"
        onChange={ (event) => this.handleChange(event) }
      >
        {arrFilter.map((value) => (
          <option value={ value } data-testid={ value } key={ value }>{value}</option>
        ))}
      </select>
    );
  }

  Prepare() {
    const { valor, descricao, moeda, pgto, categoria } = this.state;
    const { addExpense, expense } = this.props;
    const objeto = {
      value: valor,
      description: descricao,
      method: pgto,
      tag: categoria,
      currency: moeda,
      id: expense.length,
    };
    addExpense(objeto);
  }

  arredonda(strin) {
    const arraymaster = Math.round(strin * 100).toString();
    const [a, b, c] = arraymaster;
    const numberstr = `${a}.${b}${c}`;
    return (numberstr);
  }

  editClick({ target }) {
    const { expense } = this.props;
    const filter = expense.filter((item) => item.id === Number(target.name));
    const editItem = filter[0];
    console.log(filter);
    this.setState({
      editItem,
      valor: editItem.value,
      descricao: editItem.description,
      moeda: editItem.currency,
      pgto: editItem.method,
      categoria: editItem.tag,
      edit: true,
    });
  }

  newButton() {
    const { editExpense } = this.props;
    const { valor, descricao, moeda, pgto, categoria, editItem } = this.state;
    const objeto = {
      value: valor,
      description: descricao,
      method: pgto,
      tag: categoria,
      currency: moeda,
      id: editItem.id,
      exchangeRates: editItem.exchangeRates,
    };
    editExpense(objeto);
    this.setState({
      editItem: {},
      valor: '',
      descricao: '',
      moeda: 'USD',
      pgto: 'Dinheiro',
      categoria: 'Alimentação',
      edit: false,
    });
  }

  createTable(despesa) {
    const { delExpense } = this.props;
    const arrayObj = Object.entries(despesa.exchangeRates);
    const arrFilter = arrayObj.filter(
      (element) => element[0] === despesa.currency,
    );
    const objReturn = arrFilter[0][1];
    const mult = objReturn.ask;
    const refine = 100000;
    const total = Math.floor(despesa.value * (mult * refine)) / refine;
    return (
      <tr key={ despesa.id }>
        <td>{despesa.description}</td>
        <td>{despesa.tag}</td>
        <td>{despesa.method}</td>
        <td>{despesa.value}</td>
        <td>{objReturn.name}</td>
        <td>{this.arredonda(mult)}</td>
        <td>{total}</td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            name={ despesa.id }
            onClick={ ({ target }) => delExpense(target.name) }
          >
            Deletar
          </button>
          <button
            data-testid="edit-btn"
            type="button"
            name={ despesa.id }
            onClick={ (event) => this.editClick(event) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { valor, descricao, pgto, categoria, edit } = this.state;
    const { email, total = 0, isfetching = false, expense } = this.props;
    const editButton = (
      <button
        type="button"
        onClick={ (event) => this.newButton(event) }
      >
        Editar despesa
      </button>
    );
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <h2 data-testid="total-field">{total}</h2>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <form>
          <label htmlFor="despesa">
            Valor da despesa:
            <input
              data-testid="value-input"
              id="despesa"
              type="number"
              min={ 0 }
              value={ valor }
              name="valor"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              data-testid="description-input"
              id="descricao"
              type="text"
              value={ descricao }
              name="descricao"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            {this.moedas()}
          </label>
          <label htmlFor="pgto">
            Pagamento:
            <select
              value={ pgto }
              name="pgto"
              id="pgto"
              data-testid="method-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Tag:
            <select
              value={ categoria }
              name="categoria"
              id="categoria"
              data-testid="tag-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {
            edit
              ? editButton
              : <button type="button" onClick={ this.Prepare }>Adicionar despesa</button>
          }
        </form>
        <table>
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
            {isfetching ? (
              <tr>
                <td>Carregando...</td>
              </tr>
            ) : (
              expense.map((despesa) => this.createTable(despesa))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseTotal(expense)),
  delExpense: (id) => dispatch(deleteExpense(id)),
  editExpense: (expense) => dispatch(editeExpense(expense)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  isfetching: state.wallet.isfetching,
  expense: state.wallet.expenses,
});

Wallet.propTypes = {
  addExpense: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  isfetching: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  delExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
