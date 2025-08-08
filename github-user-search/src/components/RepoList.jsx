const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="repo-list">
      <h3>Public Repositories</h3>
      <div className="repos">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h4>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            {repo.description && <p>{repo.description}</p>}
            <div className="repo-stats">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              {repo.language && <span>{repo.language}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
