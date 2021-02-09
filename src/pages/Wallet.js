import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseTotal, editExpense, delExpense } from '../actions';

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
      editor: {},
    };
    this.moedas = this.moedas.bind(this);
    this.api = this.api.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createTable = this.createTable.bind(this);
    this.mountExpense = this.mountExpense.bind(this);
    this.editBotao = this.editBotao.bind(this);
    this.editClick = this.editClick.bind(this);
    this.arredonda = this.arredonda.bind(this);
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
    this.setState({
      valor: 0,
      descricao: '',
    });
  }

  arredonda(strin) {
    const arraymaster = Math.round(strin * 100).toString();
    const [a, b, c] = arraymaster;
    const numberstr = `${a}.${b}${c}`;
    return (numberstr);
  }

  createTable(despesa) {
    const { delExpense: deletar } = this.props;
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
            onClick={ ({ target }) => deletar(target.name) }
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

  editClick({ target }) {
    const { expense } = this.props;
    const filtro = expense.filter((elemento) => elemento.id === Number(target.name));
    const editor = filtro[0];
    this.setState({
      editor,
      valor: editor.value,
      descricao: editor.description,
      pagamento: editor.method,
      categoria: editor.tag,
      moeda: editor.currency,
      edit: true,
    });
  }

  editBotao() {
    const { pagamento, valor, descricao, categoria, moeda, editor } = this.state;
    const { editExpense: editar } = this.props;
    const newObj = {
      value: valor,
      description: descricao,
      method: pagamento,
      tag: categoria,
      currency: moeda,
      id: editor.id,
      exchangeRates: editor.exchangeRates,
    };

    editar(newObj);
    this.setState({
      valor: '',
      descricao: '',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
      moeda: 'USD',
      edit: false,
      editor: {},
    });
  }

  render() {
    const { email, total = 0, expense } = this.props;
    const { pagamento, valor, descricao, categoria, edit } = this.state;
    const editButton = (
      <button
        type="button"
        onClick={ (event) => this.editBotao(event) }
      >
        Editar despesa
      </button>
    );
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
          <span htmlFor="valorDaDespesa">
            Valor da Despesa:
          </span>
          <input
            value={ valor }
            name="valor"
            id="valorDaDespesa"
            data-testid="value-input"
            type="number"
            onChange={ (event) => this.handleChange(event) }
          />
          <span htmlFor="descricaoDaDespesa">
            Descrição da despesa:
          </span>
          <input
            value={ descricao }
            name="descricao"
            id="descricaoDaDespesa"
            data-testid="description-input"
            type="text"
            onChange={ (event) => this.handleChange(event) }
          />
          <span htmlFor="tipoDeMoeda">
            Moeda:
            {this.moedas()}
          </span>
          <span htmlFor="metodoPagamento">
            Método de Pagamento:
          </span>
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
          <span htmlFor="categoria">
            Tag:
          </span>
          <select
            value={ categoria }
            name="categoria"
            id="categoria"
            data-testid="tag-input"
            onChange={ (event) => this.handleChange(event) }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
          {
            edit
              ? editButton
              : (
                <button
                  type="button"
                  onClick={ this.mountExpense }
                >
                  Adicionar despesa
                </button>)
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
            { expense.map((despesa) => this.createTable(despesa)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (totalExpense) => dispatch(expenseTotal(totalExpense)),
  editExpense: (expense) => dispatch(editExpense(expense)),
  delExpense: (id) => dispatch(delExpense(id)),
});

Wallet.propTypes = {
  addExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  delExpense: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  expense: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
