import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../../components/WalletHeader';
import { removeExpense, editExpense, allowEdition } from '../../actions';

import './style.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(expId) {
    const { removeExpense: tableRemoveExpense } = this.props;
    tableRemoveExpense(expId);
  }

  handleEdit(expEdit) {
    const {
      editExpense: tableEditExpense,
      allowEdition: handleAllowEdition,
    } = this.props;
    tableEditExpense(expEdit);
    handleAllowEdition();
  }

  render() {
    const { expenses } = this.props;
    return (
      <>
        <WalletHeader />
        <table className="expenses__table">
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
            {expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{parseFloat(exp.value)}</td>
                <td>{exp.exchangeRates[exp.currency].name}</td>
                <td>{parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (parseFloat(exp.value)
                    * parseFloat(exp.exchangeRates[exp.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    className="expense__delete"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(exp.id) }
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="expense__edit"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(exp) }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStatetoProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  removeExpense,
  editExpense,
  allowEdition,
};

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  allowEdition: PropTypes.func.isRequired,
};

export default connect(mapStatetoProps, mapDispatchToProps)(Wallet);
