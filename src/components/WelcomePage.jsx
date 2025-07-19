// src/components/WelcomePage.jsx
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Optional for styling

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to My Bank</h1>
      <div className="buttons">
        <button onClick={() => navigate('/signup')}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default WelcomePage;
