const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-profile">
      <div className="user-header">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="avatar"
        />
        <div className="user-info">
          <h2>{user.name || user.login}</h2>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="stats">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
            <span>Repos: {user.public_repos}</span>
          </div>
          {user.location && <p>📍 {user.location}</p>}
          {user.blog && (
            <p>
              <a href={user.blog} target="_blank" rel="noopener noreferrer">
                {user.blog}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
