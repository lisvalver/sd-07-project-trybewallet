import React, { Component } from 'react';
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
    const { email } = this.props;
    return (
      <div>
        <p>
          <em data-testid="email-field">{ email || ('Não Logado!') }</em>
        </p>
        <p>
          <strong>Despesas: </strong>
          <em data-testid="total-field">0</em>
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
});

Header.propTypes = {
  email: PropTypes.string,
};

Header.defaultProps = {
  email: 'Não logado!',
};

export default connect(mapStateToProps, null)(Header);
