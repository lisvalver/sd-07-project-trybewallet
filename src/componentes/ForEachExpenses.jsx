import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExpense, setConvertedValues } from '../actions';

class ForEachExpenses extends React.Component {
  constructor(props) {
    super(props)
    
    this.delLine = this.delLine.bind(this);
  }

  delLine({ target }) { 
    const { expenses, deletar } = this.props
    deletar(expenses[target.id])
  }

  // componentDidMount() {
  //   const { newConvertedValues, exchangeRates, currency, isFetching } = this.props;

  //   if(isFetching === false) {
  //     const convertedValue = Math.round(exchangeRates[currency].ask * 100) / 100;
  //     console.log(convertedValue);
  //     newConvertedValues(convertedValue);
  //   }
  // }

  render() {
    const { expense } = this.props;
    const {
      id,
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    return (
      <tr id={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button id={ id } data-testid="delete-btn" onClick={ this.delLine }>Deletar</button>
        </td>
      </tr>
    );
  }
}

ForEachExpenses.propTypes = ({
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }),
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  // newConvertedValues: (convertedValue) => dispatch(setConvertedValues(convertedValue)),
  deletar: (objOfExpenseToDelet) => dispatch(deleteExpense(objOfExpenseToDelet)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ForEachExpenses);
