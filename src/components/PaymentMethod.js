import React from 'react';
import PropTypes from 'prop-types';

class PaymentMethod extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="paymentMethod">
        Método de Pagamento:
        <select
          onChange={ handleChange }
          data-testid="method-input"
          id="paymentMethod"
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

export default PaymentMethod;

PaymentMethod.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
