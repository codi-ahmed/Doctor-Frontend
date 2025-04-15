import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import '../../styles/customerAppointmentHistory.css';  

const CustomerAppointmentHistory = () => {
  // const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const customerEmail = JSON.parse(localStorage.getItem("customer")).email;
        
       
        const response = await axios.get("http://doctor-backend.railway.internal/api/customer/history", {
          params: { email: customerEmail }, 
        });
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div>Loading appointments...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="appointment-history">
      <h2>Your Appointment History</h2>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.patientname}</td>
                <td>{appointment.day}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default CustomerAppointmentHistory;
