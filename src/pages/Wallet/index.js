import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FiEdit, FiTrash } from 'react-icons/fi';

import { removeExpense } from '../../actions';

import WalletHeader from '../../components/WalletHeader';
import './style.css';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(expID) {
    const { removeExpense: tableRemoveExpense } = this.props;
    tableRemoveExpense(expID);
  }

  render() {
    const { expenses } = this.props;
    return (
      <>
        <WalletHeader />
        <main>
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
                      className="expense__edit"
                      data-testid="delete-edit"
                      style={ { marginRight: 12 } }
                    >
                      <FiEdit size={ 18 } color="#000" />
                    </button>
                    <button
                      type="button"
                      className="expense__delete"
                      data-testid="delete-btn"
                      onClick={ () => this.handleDelete(exp.id) }
                    >
                      <FiTrash size={ 18 } color="#fff" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  removeExpense,
};

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
