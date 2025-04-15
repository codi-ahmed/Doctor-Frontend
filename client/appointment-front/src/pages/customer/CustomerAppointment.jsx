import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles/customerAppointment.css';

const CustomerAppointment = () => {
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    name: "",
    patientname: "",
    patientnumber: "",
    patientemail: "",
    day: "",
    time: "",
  });

  const [doctorSelected, setDoctorSelected] = useState(false);
  const [appointmentCancelled, setAppointmentCancelled] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  useEffect(() => {
    const selectedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
    const customer = JSON.parse(localStorage.getItem("customer"));
    const isAppointmentStarted = localStorage.getItem("appointmentStarted");

    if (!selectedDoctor || !customer) {
      setDoctorSelected(false);
      setAppointmentCancelled(false);
      return;
    }

    setDoctorSelected(true);
    setAppointmentCancelled(false);
    setAppointmentBooked(isAppointmentStarted === "true");

    setAppointment({
      name: selectedDoctor.name,
      patientname: customer.name,
      patientnumber: customer.phone,
      patientemail: customer.email,
      day: "",
      time: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointment.name) {
      alert("No doctor selected! Please select a doctor.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/customer/create`,
        appointment
      );
      if (response.status === 201) {
        alert("Appointment booked successfully!");
        localStorage.setItem("appointmentStarted", "true");
        setAppointmentBooked(true);
        navigate("/customer/profile");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleNewAppointment = () => {
    localStorage.removeItem("selectedDoctor");
    localStorage.removeItem("appointmentStarted");
    setDoctorSelected(false);
    setAppointmentCancelled(false);
    setAppointmentBooked(false);
    navigate("/");
  };

  const handleCancelAppointment = () => {
    localStorage.removeItem("selectedDoctor");
    localStorage.removeItem("appointmentStarted");
    setDoctorSelected(false);
    setAppointmentCancelled(true);
    setAppointmentBooked(false);
  };

  return (
    <div className="appointment-form">
      <h2>Book Appointment</h2>

      {appointmentCancelled ? (
        <div className="alert-message">
          <p>Appointment has been cancelled.</p>
          <button onClick={handleNewAppointment}>Select a New Doctor</button>
        </div>
      ) : doctorSelected ? (
        <>
          <div className="appointment-actions">
            <button onClick={handleNewAppointment}>New Appointment</button>
            <button onClick={handleCancelAppointment}>Cancel Appointment</button>
          </div>

          {!appointmentBooked ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Doctor Name:</label>
                <input type="text" value={appointment.name} readOnly />
              </div>
              <div className="form-group">
                <label>Patient Name:</label>
                <input type="text" value={appointment.patientname} readOnly />
              </div>
              <div className="form-group">
                <label>Patient Email:</label>
                <input type="email" value={appointment.patientemail} readOnly />
              </div>
              <div className="form-group">
                <label>Patient Phone:</label>
                <input
                  type="tel"
                  name="patientnumber"
                  value={appointment.patientnumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Appointment Date:</label>
                <input
                  type="date"
                  name="day"
                  value={appointment.day}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Appointment Time:</label>
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Book Appointment</button>
            </form>
          ) : (
            <div className="alert-message">
              <p>You have already booked an appointment.</p>
              <button onClick={handleNewAppointment}>Book New Appointment</button>
            </div>
          )}
        </>
      ) : (
        <div className="alert-message">
          <p>No doctor selected!</p>
          <button onClick={() => navigate("/")}>Go to Home and Select Doctor</button>
        </div>
      )}
    </div>
  );
};

export default CustomerAppointment;
