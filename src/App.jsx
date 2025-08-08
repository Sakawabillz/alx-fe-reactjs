import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) {
        throw new Error('User not found')
      }
      const data = await response.json()
      setUserData(data)
    } catch (err) {
      setError(err.message)
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt={userData.name || userData.login} className="avatar" />
          <h2>{userData.name || userData.login}</h2>
          {userData.bio && <p>{userData.bio}</p>}
          <div className="user-stats">
            <span>Followers: {userData.followers}</span>
            <span>Following: {userData.following}</span>
            <span>Repos: {userData.public_repos}</span>
          </div>
          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="profile-link"
          >
            View Profile
          </a>
        </div>
      )}
    </div>
  )
}

export default App
