import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/customerLogin.css';
import { Link } from 'react-router-dom';

const CustomerLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      // Send POST request to backend
      const res = await axios.post('http://localhost:3000/api/customer/login', form);

      // Check if response is successful
      if (res.status === 200) {
        // Save customer and token to localStorage
        localStorage.setItem('customer', JSON.stringify(res.data.customer));
        localStorage.setItem('token', res.data.token); // Store token as well for future API requests
        // Navigate to home page
        navigate('/');
      }
    } catch (error) {
      // Handle login failure
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return (
    <div className='customer-login-body'>
      
      <form className='login_form' onSubmit={handleSubmit}>
        <div className='heading'><h2 >Customer Login</h2></div>
        <div className='input-parent'>
          <p>Enter Email:</p>
        <input
        className='input-login'
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <p>Enter Password:</p>
        <input
        className='input-login'
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        </div>
        <button className='loginbtn-cus' type="submit">Login</button>
        <p>Create an account? <Link to="/patients/register">SignUp</Link></p>
      </form>
    </div>
  );
};

export default CustomerLogin;
