import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const totalField = expenses.map(
      (expen) => expen.exchangeRates[expen.currency].ask * expen.value,
    ).reduce((acc, curr) => acc + Number(curr), 0);

    return (
      <div>
        <div>
          <p data-testid="email-field">{ email }</p>
          <span data-testid="total-field">{ totalField }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(),
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
