import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the session token and redirect to login page
    localStorage.removeItem('userToken');
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
      {/* You can add additional logout UI or messages if needed */}
    </div>
  );
};

export default Logout;
