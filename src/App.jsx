import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUser = async (username) => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <SearchBar onSearch={searchUser} loading={loading} />
        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {userData && <UserProfile user={userData} />}
      </main>
    </div>
  );
}
