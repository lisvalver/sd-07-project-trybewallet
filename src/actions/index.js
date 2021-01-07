export const addEmail = (email) => ({ type: 'ADD_EMAIL', email });
export const addExpenses = (expenses) => ({ type: 'ADD_EXPENSES', expenses });
export const failedRequest = (error) => ({ type: 'FAILED_REQUEST', error });
export const request = () => ({ type: 'REQUEST' });
