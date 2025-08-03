export default function UserProfile({ user }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 md:flex">
        <div className="md:mr-6 mb-4 md:mb-0">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-32 h-32 rounded-full border-2 border-gray-200"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name || user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-github-blue hover:underline"
              >
                @{user.login}
              </a>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="text-sm text-gray-500">
                Joined {formatDate(user.created_at)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-gray-600">
            {user.bio || 'No bio available.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 bg-gray-50 p-4 rounded-md">
            <div className="text-center">
              <div className="font-semibold">{user.public_repos}</div>
              <div className="text-sm text-gray-500">Repositories</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{user.followers}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{user.following}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>

          {(user.location || user.company || user.blog || user.twitter_username) && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.location && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location}
                </div>
              )}
              {user.company && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 16h.01" />
                  </svg>
                  {user.company}
                </div>
              )}
              {user.blog && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="text-github-blue hover:underline">
                    {user.blog}
                  </a>
                </div>
              )}
              {user.twitter_username && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-github-blue hover:underline">
                    @{user.twitter_username}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
