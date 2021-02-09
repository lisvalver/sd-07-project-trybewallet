import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buttonDelete, Edit } from '../actions';

class SpendTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderTable = this.renderTable.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(id) {
    const { edit } = this.props;
    edit(id);
  }

  handleDel(id) {
    const { del } = this.props;
    del(id);
  }

  renderTable(expense) {
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    const myCurrency = exchangeRates[`${currency}`];
    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ myCurrency.name }</td>
        <td>{ parseFloat(myCurrency.ask).toFixed(2) }</td>
        <td>{ (parseFloat(myCurrency.ask) * parseFloat(value)).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEdit(id) }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDel(id) }
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expense } = this.props;
    return (
      <div>
        <table>
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
            { expense.map((exp) => (
              this.renderTable(exp)
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  del: (id) => dispatch(buttonDelete(id)),
  edit: (id) => dispatch(Edit(id)),
});

SpendTable.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpendTable);
