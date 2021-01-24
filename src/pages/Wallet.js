import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencyExchange, addExpense } from '../actions';
import Header from '../components/Header';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();

    this.filterCurrenciesInitials = this.filterCurrenciesInitials.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      expense: {        
        description: '',
        value: 0,
        currency: '',
        method: '',
        tag: '',  
        exchangeRates: {},      
      },
    };
  }

  componentDidMount() {
    const { requestCoins } = this.props;
    requestCoins();
  }

  filterCurrenciesInitials() {
    const { currencies } = this.props;
    const keysCurrencies = Object.keys(currencies).filter(
      (currency) => currency !== 'USDT'
    );    

    return keysCurrencies.map((coin) => (
      <option key={coin} data-testid={coin}>
        {coin}
      </option>
    ));
  }

  eventHandler({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        ...prevState.expense,
        [name]: value,
      },
    }));
  }

  resetState() {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        ...prevState.expense,
        description: '',
        value: 0,
        currency: '',
        method: '',
        tag: '',  
        exchangeRates: {},
      },
    }));
  }

  async handleSubmit() {
    const { addExpense } = this.props;
    const { expense } = this.state;    
    await addExpense(expense);
    this.resetState();
  }

  render() {
    const { email, total } = this.props;
    const { description, value, currency, method, tag } = this.state.expense;
    return (
      <div>
        <Header email={ email } total={ total } />
        <Form
          currencies={ this.filterCurrenciesInitials }
          setState={ this.eventHandler }
          onSubmit={ this.handleSubmit}
          description={ description }
          value={ value }
          currency={ currency }
          method={ method }
          tag={ tag }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { currencies, total } }) => ({
  email,
  currencies, 
  total, 
});

const mapDispatchToProps = (dispatch) => ({
  requestCoins: () => dispatch(saveCurrencyExchange()),
  addExpense: (expense) => dispatch(addExpense(expense)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
