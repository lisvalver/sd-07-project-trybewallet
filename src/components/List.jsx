import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Exclude from './Exclude';
import Change from './Change';

class List extends Component {
  twoDigits(value, currency) {
    return (parseFloat(value).toLocaleString('en-IN', {
      // style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }));
  }

  render() {
    // const { description, tag, method, value, currency } = this.props;
    const { expenses } = this.props;
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
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  {/* <td>{ this.twoDigits(value, currency) }</td> */}
                  <td>{ expense.value }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { this.twoDigits(expense.exchangeRates[expense.currency].ask,
                      'BRL')}
                  </td>
                  <td>
                    {
                      this.twoDigits(
                        expense.value * expense.exchangeRates[expense.currency].ask,
                        'BRL',
                      )
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <Change expense={ expense } />
                    <Exclude expense={ expense } />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
//   email: state.user.email,
  expenses: state.wallet.expenses,
});

List.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(List);
