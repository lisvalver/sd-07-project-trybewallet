import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenses, deleted, editing } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.api = this.api.bind(this);
    this.moedas = this.moedas.bind(this);
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
    this.clickedit = this.clickedit.bind(this);
    this.cled = this.cled.bind(this);
    this.tabelaJovemDinamica = this.tabelaJovemDinamica.bind(this);
    this.state = {
      edit: false,
      editobj: {},
      api: {},
      currency: 'USD',
      description: '',
      value: 0,
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.api();
  }

  async api() {
    const requisition = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requisitionJson = await requisition.json();
    await this.setState({ api: requisitionJson });
  }

  async change(name, { target }) {
    await this.setState({ [name]: target.value });
  }

  moedas() {
    const { api, currency } = this.state;
    const arrayobj = Object.keys(api);
    const array = arrayobj.filter((value) => value !== 'USDT');
    return (
      <select
        data-testid="currency-input"
        id="coins"
        value={ currency }
        onChange={ (event) => this.change('currency', event) }
      >
        {array.map((value) => (
          <option value={ value } data-testid={ value } key={ value }>
            {value}
          </option>
        ))}
      </select>
    );
  }

  click() {
    const { requisition, tarefas } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const object = { id: tarefas.length, value, description, currency, method, tag };
    requisition(object);
  }

  clickdelet({ target }) {
    const { deletbutton } = this.props;
    deletbutton(target.name);
  }

  clickedit({ target }) {
    const { tarefas } = this.props;
    const filter = tarefas.filter((obj) => obj.id === Number(target.name));
    const editobj = filter[0];
    this.setState({
      edit: true,
      editobj,
      currency: editobj.currency,
      description: editobj.description,
      value: editobj.value,
      method: editobj.method,
      tag: editobj.tag,
    });
  }

  cled(obj) {
    const { editei } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const object = { id: obj.id, value, description, currency, method, tag };
    editei(object);
    this.setState({
      edit: false,
      editobj: {},
      currency: 'USD',
      description: '',
      value: 0,
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  tabelaJovemDinamica(elemento) {
    const arrayobj = Object.entries(elemento.exchangeRates);
    const arrayfilter = arrayobj.filter((ele) => ele[0] === elemento.currency);
    const objobj = arrayfilter[0][1];
    const mult = objobj.ask;
    const floorvalue = 100000;
    const valormult = Math.floor(elemento.value * (mult * floorvalue)) / floorvalue;
    return (
      <tr key={ elemento.id }>
        <td>{elemento.description}</td>
        <td>{elemento.tag}</td>
        <td>{elemento.method}</td>
        <td>{elemento.value}</td>
        <td>{objobj.name}</td>
        <td>{Math.round(mult * 100) / 100}</td>
        <td>{valormult}</td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            name={ elemento.id }
            onClick={ (event) => this.clickdelet(event) }
          >
            delet
          </button>
          <button
            data-testid="edit-btn"
            type="button"
            name={ elemento.id }
            onClick={ (event) => this.clickedit(event) }
          >
            edit
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { emailS, tarefas, valorgeral = 0, isFetching = false, erro = '' } = this.props;
    const { edit, editobj, value, description, method, tag } = this.state;
    const butedit = (
      <button type="button" onClick={ () => this.cled(editobj) }>
        Editar despesa
      </button>
    );
    return (
      <div>
        <header>
          <p data-testid="email-field">{emailS}</p>
          <p data-testid="total-field">{valorgeral}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          <form>
            <label htmlFor="value-input">
              <p>valor:</p>
              <input
                id="value-input"
                data-testid="value-input"
                min={ 0 }
                type="number"
                value={ value }
                onChange={ (event) => this.change('value', event) }
              />
            </label>
            <label htmlFor="description-input">
              <p>descrição:</p>
              <input
                id="description-input"
                data-testid="description-input"
                type="text"
                value={ description }
                onChange={ (event) => this.change('description', event) }
              />
            </label>
            <label htmlFor="coins">
              {this.moedas()}
            </label>
            <label htmlFor="method-input">
              <select
                id="method-input"
                data-testid="method-input"
                value={ method }
                onChange={ (event) => this.change('method', event) }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag-input">
              <select
                id="tag-input"
                data-testid="tag-input"
                value={ tag }
                onChange={ (event) => this.change('tag', event) }
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
                ? butedit
                : <button type="button" onClick={ this.click }>Adicionar despesa</button>
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
              {
                isFetching
                  ? <tr><td>carregando</td></tr>
                  : tarefas.map((tarefa) => this.tabelaJovemDinamica(tarefa))
              }
            </tbody>
          </table>
        </div>
        <div>
          <p>{erro}</p>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  requisition: PropTypes.func.isRequired,
  emailS: PropTypes.string.isRequired,
  tarefas: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  erro: PropTypes.string.isRequired,
  valorgeral: PropTypes.number.isRequired,
  deletbutton: PropTypes.func.isRequired,
  editei: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tarefas: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
  erro: state.wallet.erro,
  valorgeral: state.wallet.valorgeral,
  emailS: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  requisition: (info) => dispatch(expenses(info)),
  deletbutton: (numero) => dispatch(deleted(numero)),
  editei: (obj) => dispatch(editing(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
