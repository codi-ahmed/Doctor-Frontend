import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/doctors.css'; 

const DoctorPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-panel">
      <h1 className="heading">Partner With Us – Doctor Panel</h1>

      <section className="section">
        <h2>📋 Company Policies</h2>
        <ul>
          <li>All booked appointments will be delivered to you in the form of a PDF.</li>
          <li>Customers can cancel appointments anytime before the scheduled time.</li>
          <li>You will receive real-time access to booking history and appointment details.</li>
          <li>Your profile will be listed for patients to select and book appointments.</li>
        </ul>
      </section>

      <section className="section">
        <h2>💰 Charges & Subscription</h2>
        <p>You will be charged a flat fee of <strong>$5/month</strong> for using this platform.</p>
        <p>This includes unlimited appointments and support.</p>
        <p><em>Portfolio Project ID: #DOC-4520</em></p>
      </section>

      <section className="section">
        <h2>📞 Contact Information</h2>
        <p><strong>Name:</strong> Ahmed</p>
        <p><strong>Email:</strong> ahmed@example.com</p>
        <p><strong>Phone:</strong> +92 300 1234567</p>
      </section>

      <button className="doc-home-btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default DoctorPanel;
