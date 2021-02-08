import React from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {},
      moeda: 'USD',
      pagamento: 'Dinheiro',
      valor: '',
      descricao: '',
      categoria: 'Alimentação',
      edit: false,
    };
    this.moedas = this.moedas.bind(this);
    this.api = this.api.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createTable = this.createTable.bind(this);
    this.mountExpense = this.mountExpense.bind(this);
  }

  componentDidMount() {
    this.api();
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

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  mountExpense() {
    const { pagamento, valor, descricao, categoria, moeda } = this.state;
    const { addExpense, expense } = this.props;
    const objExpense = {
      value: valor,
      description: descricao,
      method: pagamento,
      tag: categoria,
      currency: moeda,
      id: expense.length,
    };
    addExpense(objExpense);
  }

  createTable(gastos) {
    // const { delExpense } = this.props;
    const arrayObj = Object.entries(gastos.exchangeRates);
    console.log(arrayObj);
    /* const arrFilter = arrayObj.filter(
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
      </tr> */
    //);
  }

  render() {
    const { email, total = 0, expense } = this.props;
    const { pagamento, valor, descricao, categoria, edit } = this.state;
    console.log(expense);
    return (
      <div>
        <header>
          <h3 data-testid="email-field">
            {email}
          </h3>
          <h4 data-testid="total-field">
            {total}
          </h4>
          <h3 data-testid="header-currency-field">
            BRL
          </h3>
        </header>
        <form>
          <p>
            <label htmlFor="valorDaDespesa">
              Valor da Despesa
              <input
                value={ valor }
                name="valor"
                id="valorDaDespesa"
                data-testid="value-input"
                type="number"
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
          </p>
          <p>
            <label htmlFor="descricaoDaDespesa">
              Descrição da Despesa
              <input
                value={ descricao }
                name="descricao"
                id="descricaoDaDespesa"
                data-testid="description-input"
                type="text"
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
          </p>
          <p>
            <label htmlFor="tipoDeMoeda">
              Moeda
              {this.moedas()}
            </label>
          </p>
          <p>
            <label htmlFor="metodoPagamento">
              Método de Pagamento
              <select
                value={ pagamento }
                name="pagamento"
                id="metodoPagamento"
                data-testid="method-input"
                onChange={ (event) => this.handleChange(event) }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de débito">Cartão de débito</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
              </select>
            </label>
          </p>
          <p>
            <label htmlFor="categoria">
              Categoria
              <select
                value={ categoria }
                name="categoria"
                id="categoria"
                data-testid="tag-input"
                onChange={ (event) => this.handleChange(event) }
              >
                <option value="alimentacao">Alimentação</option>
                <option value="lazer">Lazer</option>
                <option value="trabalho">Trabalho</option>
                <option value="transporte">Transporte</option>
                <option value="saude">Saúde</option>
              </select>
            </label>
          </p>
          {
            edit
              ? <button type="button">Editar Despesa</button>
              : <button type="button" onClick={ this.mountExpense }>Adicionar Despesa</button>
          }
        </form>
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
        {/* <tbody>
          { expense.map((gastos) => this.createTable(gastos)) }
        </tbody> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  // total: state.wallet.total,
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (totalExpense) => dispatch(addExpense(totalExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
