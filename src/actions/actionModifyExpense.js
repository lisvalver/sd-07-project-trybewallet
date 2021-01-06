export const deleteExpense = (id) => ({
  type: 'DELETE_EXP',
  expense: { id },
});

export const editExpense = (expense) => ({
  type: 'EDIT_EXP',
  expense,
});

export const editChangeState = () => ({
  type: 'EDIT_STATE',
});

export const idBeingEdited = (id) => ({
  type: 'CHANGE_ID',
  expense: id,
});
