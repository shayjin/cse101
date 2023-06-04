import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../navbar/NavBar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  var x = false;
  const handleLogin = async () => {
    try {
      // Make API call to authenticate user with provided credentials
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      console.log(response);
      if (response.status === 500) {
        setError('Invalid email or password');
      } else if (response.status === 200) {
        console.log("logged in");
        x = true;
        navigate('/');
      }
      
    } catch (error) {
      // Handle login error
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <NavBar/>
      <div className="apple-login-container">
        <div className="apple-login-content">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Lastname.Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="apple-login-button" onClick={handleLogin}>
            LogIn
          </button>
          <Link to="/signup" id="loginSignUpSwitch">
            Sign Up
          </Link>
          <Link to="/signup" id="loginSignUpSwitch">
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};