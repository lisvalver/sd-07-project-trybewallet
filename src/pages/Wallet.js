import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData } from '../actions';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const { userEmail, totalSum, fetching } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <Header email={ userEmail } totalSum={ totalSum } />
        <Form
          value={ value }
          description={ description }
          currency={ currency }
          method={ method }
          tag={ tag }
          fetching={ fetching }
          handleChange={ this.handleChange }
          getCurrencyValue={ this.getCurrencyValue }
        />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSum: state.wallet.total,
  expensesArray: state.wallet.expenses,
  currencyArray: state.wallet.currencies,
  fetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalSum: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};
