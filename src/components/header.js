import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <div>
          <div className="name-login">
            Email:
          </div>
          <h2 data-testid="email-field">{email}</h2>
          <br />
          <div>Despesa Total:</div>
          <span data-testid="total-field" value={ 0 }>{total}</span>
          <br />
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
