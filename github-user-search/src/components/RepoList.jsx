import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// Format number to K/M/B
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// Truncate text with ellipsis
const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Format relative time
const formatUpdatedAt = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Get language color
const getLanguageColor = (language) => {
  const colors = {
    'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'Python': '#3572A5',
    'Java': '#b07219', 'C++': '#f34b7d', 'C#': '#178600', 'PHP': '#4F5D95',
    'Ruby': '#701516', 'CSS': '#563d7c', 'HTML': '#e34c26', 'Go': '#00ADD8',
    'Rust': '#dea584', 'Shell': '#89e051', 'Dart': '#00B4AB', 'Kotlin': '#F18E33',
    'Swift': '#F05138', 'Scala': '#c22d40', 'R': '#198CE7', 'Vue': '#41b883',
    'Dockerfile': '#384d54', 'Makefile': '#427819', 'TSX': '#3178c6', 'JSX': '#f1e05a',
    'Sass': '#c6538c', 'SCSS': '#c6538c', 'Less': '#1d365d', 'JSON': '#292929',
    'Markdown': '#083fa1', 'YAML': '#cb171e', 'GraphQL': '#e10098', 'SQL': '#336791'
  };
  return colors[language] || '#cccccc';
};

const RepoList = ({ repos }) => {
  const [visibleRepos, setVisibleRepos] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  useEffect(() => setVisibleRepos(6), [repos]);

  if (!repos || repos.length === 0) return null;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleRepos(prev => Math.min(prev + 6, repos.length));
      setIsLoadingMore(false);
    }, 300);
  };

  const hasMoreRepos = visibleRepos < repos.length;
  const displayedRepos = repos.slice(0, visibleRepos);
  const totalRepos = repos.length;

  return (
    <section className="repo-list" data-testid="repo-list" aria-labelledby="repositories-heading">
      <div className="repo-list__header">
        <h2 id="repositories-heading" className="repo-list__title">
          Public Repositories
          <span className="repo-list__count" aria-label={`${totalRepos} repositories`}>
            {totalRepos}
          </span>
        </h2>
      </div>
      
      <div className="repo-list__grid">
        {displayedRepos.map((repo) => (
          <article key={repo.id} className="repo-card" aria-labelledby={`repo-${repo.id}-title`}>
            <div className="repo-card__header">
              <h3 className="repo-card__title" id={`repo-${repo.id}-title`}>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer nofollow"
                  className="repo-card__link"
                  aria-label={`${repo.name} (opens in a new tab)`}
                >
                  {repo.name}
                  <span className="repo-card__external-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </span>
                </a>
              </h3>
              
              {repo.language && (
                <div className="repo-card__language">
                  <span 
                    className="repo-card__language-dot" 
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                    aria-hidden="true"
                  ></span>
                  <span className="repo-card__language-name">{repo.language}</span>
                </div>
              )}
            </div>
            
            {repo.description && (
              <p className="repo-card__description">
                {truncateText(repo.description)}
              </p>
            )}
            
            <div className="repo-card__footer">
              <div className="repo-card__stats">
                <div className="repo-card__stat" aria-label={`${repo.stargazers_count} stars`}>
                  <span className="repo-card__stat-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </span>
                  <span className="repo-card__stat-count">{formatNumber(repo.stargazers_count)}</span>
                </div>
                
                <div className="repo-card__stat" aria-label={`${repo.forks_count} forks`}>
                  <span className="repo-card__stat-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </span>
                  <span className="repo-card__stat-count">{formatNumber(repo.forks_count)}</span>
                </div>
                
                {repo.updated_at && (
                  <div className="repo-card__stat" aria-label={`Updated on ${new Date(repo.updated_at).toLocaleDateString()}`}>
                    <span className="repo-card__stat-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    <span className="repo-card__stat-count">
                      {formatUpdatedAt(repo.updated_at)}
                    </span>
                  </div>
                )}
              </div>
              
              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-card__topics">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="repo-card__topic">
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="repo-card__topic-more" aria-label={`${repo.topics.length - 3} more topics`}>
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      
      {hasMoreRepos && (
        <div className="repo-list__load-more">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="repo-list__load-button"
            aria-label={`Load more repositories (showing ${visibleRepos} of ${totalRepos})`}
          >
            {isLoadingMore ? (
              <>
                <span className="repo-list__spinner" aria-hidden="true"></span>
                <span>Loading...</span>
              </>
            ) : (
              `Load More (${totalRepos - visibleRepos} more)`
            )}
          </button>
        </div>
      )}
    </section>
  );
};

RepoList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
      description: PropTypes.string,
      language: PropTypes.string,
      stargazers_count: PropTypes.number.isRequired,
      forks_count: PropTypes.number.isRequired,
      updated_at: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
};

export default RepoList;
