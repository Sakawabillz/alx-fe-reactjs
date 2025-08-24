import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {user?.username}!</p>
      
      {/* Nested route navigation */}
      <nav style={{ margin: '1rem 0' }}>
        <Link to="details" style={{ marginRight: '1rem' }}>Profile Details</Link>
        <Link to="settings">Profile Settings</Link>
      </nav>
      
      {/* Nested routes will render here */}
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
