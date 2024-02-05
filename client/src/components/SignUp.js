import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { authConfig } from '../../utils/auth';

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Here you would typically handle the sign-up logic, possibly adding the user to your database
      // However, since we're using Auth0, the sign-up is delegated to the Auth0 Universal Login page
      await loginWithRedirect({
        screen_hint: 'signup',
        email: userEmail,
        password: password,
        ...authConfig
      });
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const handleSignIn = () => {
    history.push('/login');
  };

  return (
    <div className="signup-container" style={{ color: 'white' }}>
      <h2>Sign Up for ThermWatch</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={handleSignIn} className="btn btn-link">Sign In</button>
      </p>
    </div>
  );
};

export default SignUp;