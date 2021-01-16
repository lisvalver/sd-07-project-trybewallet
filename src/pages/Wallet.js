import React from 'react';
import { Link } from 'react-router-dom';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        Trybe Wallet
        <Link to="/">
          <button type="button"> Voltar </button>
        </Link>
        <label htmlFor="teste">
          teste
          <input
            id="teste"
            data-testid="teste-input"
            type="text"
            name="teste"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

export default Wallet;
