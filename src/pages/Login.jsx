import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const minLength = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: 0,
      disabled: this.state.password > minLength,
    };
  }

  render() {
    const { disabled, password } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            required
          />
          Email
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            minLength={ 6 }
            required
            value={ password }
          />
          Password
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => dispatch() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
