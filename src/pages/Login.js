import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginActions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      // password: '',
      // passwordlength: '',
      emailError: '',
      passwordError: '',
      emailOk: false,
      passWordOk: false,
    };
    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
  }

  passwordChange(event) {
    // this.setState({
    //   password: event.target.value,
    //   passwordlength: event.target.value.length,
    // });

    const pwl = 6;

    if (event.target.value.length < pwl) {
      this.setState({
        passwordError: 'A senha tem que possuir mais de 6 caracteres',
        passWordOk: false,
      });
    } else {
      this.setState({
        passwordError: 'Senha OK',
        passWordOk: true,
      });
    }
  }

  emailChange(event) {
    const { email } = this.state;
    this.setState({
      email: event.target.value,
      emailError: 'Email OK',
      emailOk: true,
    });
    if (email === '') {
      this.setState({
        emailError: 'Insira um email',
        emailOk: false,
      });
    } else {
      const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/);
      if (!pattern.test(event.target.value)) {
        this.setState({
          emailError: 'Insira um email válido',
          emailOk: false,
        });
      }
    }
  }

  render() {
    const { emailError, passwordError, emailOk, passWordOk, email } = this.state;
    const { user } = this.props;
    return (
      <div>
        <input
          name="email"
          type="text"
          placeholder="email"
          data-testid="email-input"
          onChange={ this.emailChange }
        />
        <input
          name="password"
          type="text"
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.passwordChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => { user(email); } }
            disabled={ !(emailOk && passWordOk) }
            to="/carteira"
          >
            Entrar
          </button>
        </Link>
        <div>
          { emailError }
        </div>
        <div>
          { passwordError }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (e) => dispatch(loginActions(e)),
});

export default connect(null, mapDispatchToProps)(Login);
