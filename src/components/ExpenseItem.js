import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function ExpenseItem({ expense, handleDelete, handleEdit }) {
  const { description, tag, method, value, currency, exchangeRates, id } = expense;
  const rate = parseFloat(exchangeRates[currency].ask);
  const converted = (parseFloat(value) * rate).toFixed(2);
  const currencyName = exchangeRates[currency].name;

  return (
    <div>
      <div>
        <table className="table-content">
          <tbody className="table-content">
            <tr><td>{description}</td></tr>
            <tr><td>{tag}</td></tr>
            <tr><td>{method}</td></tr>
            <tr><td>{value}</td></tr>
            <tr><td>{currencyName}</td></tr>
            <tr><td>{rate.toFixed(2)}</td></tr>
            <tr><td>{converted}</td></tr>
            <tr><td>Real</td></tr>
            <tr>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ (e) => handleEdit(e, expense) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  name={ id }
                  onClick={ handleDelete }
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

ExpenseItem.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    exchangeRates: PropTypes.shape({
      currency: PropTypes.shape({
        ask: PropTypes.string.isRequired,
      }).isRequired,
    }.isRequired),
  }).isRequired,
};
export default ExpenseItem;
