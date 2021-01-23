import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeLogo from '../images/trybe_small.png';
import './Header.css';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header className="header">
        <div className="header-content">
          <img
            src={ trybeLogo }
            alt="trybe-logo"
            className="trybe-logo-small"
          />
          <div className="user-data">
            <p
              data-testid="email-field"
              className="user-email"
            >
              Usuário:
              <span>{ userEmail }</span>
            </p>
            <div className="expenses-info">
              <span>Despesas totais: $</span>
              <span data-testid="total-field">0</span>
              <span data-testid="header-currency-field">BRL</span>
            </div>
          </div>
        </div>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
