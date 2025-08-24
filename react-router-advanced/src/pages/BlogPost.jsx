import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams(); // Dynamic routing - gets id from URL
  const navigate = useNavigate();

  // Mock blog post data - demonstrates dynamic content based on URL parameter
  const blogPosts = {
    1: { title: 'First Blog Post', content: 'This is the content of the first blog post.', author: 'John Doe' },
    2: { title: 'Second Blog Post', content: 'This is the content of the second blog post.', author: 'Jane Smith' },
    3: { title: 'Third Blog Post', content: 'This is the content of the third blog post.', author: 'Bob Johnson' }
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
      
      {/* Dynamic content based on URL parameter */}
      <h1>{post.title}</h1>
      <p><strong>Post ID:</strong> {id}</p>
      <p><strong>Author:</strong> {post.author}</p>
      
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f9f9f9' }}>
        {post.content}
      </div>
      
      {/* Dynamic routing examples */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Other Posts (Dynamic Routing Examples):</h3>
        {Object.keys(blogPosts).filter(postId => postId !== id).map(postId => (
          <div key={postId} style={{ margin: '0.5rem 0' }}>
            <Link to={`/blog/${postId}`}>
              Blog Post {postId}: {blogPosts[postId].title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
