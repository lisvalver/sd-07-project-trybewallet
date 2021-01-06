const walletTypes = {
  REQUEST: 'wallet/REQUEST',
  RECEIVE: 'wallet/RECEIVE',
  FAILED_REQUEST: 'wallet/FAILED_REQUEST',
  ADD: 'wallet/ADD',
  EDIT: 'wallet/EDIT',
  DELETE: 'wallet/DELETE',
  SET_CURRENT_EXPENSE: 'wallet/SET_CURRENT_EXPENSE',
  EDIT_MODE: 'wallet/EDIT_MODE',
  CAN_VALIDATE: 'wallet/CAN_VALIDATE',
};

export const RESETED_EXPENSE = {
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  id: -1,
};

export const RESETED_VALIDATE_EXPENSE = {
  value: { msg: 'O valor da despesa deve ser maior que zero.', status: false },
  description: { msg: 'Informe a descrição da despesa.', status: false },
  currency: { msg: 'Informe a moeda da despesa.', status: false },
  method: { msg: 'Informe método de pagamento da despesa.', status: false },
  tag: { msg: 'Informe a categoria da despesa.', status: false },
};

export const RESETED_VALIDATE_EXPENSE_ALL_VALID = {
  value: { msg: 'O valor da despesa deve ser maior que zero.', status: true },
  description: { msg: 'Informe a descrição da despesa.', status: true },
  currency: { msg: 'Informe a moeda da despesa.', status: true },
  method: { msg: 'Informe método de pagamento da despesa.', status: true },
  tag: { msg: 'Informe a categoria da despesa.', status: true },
};

export default walletTypes;
