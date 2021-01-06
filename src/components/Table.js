import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelete, actionChangeEditState, idBeingEdited } from '../actions';

function TableComp({
  expenses,
  deleteA,
  edit,
  editStatus,
}) {
  //   expensesTable = () => {
  //     expenses.map(({}))
  //   };
  return (
    <div>
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
        {expenses.map(
          ({
            id,
            currency,
            value,
            description,
            method,
            tag,
            exchangeRates,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>
                {parseFloat(value * exchangeRates[currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => {
                    edit();
                    editStatus(id);
                  } }
                >
                  Editar
                </button>
                {' '}
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => deleteA(id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ),
        )}
      </tbody>

    </div>
  );
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = {
  deleteA: actionDelete,
  edit: actionChangeEditState,
  editStatus: idBeingEdited,
};
TableComp.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteA: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);
