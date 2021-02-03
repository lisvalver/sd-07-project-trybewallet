import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.validEmail = this.validEmail.bind(this);
    this.validPassword = this.validPassword.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  validEmail() {
    const { email } = this.state;
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(format)) {
      return true;
    }
    return false;
  }

  validPassword() {
    const { password } = this.state;
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH) return true;
    return false;
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => {
      if (this.validEmail() && this.validPassword()) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  render() {
    const { email, password, disabled } = this.state;
    const { history } = this.props;
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleInput }
          />
          <Form.Text className="text-muted">
            Nós nunca iremos compartilhar seu e-mail com ninguém.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleInput }
          />
        </Form.Group>
        <Button
          disabled={ disabled }
          onClick={ () => {
            history.push('/carteira');
          } }
          variant="success"
          type="button"
        >
          Entrar
        </Button>
      </Form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
