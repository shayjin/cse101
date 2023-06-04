import './App.css';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { NavBar } from '../navbar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [emailList, setEmailList] = useState<String>();

  const HandleSignup = async () => {
      try {
        const response = await fetch('/checkEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });

        if (response.status !== 200) {
          setError('Account associated with this email already exists!');
        } else if (password.length < 8) {
          setError('Passwords need to be at least 8 characters!');
          return;
        } else if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        } else {
          navigate('/verify/redirect');
          const response = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
  
          if (response.ok) {
            console.log('User signed up');
            const emailResponse = await fetch('/send-authentication-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
  
            if (emailResponse.ok) {
              console.log('Authentication email sent');
            } else {
              console.error('Failed to send authentication email');
            }
          } else {
            setError('Invalid email or password');
          }
        }
      } catch (error) {
        console.error('Signup error:', error);
        setError('An error occurred while signing up');
      }
  };

  return (
    <>
      <NavBar/>
      <div className="apple-login-container">
        <div className="apple-login-content">
          <h1>Sign Up</h1>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
            <button className="apple-login-button" onClick={HandleSignup}>
              Sign Up
            </button>
          <Link to="/login" id="loginSignUpSwitch">
            Back go Login
          </Link>
        </div>
      </div>
    </>
  );
};
