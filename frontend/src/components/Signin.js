import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      login(response.data.token);
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (error.response?.data?.error === 'Invalid credentials') {
        toast.error('Username or password invalid');
      } else {
        toast.error(error.response?.data?.message || 'Login failed');
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
          <div className="form-title">Sign in</div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn" onClick={handleSignin}>Sign in</button>
        </div>
        <div className="footer">
          <span>Didn’t have an account?</span>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
