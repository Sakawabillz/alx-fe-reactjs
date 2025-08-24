import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsComponent from './components/PostsComponent';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>React Query Demo</h1>
        
        {/* Caching demonstration controls */}
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h3>React Query Caching Demonstration</h3>
          <button onClick={() => setShowPosts(!showPosts)}>
            {showPosts ? 'Hide Posts (Unmount Component)' : 'Show Posts (Remount Component)'}
          </button>
          <p>
            <small>
              Toggle the posts component to see caching in action. 
              Data will load from cache when component remounts within 5 minutes.
            </small>
          </p>
        </div>

        {showPosts && <PostsComponent />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;