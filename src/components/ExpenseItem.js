import React from 'react';
import './styles.css';


function ExpenseItem({ expense, handleDelete }) {
  const { description, tag, method, value, currency, exchangeRates, id } = expense
  const rate = parseFloat(exchangeRates[currency]['ask']);
  const converted = (parseFloat(value) * rate).toFixed(2);
  const currencyName = exchangeRates[currency]['name'];


  return(
      	<div>
          <div>
            <table className='table-content'>
              <tbody className='table-content'>
                <tr><td>{description}</td></tr>
                <tr><td>{tag}</td></tr>
                <tr><td>{method}</td></tr>
                <tr><td>{value}</td></tr>
                <tr><td>{currencyName}</td></tr>
                <tr><td>{rate.toFixed(2)}</td></tr>
                <tr><td>{converted}</td></tr>
                <tr><td>Real</td></tr>
                <tr><td><button data-testid="delete-btn" name={id} onClick={handleDelete}>Delete</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default ExpenseItem;