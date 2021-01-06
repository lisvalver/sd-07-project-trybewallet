import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletActions } from '../../store/ducks/wallet';

class WalletTable extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(event, id) {
    event.preventDefault();
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  handleEdit(event, expense) {
    event.preventDefault();
    const { setEditMode, setCurrentExpense } = this.props;
    setEditMode(true);
    setCurrentExpense(expense);
  }

  render() {
    const { expenses, editMode, currentExpense } = this.props;
    return (
      <table className="ui blue celled inverted selectable table">
        <thead>
          <tr>
            <th className="center aligned">Descrição</th>
            <th className="center aligned">Tag</th>
            <th className="center aligned">Método de pagamento</th>
            <th className="center aligned">Valor</th>
            <th className="center aligned">Moeda</th>
            <th className="center aligned">Câmbio utilizado</th>
            <th className="center aligned">Valor convertido</th>
            <th className="center aligned">Moeda de conversão</th>
            <th className="center aligned">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const {
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              return (
                <tr
                  key={ id }
                  className={ id === currentExpense.id ? 'active' : undefined }
                >
                  <td className="center aligned">{description}</td>
                  <td className="center aligned">{tag}</td>
                  <td className="center aligned">{method}</td>
                  <td className="center aligned">
                    {new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 2,
                    }).format(value)}
                  </td>
                  <td className="center aligned">
                    {exchangeRates[currency].name}
                  </td>
                  <td className="center aligned">
                    {new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format((exchangeRates[currency].ask))}
                  </td>
                  <td className="center aligned">
                    {new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(
                      parseFloat(value) * parseFloat(exchangeRates[currency].ask),
                    )}
                  </td>
                  <td className="center aligned">Real</td>
                  <td className="center aligned">
                    <button
                      className="ui yellow icon button"
                      type="button"
                      disabled={ editMode }
                      data-testid="edit-btn"
                      onClick={ (event) => this.handleEdit(event, expense) }
                    >
                      <i aria-hidden="true" className="edit icon" />
                    </button>
                    <span>{'  '}</span>
                    <button
                      className="ui red icon button"
                      type="button"
                      disabled={ editMode }
                      data-testid="delete-btn"
                      onClick={ (event) => this.handleDelete(event, id) }
                    >
                      <i aria-hidden="true" className="eraser icon" />
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      tag: PropTypes.string,
    }),
  ).isRequired,
  editMode: PropTypes.bool,
  currentExpense: PropTypes.shape({
    id: PropTypes.number,
  }),
  deleteExpense: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  setCurrentExpense: PropTypes.func.isRequired,
};

WalletTable.defaultProps = {
  currentExpense: {
    id: -1,
  },
  editMode: false,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
  currentExpense: state.wallet.currentExpense,
});

const mapDispatchToProps = {
  deleteExpense: walletActions.deleteExpense,
  setEditMode: walletActions.setEditMode,
  setCurrentExpense: walletActions.setCurrentExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
