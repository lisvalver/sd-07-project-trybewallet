import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMoedas } from '../actions';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      totalDespesas: 0,
      valor_total: 0,
      descricao: '',
      moeda: 'USD',
    };
    this.handleChanger = this.handleChanger.bind(this);
  }
  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    console.log(this.props);
    const { email, moedas } = this.props;
    const { totalDespesas, valor_total, descricao } = this.state;

    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{totalDespesas}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <input
          data-testid="value-input"
          name="valor_total"
          value={valor_total}
          onChange={this.handleChanger}
        />
        <input
          data-testid="description-input"
          name="descricao"
          value={descricao}
          onChange={this.handleChanger}
        />
        <p> MOEDAS: {0}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  moedas: state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  enviarFetch: () => dispatch(fetchMoedas()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
