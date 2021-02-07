import React from 'react';

class EditFrom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleEvent = this.handleEvent.bind(this);

  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            <span>Valor:</span>
            <input
              onChange={ this.handleEvent }
              name="value"
              id="value-input"
              data-testid="value-input"
              type="number"
              value={ value }
            />
          </label>

          <label htmlFor="description-input">
            <span>Descrição:</span>
            <input
              name="description"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleEvent }
              value={ description }
            />
          </label>

          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleEvent }
            value={ currency }
          >
            {currenciesAlias.map((currencyEx) => (
              <option key={ currencyEx } data-testid={ currencyEx }>{currencyEx}</option>
            ))}
          </select>

          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleEvent }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleEvent }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          <button
            type="button"
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

export default EditFrom;
