import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.username + '@example.com');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable notifications
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ProfileSettings;