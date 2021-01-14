import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class List extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <div>
          <span>Descrição</span>
          <span>Tag</span>
          <span>Método de pagamento</span>
          <span>Valor</span>
          <span>Moeda</span>
          <span>Câmbio utilizado</span>
          <span>Valor convertido</span>
          <span>Moeda de conversão</span>
          <span>Editar/Excluir</span>
        </div>
        <div>
          {expenses.map((expense) => (
            <div
              key={ expense.id }
              style={ {
                display: 'flex',
                justifyContent: 'space-around',
                height: 50,
                alignItems: 'center',
              } }
            >
              <span role="cell">
                {expense.description}
              </span>
              <span role="cell">
                {expense.tag}
              </span>
              <span role="cell">
                {expense.method}
              </span>
              <span role="cell">
                {expense.value}
              </span>
              <span role="cell">
                {Object.values(expense.exchangeRates)
                  .filter((item) => item.code === expense.currency)[0].name}
              </span>
              <span role="cell">
                {Number(Object.values(expense.exchangeRates)
                  .filter((item) => item.code === expense.currency)[0].ask).toFixed(2)}
              </span>
              <span role="cell">
                {Number((Object.values(expense.exchangeRates).filter(
                  (item) => item.code === expense.currency,
                )[0].ask) * expense.value).toFixed(2)}
              </span>
              <span role="cell">
                Real
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet: { expenses, currencies } }) => ({
  expenses,
  currencies,
});

export default connect(mapStateToProps)(List);
