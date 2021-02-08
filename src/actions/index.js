const addEmail = (emailValue) => ({
  type: 'ADD_EMAIL',
  value: emailValue,
});

const addExpense = (expenseValue) => ({
  type: 'ADD_EXPENSE',
  value: expenseValue,

});

export { addEmail, addExpense };
