import React, { useEffect, useState } from 'react';
import '../../styles/customerProfile.css'; 
const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Customer Profile</h2>
      {customer ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>ID:</strong> {customer.id}</p>
        </div>
      ) : (
        <p>Loading customer details...</p>
      )}
    </div>
  );
};

export default CustomerProfile;
