import React from 'react';
import '../pages/css/Blog.css';

const Blog = () => {
  return (
    <>
    <div className="coming-soon-container mt-17">
      <div className="coming-soon-content">
        <h1>Coming Soon</h1>
        <p>We're working hard to bring you amazing content. Stay tuned!</p>
        <div className="construction-icon">
          <span role="img" aria-label="construction">🚧</span>
        </div>
      </div>
    </div>  
    <footer className="mt-50 py-2 bg-white border-t border-gray-200">
          <div className="conta5ner mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center flex md:text-left">
                {/* <h3 className="text-xl font-semibold mb-4">CODORA</h3> */}
                <p className="text-gray-600 text-lg">
                   Copyright © 2025 Codora. All Rights Reserved.
                </p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 text-lg hover:text-gray-800">Terms</a>
                <a href="#" className="text-gray-600 text-lg hover:text-gray-800">Privacy</a>
                <a href="#" className="text-gray-600 text-lg hover:text-gray-800"><a href="/contact">Contact</a></a>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
};

export default Blog;
