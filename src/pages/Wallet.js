import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderWallet, AddExpense, TableExpense } from '../components';
import { addExpense, fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.changeState = this.changeState.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.verificationDates = this.verificationDates.bind(this);
    this.state = {
      exchangeRates: {},
      description: '',
      currency: '',
      method: '',
      value: '0',
      tag: '',
    };
  }

  componentDidMount() {
    this.updateState();
  }

  async updateState() {
    const { acFetchCurrencies } = this.props;
    await acFetchCurrencies();
    const { currencies } = this.props;
    this.setState({ exchangeRates: currencies });
    this.verificationDates();
  }

  changeState({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  verificationDates() {
    const { currency, method, tag } = this.state;
    if (currency === '' || method === '' || tag === '') {
      ['currency', 'method', 'tag'].forEach((e) => {
        const { value } = document.querySelector(`#${e}`);
        this.setState({ [e]: value });
      });
    }
  }

  saveExpense() {
    const { dispatchExpense } = this.props;
    this.updateState();
    dispatchExpense(this.state);
  }

  render() {
    const { email, expenses, currencies } = this.props;
    return (
      <div>
        <HeaderWallet email={ email } expenses={ expenses } />
        <AddExpense
          saveExpense={ this.saveExpense }
          changeState={ this.changeState }
          currencies={ currencies }
          verificationDates={ this.verificationDates }
        />
        <TableExpense expenses={ expenses } />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses, currencies } }) => (
  { email, expenses, currencies }
);

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (payload) => dispatch(addExpense(payload)),
  acFetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  acFetchCurrencies: PropTypes.func.isRequired,
};
