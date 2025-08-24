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
    error, 
    refetch 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => refetch()}>
          Refetch Posts
        </button>
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