import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import EditPostModal from './components/EditPostModal';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editingPost, setEditingPost] = useState(null);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
      setTotalPosts(response.data.length);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (name, content) => {
    try {
      await axios.post('/api/posts', { name, content });
      alert('Post created successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    }
  };

  const updatePost = async (id, name, content) => {
    try {
      await axios.put(`/api/posts/${id}`, { name, content });
      alert('Post updated successfully!');
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    }
  };

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        alert('Post deleted successfully!');
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <PostForm onSubmit={createPost} />
        <PostList
          posts={posts}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          onEdit={setEditingPost}
          onDelete={deletePost}
        />
      </main>
      <Footer
        currentPage={currentPage}
        totalPages={Math.ceil(totalPosts / postsPerPage)}
        onPageChange={setCurrentPage}
      />
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSubmit={updatePost}
        />
      )}
    </div>
  );
}

export default App;