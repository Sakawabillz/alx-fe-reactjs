import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Details</h2>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.username}@example.com</p>
      <p>Member since: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default ProfileDetails;
