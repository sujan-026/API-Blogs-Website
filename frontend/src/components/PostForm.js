import React, { useState } from 'react';

function PostForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, content);
    setName('');
    setContent('');
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="postName" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="postName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postContent" className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            id="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Create Post</button>
      </form>
    </div>
  );
}

export default PostForm;