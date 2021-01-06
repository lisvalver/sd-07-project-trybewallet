import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const WalletHeader = ({
  userEmail,
  totalExpense,
  currentExchange,
}) => {
  const LOGO_TRYBE = 'https://uploads-ssl.webflow.com/5fba98ad987231cf0efa3d58/5fba9c9a93a2e77624258d49_Logo.svg';
  const total = new Intl.NumberFormat(
    'pt-BR',
    { style: 'currency', currency: 'BRL' },
  ).format(totalExpense);
  return (
    <div className="ui black inverted segment">
      <div className="ui black massive inverted menu">
        <div className="item">
          <img
            src={ LOGO_TRYBE }
            className="ui tiny middle aligned image"
            alt="Logo da Trybe"
          />
        </div>
        <div className="item">
          <h2 className="ui grey inverted header">
            <i aria-hidden="true" className="money bill alternate outline icon" />
            <div className="content">PROJECT TRYBE WALLET</div>
          </h2>
        </div>
        <div className="right menu">
          <div className="item">
            <span data-testid="email-field">
              { userEmail }
            </span>
          </div>
          <div className="item">
            <span data-testid="total-field">
              { `Despesa Total: ${total}` }
            </span>
          </div>
          <div className="item">
            <span data-testid="header-currency-field">
              { `Câmbio: ${currentExchange}` }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

WalletHeader.propTypes = {
  userEmail: PropTypes.string,
  totalExpense: PropTypes.number,
  currentExchange: PropTypes.string,
};

WalletHeader.defaultProps = {
  userEmail: '',
  totalExpense: 0,
  currentExchange: 'BRL',
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpense: state.wallet.total,
});

export default connect(mapStateToProps)(WalletHeader);
