import React from 'react';
import { connect } from 'react-redux';
import getCurrencies from '../../Services';

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.inicialsCurrencies = this.inicialsCurrencies.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  inicialsCurrencies() {
    const { currencies } = this.props;
    const keysCurrencies = Object.keys(currencies).filter(
      (currency) => currency !== 'USDT',
    );
    return keysCurrencies.map((coin) => (
      <option key={ coin } data-testid={ coin }>
        { coin }
      </option>
    ));
  }

  render() {
    const { isFetching, currencies } = this.props;
    console.log(isFetching, currencies);
    return (
      <label htmlFor="currency">
        Moeda:
        <select id="currency" data-testid="currency-input">
          {isFetching && this.inicialsCurrencies()}
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(getCurrencies),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
