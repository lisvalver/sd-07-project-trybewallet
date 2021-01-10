import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <p data-testid='email-field'>{email}</p>
        <p data-testid='total-field'>{total}</p>
        <p data-testid='header-currency-field'>BRL</p>
      </header>
    );
  }
}

export default Header;
