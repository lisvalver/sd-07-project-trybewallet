import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/trybe-400x400.jpg';

class Header extends Component {
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
    const { email, total } = this.props;
    return (
      <div>
        <p>
          <em data-testid="email-field">{ email || ('Não Logado!') }</em>
        </p>
        <p>
          <strong>Despesas: </strong>
          <em data-testid="total-field">{ total || 0 }</em>
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
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
};

Header.defaultProps = {
  email: 'Não logado!',
  total: 0,
};

export default connect(mapStateToProps, null)(Header);
