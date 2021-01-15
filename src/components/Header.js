import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/trybe-400x400.jpg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.total = this.total.bind(this);
  }

  total() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((
        acc,
        { value, currency, exchangeRate },
      ) => (acc + exchangeRate[currency].ask * value), 0);
    return total;
  }

  renderTitle() {
    return (<h1>Wallet</h1>);
  }

  renderBelovedLogo() {
    return (
      <h1>
        trybe
        <img className="App-logo" src={ logo } alt="beloved trybe logo" />
      </h1>
    );
  }

  renderLoginBoard() {
    const { email } = this.props;
    return (
      <div>
        <p>
          <em data-testid="email-field">{ email || ('Não Logado!') }</em>
        </p>
        <p>
          <strong>Despesas: </strong>
          {/* this.total() */}
          <em data-testid="total-field">{ this.total() }</em>
          <em data-testid="header-currency-field"> BRL</em>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="App-header">
        {this.renderBelovedLogo()}
        {this.renderTitle()}
        {this.renderLoginBoard()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

Header.defaultProps = {
  email: 'Não logado!',
};

export default connect(mapStateToProps, null)(Header);
