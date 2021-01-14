import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);

    this.getCells = this.getCells.bind(this);
    this.getFields = this.getFields.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  getFields(fields) {
    return fields.map((field) => (
      <div className="table-field" key={ field }>{field}</div>
    ));
  }

  getValues() {
    const { expenses } = this.props;
    const listOfExpenses = expenses.map((expense) => {
      const { description, tag, method, value, exchangeRates, currency } = expense;
      const { name, ask, timestamp } = exchangeRates[currency];
      const exchange = Number(ask).toFixed(2);
      const multiplication = value * ask;
      const convertedValue = multiplication.toFixed(2);
      return [
        description,
        tag,
        method,
        value,
        name,
        exchange,
        convertedValue,
        'Real',
      ];
    });
    return listOfExpenses;
  }

  getCells() {
    const listOfExpenses = this.getValues();
    return listOfExpenses
      .map((expense) => expense
        .map((list) => {
          const key = Math.random();
          return ((
            <div
              key={ key }
              role="cell"
              className="table-cell"
            >
              { list }
            </div>
          ));
        }));
  }

  render() {
    const fields = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <div>
        <div className="table-field-content">
          {this.getFields(fields)}
        </div>
        <div className="table-line">
          {this.getCells()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
