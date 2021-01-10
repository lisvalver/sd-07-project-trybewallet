import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function LoginBox({ getChanges, onSubmitBtn, validChanges }) {
  return (
    <div>
      <h3>Login</h3>
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="email-input"
            type="email"
            onChange={ getChanges }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            onChange={ getChanges }
          />
        </label>
        {
          validChanges
            ? <button type="submit" onClick={ onSubmitBtn }>Entrar</button>
            : <button type="submit" disabled>Entrar</button>
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ validation: { validChanges } }) => ({ validChanges });

export default connect(mapStateToProps)(LoginBox);

LoginBox.propTypes = {
  validChanges: PropTypes.bool.isRequired,
  getChanges: PropTypes.func.isRequired,
  onSubmitBtn: PropTypes.func.isRequired,
};
