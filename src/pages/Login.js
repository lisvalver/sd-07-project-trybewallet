import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.verifiForm = this.verifiForm.bind(this);

    this.state = {
      email: '',
      password: '',
      verified: true,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  verifiForm() {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { email, password } = this.state;
    let checked = true;
    if (pattern.test(email)) {
      const minLenght = 5;
      if (password.length > minLenght) {
        checked = false;
      }
    }
    return checked;
  }

  render() {
    const { history, add } = this.props;
    const { email } = this.state;
    return (
      <div className="login-page">
        <form>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              name="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ this.verifiForm() }
            onClick={ () => {
              add(email);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(addEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.string,
  add: PropTypes.func,
};
Login.defaultProps = {
  history: PropTypes.string,
  add: PropTypes.func,
};
