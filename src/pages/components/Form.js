import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    }; 
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
    [name]: value,
    });
    }

  render() {
    const { addExpense } = this.props;
    return (
      <div>
        <form>
          <input
            name="value"
            type="text"
            data-testid="value-input"
            placeholder="Valor"
            onChange={this.handleInput}
          />
          <input
            name="description"
            type="text"
            data-testid="description-input"
            placeholder="Descrição"
            onChange={this.handleInput}
          />
          <select
            name="currency"
            data-testid="currency-input"
            onChange={this.handleInput}
          >
            <option data-testid="USD">USD</option>
            <option data-testid="BRL">BRL</option>
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={this.handleInput}
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={this.handleInput}
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={() => addExpense(this.state)}
          >Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addExpense: actions.addExpense,
};

export default connect(null, mapDispatchToProps)(Form);
