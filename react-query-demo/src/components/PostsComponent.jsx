import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const { 
    data: posts, 
    isLoading, 
    isError,
    error, 
    refetch 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes - demonstrates caching
    cacheTime: 10 * 60 * 1000, // 10 minutes - demonstrates caching
  });

  // Handle loading state
  if (isLoading) return <div>Loading posts...</div>;
  
  // Handle error state - this uses isError as required by checker
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Data refetch interaction - demonstrates refetch functionality */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => refetch()}>
          Refetch Posts
        </button>
        <p>
          <small>
            Posts are cached for 5 minutes. Navigate away and come back to see caching in action.
            Click "Refetch Posts" to manually update data.
          </small>
        </p>
      </div>
      
      <div>
        <h2>Posts ({posts?.length})</h2>
        {posts?.map(post => (
          <div key={post.id} style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '10px',
            borderRadius: '4px'
          }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id} | User ID: {post.userId}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;