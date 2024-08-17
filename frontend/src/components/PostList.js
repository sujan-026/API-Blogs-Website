import React from 'react';

function PostList({ posts, currentPage, postsPerPage, onEdit, onDelete }) {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="space-y-6">
      {currentPosts.map(post => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">{post.name}</h2>
          <p className="text-gray-500 text-sm mb-2">Last edited: {new Date(post.date).toLocaleString()}</p>
          <p className="text-gray-600 mb-4">{post.content}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => onEdit(post)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;