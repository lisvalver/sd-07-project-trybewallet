import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../actions';
import Form from '../components/Form';
import Edit from '../components/Edit';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.mountExpense = this.mountExpense.bind(this);
    this.updateTotalExpenses = this.updateTotalExpenses.bind(this);
    this.deleteTableElement = this.deleteTableElement.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getEditIndex = this.getEditIndex.bind(this);

    this.state = {
      api: [],
      editar: false,
      formIndex: 0,
      valor: 0,
      descricao: '',
      moeda: 'USD',
      metodo: '',
      tag: '',
      atualiza: '',
    };
  }

  getEditIndex(e) {
    const { parentNode } = e.target;
    const { parentNode: container } = parentNode;
    const { id } = container;
    this.setState({
      formIndex: id,
      editar: true,
    });
  }

  deleteTableElement(e) {
    const { target } = e;
    const container = target.parentNode;
    const { parentNode } = container;
    const { id } = parentNode;
    const { expenses, remove } = this.props;
    const returnArray = [];
    expenses.forEach((element, index) => {
      if (index !== parseInt(id, 10)) {
        returnArray.push(element);
      }
    });
    this.setState({ atualiza: '' });
    remove(returnArray);
  }

  updateTotalExpenses(expenses) {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      const { value, exchangeRates, currency } = expense;
      Object.keys(exchangeRates).forEach((element) => {
        const { ask, code, codein } = exchangeRates[element];
        if (code === currency && codein !== 'BRLT') {
          totalExpenses += (parseFloat(value) * parseFloat(ask));
        }
      });
    });
    return (parseFloat(totalExpenses.toFixed(2)));
  }

  mountExpense() {
    const {
      valor,
      descricao,
      moeda,
      metodo,
      tag,
    } = this.state;
    const expense = {
      id: '',
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag,
      exchangeRates: {},
    };
    return expense;
  }

  handleEdit() {
    this.setState({ editar: false });
  }

  render() {
    const { email, expenses } = this.props;
    const { editar, api, formIndex } = this.state;
    return (
      <div className="wallet">
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { this.updateTotalExpenses(expenses) }
            </span>
          </p>
          <p>
            Currency :
            <span data-testid="header-currency-field">
              BRL
            </span>
          </p>
        </header>
        {editar ? <Edit
          api={ api }
          editar={ editar }
          index={ formIndex }
          handleEdit={ this.handleEdit }
        />
          : <Form />}
        <table className="table">
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
            {expenses.map((expense, index) => {
              const {
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              let convertedValue = 0;
              let selectedCurrency = '';
              let usedAsk = 0;
              Object.keys(exchangeRates).forEach((element) => {
                const { ask, code, codein, name } = exchangeRates[element];
                if (code === currency && codein !== 'BRLT') {
                  selectedCurrency = name;
                  usedAsk = parseFloat(ask).toFixed(2);
                  convertedValue = (parseFloat(value) * parseFloat(ask));
                }
              });
              return (
                <tr
                  key={ index }
                  id={ index }
                >
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ selectedCurrency }</td>
                  <td>{ usedAsk }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td className="btn-table">
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.getEditIndex }
                    >
                      E
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.deleteTableElement }
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (value) => dispatch(removeExpense(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })),
  email: PropTypes.string,
  remove: PropTypes.func,
};

Wallet.defaultProps = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })),
  email: PropTypes.string,
  remove: PropTypes.func,
};
