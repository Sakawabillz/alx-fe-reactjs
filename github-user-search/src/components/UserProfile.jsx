import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

/**
 * Formats large numbers into a more readable format (e.g., 1.5K, 2.3M)
 * @param {number} num - The number to format
 * @returns {string} Formatted number as a string
 */
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Extracts the domain from a URL
 * @param {string} url - The URL to process
 * @returns {string} The domain name
 */
const getDomainFromUrl = (url) => {
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`);
    return domain.hostname.replace('www.', '');
  } catch (e) {
    return url;
  }
};

const UserProfile = ({ user }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Reset image loaded state when user changes
    setIsImageLoaded(false);
  }, [user?.avatar_url]);

  if (!user) return null;

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling?.classList.remove('hidden');
  };

  return (
    <article 
      className="user-profile" 
      data-testid="user-profile"
      aria-labelledby="profile-name"
    >
      <div className="user-profile__header">
        <div className="user-profile__avatar-container">
          <div className={`user-profile__avatar-wrapper ${isImageLoaded ? 'loaded' : 'loading'}`}>
            <img 
              src={user.avatar_url} 
              alt="" 
              className="user-profile__avatar"
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
              aria-hidden="true"
            />
            <div className="user-profile__avatar-fallback hidden">
              <span className="sr-only">Avatar for {user.login}</span>
              <span aria-hidden="true">{user.login.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="user-profile__button"
            aria-label={`View ${user.login}'s GitHub profile (opens in a new tab)`}
          >
            <span>View on GitHub</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
        
        <div className="user-profile__info">
          <div className="user-profile__name-wrapper">
            <h1 id="profile-name" className="user-profile__name">
              {user.name || user.login}
            </h1>
            {user.login && user.name && (
              <p className="user-profile__username">
                <span className="sr-only">Username: </span>
                @{user.login}
              </p>
            )}
          </div>
          
          {user.bio && (
            <p className="user-profile__bio">
              {user.bio}
            </p>
          )}
          
          <div className="user-profile__stats" aria-label="GitHub statistics">
            <div className="user-profile__stat">
              <span className="user-profile__stat-value">
                {formatNumber(user.public_repos)}
              </span>
              <span className="user-profile__stat-label">Repositories</span>
            </div>
            <div className="user-profile__stat">
              <span className="user-profile__stat-value">
                {formatNumber(user.followers)}
              </span>
              <span className="user-profile__stat-label">Followers</span>
            </div>
            <div className="user-profile__stat">
              <span className="user-profile__stat-value">
                {formatNumber(user.following)}
              </span>
              <span className="user-profile__stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>
      
      {(user.location || user.blog) && (
        <div className="user-profile__meta">
          {user.location && (
            <div className="user-profile__meta-item">
              <span className="user-profile__meta-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <span className="user-profile__meta-text">{user.location}</span>
            </div>
          )}
          
          {user.blog && (
            <div className="user-profile__meta-item">
              <span className="user-profile__meta-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </span>
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="user-profile__meta-link"
                aria-label={`Visit ${getDomainFromUrl(user.blog)} (opens in a new tab)`}
              >
                {getDomainFromUrl(user.blog)}
              </a>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

UserProfile.propTypes = {
  /**
   * The user object containing profile information
   */
  user: PropTypes.shape({
    /** URL of the user's avatar */
    avatar_url: PropTypes.string.isRequired,
    /** GitHub username */
    login: PropTypes.string.isRequired,
    /** User's full name */
    name: PropTypes.string,
    /** User's bio/description */
    bio: PropTypes.string,
    public_repos: PropTypes.number,
    followers: PropTypes.number,
    following: PropTypes.number,
    location: PropTypes.string,
    blog: PropTypes.string,
    html_url: PropTypes.string.isRequired
  })
};

export default UserProfile;
