// src/components/WelcomePage.jsx
import { useNavigate } from 'react-router-dom';
  import './Welcome.css'; // Create or reuse a shared stylesheet

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to My Bank</h1>
        <p className="subtitle">Secure. Simple. Smart banking.</p>
        <div className="buttons">
          <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};


export default WelcomePage;
