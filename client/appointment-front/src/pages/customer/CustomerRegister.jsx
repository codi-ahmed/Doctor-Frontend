import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/customerregister.css'
import { Link } from 'react-router-dom';

const CustomerSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/customer/register`, form);
      
      // Check if customer data exists in response
      if (res.data && res.data.customer) {
        localStorage.setItem('customer', JSON.stringify(res.data.customer));
        localStorage.setItem('token', res.data.token);
        navigate('/'); 
        // mepage after successful signup
      } else {
        alert('Signup failed: Missing customer data');
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert('Signup failed');
    }
  };
  

  return (
    <div className='customer_reg_body'>
      
      <form className="reg_form" onSubmit={handleSubmit}>
       <div className="reg_heading" ><h2 >Customer Signup</h2></div> 
       <div className="reg_input_parent">
        <p>Enter Name:</p>
        <input
        className="reg_input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <p>Enter Email:</p>
        <input
        className="reg_input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <p>Enter Password:</p>
        <input
        className="reg_input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        </div>
        <button className="regbtn" type="submit">Register</button>
        <p>Already have Account? <Link to="/patients/login">SignIn</Link> </p>
      </form>
    </div>
  );
};

export default CustomerSignup;
