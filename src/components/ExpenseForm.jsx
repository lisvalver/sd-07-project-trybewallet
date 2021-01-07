import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'BRL',
      paymentMethod: 'Dinheiro',
      categoty: 'Alimentação',
    };
  }

  render() {
    return (
      <div>
        Formulário de Despesas
      </div>
    );
  }
}

export default ExpenseForm;
