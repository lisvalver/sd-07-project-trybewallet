// Coloque aqui suas actions

const ADD_EXPENSE = 'ADD_EXPENSE';

function addExpense(object) {
  return {
    type: ADD_EXPENSE,
    payload: { ...object },
  };
}

export default addExpense;
