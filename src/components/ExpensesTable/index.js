import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExp } from '../../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense({ target: { id } }) {
    const { deleteAction } = this.props;
    deleteAction(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
        {expenses.map((item, index) => (
          <tr key={ index }>
            <td>{item.description}</td>
            <td>{item.tag}</td>
            <td>{item.method}</td>
            <td>{item.value}</td>
            <td>{item.exchangeRates[item.currency].name}</td>
            <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
            <td>{(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}</td>

            <td>Real</td>
            <td>
              <button data-testid="delete-btn" type="button">Editar</button>
              <button
                id={ item.id }
                data-testid="edit-btn"
                type="button"
                onClick={ this.deleteExpense }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (id) => (dispatch(deleteExp(id))),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  deleteAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
