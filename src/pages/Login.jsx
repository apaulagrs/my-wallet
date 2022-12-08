import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
          />
          Email
        </label>
      </div>
    );
  }
}

export default Login;
