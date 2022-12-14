import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userRequest } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
    };
  }

  emailValidation = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const re = /\S+@\S+\.\S+/;

    return re.test(email) && password.length >= minLength;
  };

  buttonClick = async (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;

    await dispatch(userRequest(email));
    history.push('/carteira');
  };

  render() {
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="email-input"
            required
            onChange={ ({ target }) => this.setState({ email: target.value }) }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            data-testid="password-input"
            minLength={ 6 }
            required
            onChange={ ({ target }) => this.setState({ password: target.value }) }
          />
        </label>
        <button
          type="button"
          disabled={ !this.emailValidation() }
          onClick={ this.buttonClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
