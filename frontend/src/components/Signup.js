import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/signUp', { email, password });
      toast.success('Account created successfully!');
      navigate('/signin', { replace: true });
    } catch (error) {
      if (error.response?.data?.error === 'Email is already exist') {
        toast.error('Email is already registered');
      } else {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="form-container">
        <div className="header">
          <img className="logo" src="https://cdn.pixabay.com/photo/2022/08/06/21/54/hamburger-7369457_640.png" alt="Food Recipe Logo" />
          <div className="title">Food Recipe</div>
        </div>
        <div className="form-content">
          <div className="form-title">Sign up</div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn" onClick={handleSignup}>Sign up</button>
        </div>
        <div className="footer">
          <span>Already have an account?</span>
          <a href="/signin">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
