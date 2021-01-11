import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
  }

  renderValueInput() {
    return (
      <label htmlFor="value">
        Valor:
        <input
          className="input"
          type="text"
          placeholder="Valor"
          id="value"
          data-testid="value-input"
        />
      </label>
    );
  }

  renderCurrSelect() {
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          className="input"
          placeholder="Moeda"
          id="currency"
          data-testid="currency-input"
        >
          {/* Aqui usarei um Map do fetch */}
          <option value="USD" data-testid="USD">
            USD
          </option>
        </select>
      </label>
    );
  }

  renderMethodSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método:
        <select className="input" id="method" data-testid="method-input">
          {method
            .map((item) => <option key={ item } value={ item }>{ item }</option>)}
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select className="input" id="tag" data-testid="tag-input">
          {tag.map((item) => <option key={ item } value={ item }>{ item }</option>)}
        </select>
      </label>
    );
  }

  renderDescrInput() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          className="input"
          type="text"
          placeholder="Sua descrição"
          id="description"
          data-testid="description-input"
        />
      </label>
    );
  }

  render() {
    return (
      <section className="form">
        <div>
          <form>
            {this.renderValueInput()}
            {this.renderCurrSelect()}
            {this.renderMethodSelect()}
            {this.renderTagSelect()}
            {this.renderDescrInput()}
            <button className="button" type="button">
              Adicionar despesa
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default ExpenseForm;
