import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    const { email } = user;
    return (
      <div>
        <header className="header">
          <h1>TRYBE WALLET</h1>
          <div>
            <h3>Email: </h3>
            <span data-testid="email-field">{ email }</span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
