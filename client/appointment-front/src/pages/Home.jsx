import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";
import pic from "../assets/personpic.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleNumbers, setVisibleNumbers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctors`);
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const toggleNumber = (id) => {
    setVisibleNumbers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (doctor) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book an appointment.");
      navigate("/patients/login"); // Redirect to login page
    } else {
      // Store doctor data in localStorage and navigate to appointment page
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
      navigate("/customer/appointment");
    }
  };

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="Heading">
          <p>No doctors available</p>
        </div>
      ) : (
        <div className="doctors-list">
          {filteredDoctors.map((doc) => (
            <div className="container" key={doc._id}>
              <div className="left-con">
                <img className="pic" src={pic} alt={doc.name} />
                <div className="name-prof">
                  <h1>{doc.name}</h1>
                  <p>{doc.specialization}</p>
                  <p>{doc.experience} experience</p>
                </div>
              </div>
              <div className="right-con">
                <button
                  className="btn-home"
                  onClick={() => handleBookAppointment(doc)} // Call the function to handle the appointment booking
                >
                  Book Appointment
                </button>
                <button
                  className="btn-home"
                  onClick={() => toggleNumber(doc._id)}
                >
                  {visibleNumbers[doc._id] ? (
                    <div>{doc.phone}</div>
                  ) : (
                    <p>Call us At:</p>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
