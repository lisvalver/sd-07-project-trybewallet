import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpenses } from '../actions';

class ForEachExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.delLine = this.delLine.bind(this);
    this.editLine = this.editLine.bind(this);
  }

  delLine(id) {
    const { expenses, deletar } = this.props;
    deletar(expenses[id]);
  }

  editLine(id) {
    const { editar } = this.props;
    editar(id);
  }

  render() {
    const { expense } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            id={ id }
            data-testid="delete-btn"
            onClick={ () => this.delLine(id) }
          >
            Deletar
          </button>
          <button
            type="button"
            id={ id }
            data-testid="edit-btn"
            onClick={ () => this.editLine(id) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }
}

ForEachExpenses.propTypes = ({
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }),
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  deletar: (objOfExpenseToDelet) => dispatch(deleteExpense(objOfExpenseToDelet)),
  editar: (id) => dispatch(editExpenses(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForEachExpenses);
