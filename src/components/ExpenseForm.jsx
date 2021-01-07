import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      description: '',
      // currency: 'BRL',
      // paymentMethod: 'Dinheiro',
      // categoty: 'Alimentação',
    };
  }

  handleChange({ target: { id, value } }) {
    console.log(`ID: ${id}, Value: ${value}`);
    this.setState({ [id]: value });
  }

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              id="value"
              type="text"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              id="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
