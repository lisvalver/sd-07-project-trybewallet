import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const despesaTotal = 0;
    const { loggedEmail } = this.props;
    return (
      <div>
        <h1>Carteira</h1>
        <span data-testid="email-field">
          {`E-mail: ${loggedEmail}`}
        </span>
        <span data-testid="total-field">
          {`Despesa Total: ${despesaTotal}`}
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { loggedEmail: user.email };
}

Header.propTypes = {
  loggedEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
