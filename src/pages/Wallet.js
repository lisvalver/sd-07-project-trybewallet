import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.api = this.api.bind(this);
    this.moedas = this.moedas.bind(this);
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
    this.state = {
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

  render() {
    const { emailS, tarefas, valorgeral = 0, isFetching = false, erro = '' } = this.props;
    const { value, description, method, tag } = this.state;
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
            <button type="button" onClick={ this.click }>Adicionar despesa</button>
          </form>
          <div>
            rotulo
          </div>
        </div>
        <div>
          <p>{erro}</p>
          {
            isFetching
              ? <p>carregando</p>
              : <p>{tarefas.map((tarefa) => <p key={ tarefa.id }>{tarefa.id}</p>)}</p>
          }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
