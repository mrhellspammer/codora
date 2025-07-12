import React from 'react';
import '../pages/css/Blog.css';

const Blog = () => {
  return (
    <div className="coming-soon-container mt-17">
      <div className="coming-soon-content">
        <h1>Coming Soon</h1>
        <p>We're working hard to bring you amazing content. Stay tuned!</p>
        <div className="construction-icon">
          <span role="img" aria-label="construction">🚧</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
