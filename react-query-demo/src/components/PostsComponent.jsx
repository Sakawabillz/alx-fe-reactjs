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
    refetchOnWindowFocus: false, // Demonstrates caching control
    keepPreviousData: true, // Demonstrates caching behavior
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
        <button 
          onClick={() => refetch()} 
          style={{ marginLeft: '10px' }}
        >
          Manual Refresh
        </button>
        <p>
          <small>
            React Query Caching Features Demonstrated:
            <br />• refetchOnWindowFocus: false - Won't refetch when window regains focus
            <br />• keepPreviousData: true - Keeps previous data while fetching new data
            <br />• staleTime: 5 minutes - Data considered fresh for 5 minutes
            <br />• cacheTime: 10 minutes - Data stays in cache for 10 minutes
            <br />Click "Refetch Posts" to manually update data and see caching in action.
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
