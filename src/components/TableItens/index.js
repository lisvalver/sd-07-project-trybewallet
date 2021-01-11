import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../../actions';

class TableItens extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return (
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
          {expenses.map((exp) => (
            <tr key={ exp.id }>
              <td>{exp.description}</td>
              <td>{exp.tag}</td>
              <td>{exp.method}</td>
              <td>{exp.value}</td>
              <td>{exp.exchangeRates[exp.currency].name}</td>
              <td>
                {Number(exp.exchangeRates[exp.currency].ask).toFixed(2)}
              </td>
              <td>
                {Number(
                  exp.value * exp.exchangeRates[exp.currency].ask,
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.removeItem(exp.id) }
                  data-testid="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteItem(id)),
});

TableItens.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableItens);
