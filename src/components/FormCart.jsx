import React, { Component } from 'react';

class FormCart extends Component {
  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((jsonResponse) => console.log(jsonResponse));
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Despensa:
            <input
              id="value"
              type="text"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Valor
            <input
              id="description"
              type="text"
              data-testid="description-input"
            />
          </label>
          <span>Moeda:</span>
          <select
            data-testid="currency-input"
          >
            <option>
              USD
            </option>
          </select>

        </form>
      </div>
    );
  }
}

export default FormCart;
