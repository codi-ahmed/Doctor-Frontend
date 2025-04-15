import React, { useEffect, useState } from 'react';
import '../styles/navbar.css';
import { useNavigate, useLocation } from 'react-router-dom'; 

const Navbar = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  


  useEffect(() => {
    const savedCustomer = JSON.parse(localStorage.getItem('customer'));
    setCustomer(savedCustomer); 
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
    setCustomer(null);
    navigate('/'); 
  };

  return (
    <div className="body">
      <div onClick={() => navigate('/')} className="left">Worlds Doctors</div>

      <div className="right">
        {customer ? (
         <div className="profile-dropdown">
         <span onClick={()=> navigate('/customer/profile')}>👤 {customer.name}</span>
         <div className="dropdown-menu">
          <div className='drop-menu-child'>
           
           <button onClick={handleLogout}>Logout</button></div>
         </div>
       </div>
       
        ) : (
          <>
            <div className="doctors-sign-btn">
              <button onClick={() => navigate('/doctors')}>Join as <strong>DOCTOR</strong></button>
            </div>
            <div className="patients-sign-btn">
              <button className="btn btn-left" onClick={() => navigate('/patients/login')}>Sign In</button>
              <button className="btn btn-right" onClick={() => navigate('/patients/register')}>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
