import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpenses: 0,
    };
    this.handleTotalExpenses = this.handleTotalExpenses.bind(this);
  }

  componentDidUpdate() {
    this.handleTotalExpenses();
  }

  handleTotalExpenses() {
    const { totalExpenses } = this.props;
    this.setState({
      totalExpenses,
    });
  }

  render() {
    const { userEmail } = this.props;
    const { totalExpenses } = this.state;
    return (
      <div>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">{ totalExpenses }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
