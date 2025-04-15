
import { useNavigate } from 'react-router';
import '../styles/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();


  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <ul>
        <div
          className='section-side'
          onClick={() => handleClick('/customer/profile')}
        >
          <li>Profile</li>
        </div>

        <div
          className='section-side'
          onClick={() => handleClick('/customer/appointment')}
        >
          <li>Appointment</li>
        </div>

        <div
          className='section-side'
          onClick={() => handleClick('/customer/history')}
        >
          <li>History</li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
