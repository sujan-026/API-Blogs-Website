import React, { useState, useEffect } from 'react';

function EditPostModal({ post, onClose, onSubmit }) {
  const [name, setName] = useState(post.name);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setName(post.name);
    setContent(post.content);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post.id, name, content);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="editPostName" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="editPostName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editPostContent" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea
              id="editPostContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Last edited: {new Date(post.date).toLocaleString()}</p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostModal;