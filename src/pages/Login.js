import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisable: true,
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleInputChange({ name: inputName, value }) {
    this.setState({ [inputName]: value }, () => {
      const { name, email } = this.state;
      if (name !== '' && email !== '') {
        this.setState({ isDisable: false });
      } else {
        this.setState({ isDisable: true });
      }
    });
  }

  // https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html
  validateEmail() {
    const { email, password } = this.state;
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const resultRegex = regex.test(email);
    const minValue = 6;

    if (resultRegex && password.length >= minValue) {
      return this.setState({ isDisable: false });
    }
    this.setState({ isDisable: true });
  }

  render() {
    const { isDisable, email, password } = this.state;
    const { saveEmail, history } = this.props;
    return (
      <main>
        <form>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              name="email"
              type="email"
              data-testid="email-input"
              autoComplete="off"
              autoCorrect="off"
              value={ email }
              placeholder="trybe@gmail.com"
              onKeyUp={ this.validateEmail }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <label htmlFor="password">
            password:
            <input
              id="password"
              name="password"
              type="password"
              data-testid="password-input"
              minLength="6"
              autoComplete="off"
              autoCorrect="off"
              value={ password }
              placeholder="*********"
              onKeyUp={ this.validateEmail }
              onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <button
            type="submit"
            onClick={ () => {
              saveEmail(email);
              history.push('/carteira');
            } }
            disabled={ isDisable }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (e) => dispatch(login(e)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
