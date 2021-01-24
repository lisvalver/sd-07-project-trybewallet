import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <div className="name-login">
            Email:
          </div>
          <h2 data-testid="email-field">{email}</h2>
          <br />
          <div>Despesa Total:</div>
          <span data-testid="total-field" value="0">valor total</span>
          <br />
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
