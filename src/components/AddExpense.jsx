import React from 'react';
import PropTypes from 'prop-types';
import { Value, Description, Currency, Method, Tag } from './AddExpensesComponents';

export default function AddExpense({ currencies, saveExpense, changeState }) {
  return (
    <nav>
      <Value changeState={ changeState } />
      <Description changeState={ changeState } />
      <Currency changeState={ changeState } currencies={ currencies } />
      <Method changeState={ changeState } />
      <Tag changeState={ changeState } />
      <button
        type="button"
        onClick={ saveExpense }
      >
        Adicionar despesa
      </button>
    </nav>
  );
}

AddExpense.propTypes = {
  changeState: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  saveExpense: PropTypes.func.isRequired,
};
