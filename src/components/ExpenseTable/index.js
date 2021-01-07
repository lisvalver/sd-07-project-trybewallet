import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletAction } from '../../actions';
import Table from './styles';

const { format } = new Intl.NumberFormat('pt-BR',
  { maximumFractionDigits: 2, minimumFractionDigits: 2 });

const ExpenseTable = ({ expen, removeExpense }) => (
  <Table>
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
    <tbody>
      { expen.map(({ id, value, currency, method, tag, description, exchangeRates }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ format(exchangeRates[currency].ask) }</td>
          <td>{ format(value * exchangeRates[currency].ask) }</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => removeExpense(id) }
            >
              Remover
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const mapStateToProps = ({ wallet }) => ({
  expen: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(walletAction.removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expen: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};
