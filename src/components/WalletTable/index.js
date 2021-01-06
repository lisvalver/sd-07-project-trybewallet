import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
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
      <Table celled color="blue" inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Descrição</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Tag</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Método de pagamento</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Valor</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Moeda</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Câmbio utilizado</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Valor convertido</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Moeda de conversão</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Editar/Excluir</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
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
                <Table.Row key={ id } active={ id === currentExpense.id }>
                  <Table.Cell textAlign="center">{description}</Table.Cell>
                  <Table.Cell textAlign="center">{tag}</Table.Cell>
                  <Table.Cell textAlign="center">{method}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 2,
                    }).format(value)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {exchangeRates[currency].name}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format((exchangeRates[currency].ask))}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {new Intl.NumberFormat('pt-BR', {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(
                      parseFloat(value) * parseFloat(exchangeRates[currency].ask),
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="center">Real</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      disabled={ editMode }
                      color="yellow"
                      icon="edit"
                      data-testid="edit-btn"
                      onClick={ (event) => this.handleEdit(event, expense) }
                    />
                    <span>{'  '}</span>
                    <Button
                      disabled={ editMode }
                      color="red"
                      icon="eraser"
                      data-testid="delete-btn"
                      onClick={ (event) => this.handleDelete(event, id) }
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Body>
      </Table>
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
