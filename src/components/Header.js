import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
//   constructor() {
//     super();
//   }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">{ email }</h1>
        <h2 data-testid="total-field">0</h2>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({ email: state.user.email });
export default connect(mapStateToProps)(Header);
