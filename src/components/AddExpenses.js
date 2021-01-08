import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Currencies from './Currencies';
import PaymentMethod from './PaymentMethod';
import TagSelect from './TagSelect';
import { fetchExpenses } from '../actions/index';

class AddExpenses extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentação',
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  submitHandle(e) {
    e.preventDefault();
    const { nextId, addExpenses } = this.props;
    const newExpenses = { ...this.state, id: nextId };
    addExpenses(newExpenses);
    e.target.reset();
  }

  render() {
    const { value } = this.state;
    return (
      <form className="add-expense" onSubmit={ this.submitHandle }>
        <label htmlFor="value">
          Valor:
          <input
            onChange={ this.handleChange }
            data-testid="value-input"
            type="text"
            id="value"
            name="value"
            value={ value }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            onChange={ this.handleChange }
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
          />
        </label>

        <Currencies handleChange={ this.handleChange } />

        <PaymentMethod handleChange={ this.handleChange } />

        <TagSelect handleChange={ this.handleChange } />

        <input type="submit" value="Adicionar despesa" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  nextId: state.wallet.nextId,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (state) => dispatch(fetchExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);

AddExpenses.propTypes = {
  nextId: PropTypes.number.isRequired,
  addExpenses: PropTypes.func.isRequired,
};
