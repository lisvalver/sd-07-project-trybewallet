import React from 'react';
import { connect } from 'react-redux';
import { fetchWallet } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      description: '',
      expenses: 0,
      currency: 'BRL',
    };
  }

  componentDidMount() {
    const { getWallet } = this.props;
    getWallet();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, currencies } = this.props;
    const { expenses, currency } = this.state;
    console.log(currencies);
    return (
      <div>
        <header className="header-user">
          <h1>TrybeWallet</h1>
          <div className="info-fields">
            <p data-testid="total-field">
              Total : R$
              {expenses}
            </p>
            <p className="currency" data-testid="header-currency-field">{currency}</p>
            <p data-testid="email-field">{ email }</p>
          </div>
        </header>
        <div className="info-budget">
          <label htmlFor="budget">
            Despesas:
            <input
              className="expenses"
              type="text"
              id="budget"
              name="expenses"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="budget">
            Descrição:
            <input
              className="description"
              type="text"
              id="budget"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          {/* <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ (e) => this.handleChange(e) }
          >
            {currencies.map((item) => (item !== 'USDT' ? (
              <option key={ item } value={ item } data-testid={ item }>
                {item}
              </option>
            ) : (
              false
            )))}
          </select> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ user: { email }, wallet: { currencies } }) => ({
  email,
  currencies,
});

const mapDispatchToProps = (dispatch) => (
  {
    getWallet: () => dispatch(fetchWallet()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
