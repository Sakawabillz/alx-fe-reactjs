import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog post data
  const blogPosts = {
    1: { title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    2: { title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
    3: { title: 'Third Blog Post', content: 'This is the content of the third blog post.' }
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div>
        <h1>Blog Post Not Found</h1>
        <p>The blog post with ID {id} does not exist.</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        ← Back
      </button>
      <h1>{post.title}</h1>
      <p>Post ID: {id}</p>
      <div style={{ marginTop: '1rem' }}>
        {post.content}
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Other Posts:</h3>
        {Object.keys(blogPosts).filter(postId => postId !== id).map(postId => (
          <div key={postId}>
            <Link to={`/blog/${postId}`}>Blog Post {postId}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;