import React, { useState } from 'react';
import axios from 'axios';
import API from '../api/axios';

function CreatePostForm({onPostCreated, setToken, navigate}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post('/posts',
        { title, content, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(" Post created!");
      setTitle('');
      setContent('');
      setLink('');
      onPostCreated();
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Post failed: Unauthorized");
        localStorage.removeItem("token");
        setToken(null);
        navigate('/login');
      } else {
        console.error("Post error:", err.response?.data || err.message);
      }
    }
  };

  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-3">Create a Post ✍️</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="text"
        placeholder="Link (optional)"
        value={link}
        onChange={e => setLink(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="submit"
        className="w-full !bg-orange-400 !text-black font-semibold text-lg py-3 rounded-lg hover:bg-orange-500 transition"
      >
        Create Post
      </button>
    </form>

  );
}

export default CreatePostForm;

